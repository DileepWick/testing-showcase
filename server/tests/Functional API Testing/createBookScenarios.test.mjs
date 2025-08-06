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

describe("POST /api/books", () => {
  it("Test Scenario 1 : should create a new book with valid data", async () => {
    const res = await request(server).post("/api/books").send({
      title: "Test Book",
      author: "John Doe",
      genre: "Fiction",
      isbn: "1234567890",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Test Book");

    console.log("Test Scenario 1 - Should create a new book with valid data : Passed ✅");

  });

  it("Test Scenario 2 : should not create a book with missing fields", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Incomplete Book" });

    expect(res.statusCode).toBe(400);
    console.log("Test Scenario 2 - Should not create a book with missing fields: Passed ✅");
  });

  it("Test Scenario 3 : should not create a book with duplicate ISBN", async () => {
    await request(server).post("/api/books").send({
      title: "Duplicate Book",
      author: "Author One",
      genre: "Drama",
      isbn: "9999999999",
    });

    const res = await request(server).post("/api/books").send({
      title: "Duplicate Book 2",
      author: "Author Two",
      genre: "Drama",
      isbn: "9999999999",
    });

    expect(res.statusCode).toBe(409);
    console.log("Test Scenario 3 - Should not create a book with duplicate ISBN: Passed ✅");
  });
});
