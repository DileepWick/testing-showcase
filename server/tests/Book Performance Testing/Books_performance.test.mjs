import mongoose from "mongoose";
import { Book } from "../../models/Book.js";


describe("Performance Tests for Book Operations", () => {
  // Performance metrics
  const performanceMetrics = {
    singleBookRetrievalTime: [],
    allBooksRetrievalTime: [],
    filteredBooksRetrievalTime: [],
    bookCreationTime: [],
    bulkOperationTime: []
  };

  // Performance thresholds (in milliseconds)
  const thresholds = {
    singleBookRetrieval: 50,    // 50ms
    allBooksRetrieval: 100,     // 100ms
    filteredBooksRetrieval: 80, // 80ms
    bookCreation: 100,          // 100ms
    bulkOperation: 200          // 200ms
  };

  // Connect to MongoDB before tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/bookstore_test");
    console.log("✅ Connected to test database for performance testing");
    
    // Create sample data for performance tests
    const sampleBooks = [];
    for (let i = 1; i <= 50; i++) {
      sampleBooks.push({
        title: `Performance Test Book ${i}`,
        author: `Author ${i % 5}`, // Create 5 different authors
        genre: i % 3 === 0 ? "Fiction" : (i % 3 === 1 ? "Non-Fiction" : "Technical"), // Create 3 genres
        isbn: `PERF${String(i).padStart(8, '0')}`
      });
    }
    
    await Book.insertMany(sampleBooks);
    console.log(`✅ Inserted ${sampleBooks.length} sample books for testing`);
  });

  // Disconnect from MongoDB after tests
  afterAll(async () => {
    // Print performance metrics summary
    console.log("\n--- PERFORMANCE TEST SUMMARY ---");
    for (const [metric, times] of Object.entries(performanceMetrics)) {
      if (times.length) {
        const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
        const max = Math.max(...times);
        const min = Math.min(...times);
        
        console.log(`${metric}:`);
        console.log(`  Average: ${avg.toFixed(2)}ms`);
        console.log(`  Min: ${min.toFixed(2)}ms`);
        console.log(`  Max: ${max.toFixed(2)}ms`);
      }
    }
    
    await Book.deleteMany({});
    await mongoose.connection.close();
    console.log("✅ Performance test complete, disconnected from database");
  });

  // Test single book retrieval performance
  it("Test Scenario 1: should retrieve a single book by ID efficiently", async () => {
    // First get a book ID to test with
    const sampleBook = await Book.findOne();
    
    // Run multiple iterations to measure performance
    for (let i = 0; i < 10; i++) {
      const startTime = performance.now();
      
      // Retrieve the book by ID
      const book = await Book.findById(sampleBook._id);
      expect(book).not.toBeNull();
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      performanceMetrics.singleBookRetrievalTime.push(executionTime);
    }
    
    // Calculate average retrieval time
    const avgTime = performanceMetrics.singleBookRetrievalTime.reduce((sum, time) => sum + time, 0) / 
                   performanceMetrics.singleBookRetrievalTime.length;
                   
    // Assert performance meets threshold
    expect(avgTime).toBeLessThan(thresholds.singleBookRetrieval);
    
    console.log(`✅ TEST PASSED: Single book retrieval performance - Avg: ${avgTime.toFixed(2)}ms`);
  });

  // Test all books retrieval performance
  it("Test Scenario 2: should retrieve all books efficiently", async () => {
    // Run multiple iterations to measure performance
    for (let i = 0; i < 5; i++) {
      const startTime = performance.now();
      
      // Retrieve all books
      const books = await Book.find();
      expect(books.length).toBeGreaterThan(0);
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      performanceMetrics.allBooksRetrievalTime.push(executionTime);
    }
    
    // Calculate average retrieval time
    const avgTime = performanceMetrics.allBooksRetrievalTime.reduce((sum, time) => sum + time, 0) / 
                   performanceMetrics.allBooksRetrievalTime.length;
                   
    // Assert performance meets threshold
    expect(avgTime).toBeLessThan(thresholds.allBooksRetrieval);
    
    console.log(`✅ TEST PASSED: All books retrieval performance - Avg: ${avgTime.toFixed(2)}ms`);
  });

  // Test filtered books retrieval performance
  it("Test Scenario 3: should retrieve filtered books efficiently", async () => {
    // Run multiple iterations to measure performance
    for (let i = 0; i < 5; i++) {
      const startTime = performance.now();
      
      // Retrieve filtered books
      const books = await Book.find({ genre: "Fiction" });
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      performanceMetrics.filteredBooksRetrievalTime.push(executionTime);
    }
    
    // Calculate average retrieval time
    const avgTime = performanceMetrics.filteredBooksRetrievalTime.reduce((sum, time) => sum + time, 0) / 
                   performanceMetrics.filteredBooksRetrievalTime.length;
                   
    // Assert performance meets threshold
    expect(avgTime).toBeLessThan(thresholds.filteredBooksRetrieval);
    
    console.log(`✅ TEST PASSED: Filtered books retrieval performance - Avg: ${avgTime.toFixed(2)}ms`);
  });

  // Test book creation performance
  it("Test Scenario 4: should create books efficiently", async () => {
    // Run multiple iterations to measure performance
    for (let i = 0; i < 5; i++) {
      const bookData = {
        title: `Performance Create Test ${i}`,
        author: `Create Author ${i}`,
        genre: "Performance Testing",
        isbn: `CREATE${String(i).padStart(8, '0')}`
      };
      
      const startTime = performance.now();
      
      // Create a new book
      const book = new Book(bookData);
      await book.save();
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      performanceMetrics.bookCreationTime.push(executionTime);
      
      // Clean up - delete the created book
      await Book.findByIdAndDelete(book._id);
    }
    
    // Calculate average creation time
    const avgTime = performanceMetrics.bookCreationTime.reduce((sum, time) => sum + time, 0) / 
                   performanceMetrics.bookCreationTime.length;
                   
    // Assert performance meets threshold
    expect(avgTime).toBeLessThan(thresholds.bookCreation);
    
    console.log(`✅ TEST PASSED: Book creation performance - Avg: ${avgTime.toFixed(2)}ms`);
  });

  // Test bulk operation performance
  it("Test Scenario 5: should perform bulk operations efficiently", async () => {
    // Prepare bulk data
    const bulkBooks = [];
    for (let i = 1; i <= 20; i++) {
      bulkBooks.push({
        title: `Bulk Performance Test ${i}`,
        author: `Bulk Author ${i}`,
        genre: "Bulk Testing",
        isbn: `BULK${String(i).padStart(8, '0')}`
      });
    }
    
    const startTime = performance.now();
    
    // Perform bulk insert
    await Book.insertMany(bulkBooks);
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    performanceMetrics.bulkOperationTime.push(executionTime);
    
    // Calculate bulk operation time
    const bulkTime = performanceMetrics.bulkOperationTime[0];
    
    // Assert performance meets threshold
    expect(bulkTime).toBeLessThan(thresholds.bulkOperation);
    
    // Clean up - delete the bulk created books
    await Book.deleteMany({ genre: "Bulk Testing" });
    
    console.log(`✅ TEST PASSED: Bulk operation performance - Time: ${bulkTime.toFixed(2)}ms`);
  });
});