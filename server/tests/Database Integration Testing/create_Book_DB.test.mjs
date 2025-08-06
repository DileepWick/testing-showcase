import mongoose from "mongoose";
import { Book } from "../../models/Book.js";

describe("Database Tests for Book Creation", () => {
  beforeAll(async () => {
    // Connect directly to MongoDB without using config/db.js
    await mongoose.connect(process.env.TEST_MONGO_URI || "mongodb+srv://tharindu:crysis4c@cluster0.msif70h.mongodb.net/SEPQM-BOOKS-TEST-DB?retryWrites=true&w=majority&appName=Cluster0" );
    console.log("✅ Connected to test database");
  });

  afterAll(async () => {
    // Disconnect directly without using config/db.js
    await mongoose.connection.close();
    console.log("✅ Disconnected from test database");
  });

  afterEach(async () => {
    // Clean up the Book collection after each test
    await Book.deleteMany({});
  });

  // Test actual database insertion
  it("Test Scenario 1: should correctly persist book data to database", async () => {
    // Book data to test with
    const bookData = {
      title: "Database Test Book",
      author: "DB Test Author",
      genre: "Database Testing",
      isbn: "DB1234567890"
    };

    // Create book directly using the model
    const newBook = new Book(bookData);
    const savedBook = await newBook.save();

    // Verify the book was saved to the database
    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.author).toBe(bookData.author);
    expect(savedBook.genre).toBe(bookData.genre);
    expect(savedBook.isbn).toBe(bookData.isbn);

    // Verify timestamps were created
    expect(savedBook.createdAt).toBeDefined();
    expect(savedBook.updatedAt).toBeDefined();

    // Retrieve book directly from database to ensure it was persisted
    const retrievedBook = await Book.findById(savedBook._id);
    expect(retrievedBook).not.toBeNull();
    expect(retrievedBook.title).toBe(bookData.title);

    console.log("✅ TEST PASSED: Successfully persisted book data to databas");
  });

  // Test schema validation for required fields
  it("Test Scenario 2: should enforce required fields in schema", async () => {
    // Create incomplete book that's missing required fields
    const incompleteBook = new Book({
      title: "Incomplete Book"
      // Missing author, genre, and isbn
    });

    // Attempt to save should fail with validation error
    let validationError;
    try {
      await incompleteBook.save();
    } catch (error) {
      validationError = error;
    }

    expect(validationError).toBeDefined();
    expect(validationError.name).toBe("ValidationError");
    // Check for specific field validations
    expect(validationError.errors.author).toBeDefined();
    expect(validationError.errors.genre).toBeDefined();
    expect(validationError.errors.isbn).toBeDefined();

    console.log("✅ TEST PASSED: Successfully enforced required fields in schema");
  });

  // Test data trimming
  it("Test Scenario 3: should trim whitespace from string fields", async () => {
    // Create book with whitespace in fields
    const bookWithWhitespace = new Book({
      title: "  Whitespace Book  ",
      author: "  Whitespace Author  ",
      genre: "  Whitespace Genre  ",
      isbn: "  ISBN12345  "
    });
    
    const savedBook = await bookWithWhitespace.save();

    // Verify whitespace was trimmed
    expect(savedBook.title).toBe("Whitespace Book");
    expect(savedBook.author).toBe("Whitespace Author");
    expect(savedBook.genre).toBe("Whitespace Genre");
    expect(savedBook.isbn).toBe("ISBN12345");

    console.log("✅ TEST PASSED: Successfully trimmed whitespace from string fields");
  });

  // Test multiple book creation
  it("Test Scenario 4: should handle bulk creation of books", async () => {
    // Create array of books
    const booksToCreate = [
      {
        title: "Bulk Book 1",
        author: "Bulk Author 1",
        genre: "Fiction",
        isbn: "BULK00001"
      },
      {
        title: "Bulk Book 2",
        author: "Bulk Author 2",
        genre: "Non-Fiction",
        isbn: "BULK00002"
      },
      {
        title: "Bulk Book 3",
        author: "Bulk Author 3",
        genre: "Mystery",
        isbn: "BULK00003"
      }
    ];

    // Use insertMany to bulk create books
    const insertedBooks = await Book.insertMany(booksToCreate);

    // Verify all books were inserted
    expect(insertedBooks.length).toBe(3);
    
    // Verify data in database
    const count = await Book.countDocuments();
    expect(count).toBe(3);

    // Verify specific book details
    const secondBook = await Book.findOne({ isbn: "BULK00002" });
    expect(secondBook).not.toBeNull();
    expect(secondBook.title).toBe("Bulk Book 2");
    expect(secondBook.author).toBe("Bulk Author 2");

    console.log("✅ TEST PASSED: Successfully handled bulk creation of books");
  });
});