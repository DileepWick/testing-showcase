import express from 'express';
import { 
    createBook, 
    getAllBooks, 
    getBookById, 
  } from '../controllers/bookController.js';

const router = express.Router();

// Route to create a book
router.post('/books', createBook);

// Get all books with optional filtering
router.get('/books', getAllBooks);

// Get a specific book by ID
router.get('/books/:id', getBookById);



export default router;
