import mongoose from "mongoose";
import { Book } from "../../models/Book.js";

describe("Database Tests for GET Books", () => {
  // Connect to MongoDB before tests
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI || "mongodb+srv://tharindu:crysis4c@cluster0.msif70h.mongodb.net/SEPQM-BOOKS-TEST-DB?retryWrites=true&w=majority&appName=Cluster0" );
    console.log("✅ Connected to test database");
  });

  // Disconnect from MongoDB after tests
  afterAll(async () => {
    await mongoose.connection.close();
    console.log("✅ Disconnected from test database");
  });

  // Clean up database before each test
  beforeEach(async () => {
    await Book.deleteMany({});
    
    // Insert sample books for testing
    await Book.insertMany([
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic Fiction",
        isbn: "9780743273565"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic Fiction",
        isbn: "9780061120084"
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Technical",
        isbn: "9780132350884"
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        genre: "Technical",
        isbn: "9780201633610"
      }
    ]);
  });

  // Test retrieving all books
  it("Test Scenario 1: should retrieve all books from database", async () => {
    // Retrieve all books directly from database
    const books = await Book.find().sort({ createdAt: -1 });
    
    // Verify book count
    expect(books.length).toBe(4);
    
    // Verify first book has expected properties
    expect(books[0]).toHaveProperty('title');
    expect(books[0]).toHaveProperty('author');
    expect(books[0]).toHaveProperty('genre');
    expect(books[0]).toHaveProperty('isbn');
    
    console.log("✅ TEST PASSED: Successfully retrieved all books from database");
  });

  // Test retrieving filtered books by genre
  it("Test Scenario 2: should retrieve filtered books by genre", async () => {
    // Retrieve books with genre filter directly from database
    const books = await Book.find({ genre: "Technical" });
    
    // Verify book count
    expect(books.length).toBe(2);
    
    // Verify all books have the expected genre
    books.forEach(book => {
      expect(book.genre).toBe("Technical");
    });
    
    // Verify specific book titles
    const titles = books.map(book => book.title);
    expect(titles).toContain("Clean Code");
    expect(titles).toContain("Design Patterns");
    
    console.log("✅ TEST PASSED: Successfully retrieved filtered books by genre");
  });

  // Test retrieving books by author
  it("Test Scenario 3: should retrieve books by specific author", async () => {
    // Retrieve books by author directly from database
    const books = await Book.find({ author: "Harper Lee" });
    
    // Verify book count
    expect(books.length).toBe(1);
    
    // Verify book details
    expect(books[0].title).toBe("To Kill a Mockingbird");
    expect(books[0].isbn).toBe("9780061120084");
    
    console.log("✅ TEST PASSED: Successfully retrieved books by specific author");
  });

  // Test retrieving a specific book by ID
  it("Test Scenario 4: should retrieve a specific book by ID", async () => {
    // First, get a book to retrieve its ID
    const sampleBook = await Book.findOne({ title: "Clean Code" });
    
    // Retrieve book by ID directly from database
    const book = await Book.findById(sampleBook._id);
    
    // Verify book details
    expect(book).not.toBeNull();
    expect(book.title).toBe("Clean Code");
    expect(book.author).toBe("Robert C. Martin");
    expect(book.genre).toBe("Technical");
    expect(book.isbn).toBe("9780132350884");
    
    console.log("✅ TEST PASSED: Successfully retrieved a specific book by ID");
  });

  // Test retrieving books with sorting
  it("Test Scenario 5: should retrieve books with proper sorting", async () => {
    // Retrieve books sorted by title directly from database
    const booksAscending = await Book.find().sort({ title: 1 });
    
    // Verify sorting is correct (alphabetical by title)
    expect(booksAscending[0].title).toBe("Clean Code");
    expect(booksAscending[3].title).toBe("To Kill a Mockingbird");
    
    // Retrieve books sorted by title in descending order
    const booksDescending = await Book.find().sort({ title: -1 });
    
    // Verify reverse sorting is correct
    expect(booksDescending[0].title).toBe("To Kill a Mockingbird");
    expect(booksDescending[3].title).toBe("Clean Code");
    
    console.log("✅ TEST PASSED: Successfully retrieved books with proper sorting");
  });
});