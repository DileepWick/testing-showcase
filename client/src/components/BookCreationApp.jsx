import React, { useState, useEffect } from 'react';
import CreateBookPanel from './CreateBookPanel';
import BooksTable from './BooksTable';

const BookCreationApp = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    isbn: '',
  });
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoadingBooks(true);
    try {
      const response = await fetch('http://localhost:5000/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoadingBooks(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create book');
      }

      setMessage({ text: 'Book created successfully!', isError: false });
      setFormData({ title: '', author: '', genre: 'Fiction', isbn: '' });

      // Refresh books list
      fetchBooks();
    } catch (error) {
      setMessage({ text: error.message, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='flex-grow container mx-auto px-4 pt-6'>
      <div className='grid gap-10 md:grid-cols-1 lg:grid-cols-2'>
        <CreateBookPanel
          message={message}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <BooksTable books={books} isLoading={isLoadingBooks} />
      </div>
    </main>
  );
};

export default BookCreationApp;
