import { Book } from '../models/Book.js';

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, isbn } = req.body;

    if (!title || !author || !genre || !isbn) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(409).json({ message: 'Book with this ISBN already exists' });
    }

    const book = new Book({ title, author, genre, isbn });
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//get all books
export const getAllBooks = async (req, res) => {
  try {
    const { genre, author, limit = 10, page = 1 } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const books = await Book.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//get all books by id
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




