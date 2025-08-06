import request from "supertest";
import { Book } from "../../models/Book.js";
import { connectDB } from "../../config/db.js";
import app from "../../server.js"; // Import the app
import { closeServer } from "../../server.js"; // Import the closeServer
import { disconnectDB } from "../../config/db.js";

let server;

beforeAll(async () => {
  // Connect to the test-specific Mongo URI
  await connectDB(process.env.MONGO_URI); // Default to test DB if no env var

  // Start server on the test port
  server = app.listen(process.env.PORT, () => {});
});

afterAll(async () => {
  await disconnectDB();
  closeServer();
});

afterEach(async () => {
  await Book.deleteMany(); // Clean up between tests
});

describe("GET /api/books", () => {
  it("Test Scenario 1: should return empty array when no books exist", async () => {
    const res = await request(server).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(0);
    console.log("Test Scenario 1 - Should return empty array when no books exist: Passed ✅");
    
  });

  it("Test Scenario 2: should return all books when books exist", async () => {
    // Prepare test data - create multiple books
    const testBooks = [
      {
        title: "Test Book 1",
        author: "John Doe",
        genre: "Fiction",
        isbn: "1234567890",
      },
      {
        title: "Test Book 2",
        author: "Jane Smith",
        genre: "Non-Fiction",
        isbn: "0987654321",
      },
    ];

    // Insert test books into the database
    await Book.insertMany(testBooks);

    // Make request
    const res = await request(server).get("/api/books");

    // Assertions
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);

    // Check that both expected titles are in the response
    const titles = res.body.map((book) => book.title);
    expect(titles).toContain("Test Book 1");
    expect(titles).toContain("Test Book 2");

    console.log("Test Scenario 2 - Should return all books when books exist: Passed ✅");
  });
});
