// src/components/__tests__/BooksTable.test.jsx
import { render, screen } from '@testing-library/react';
import BooksTable from '../BooksTable';

describe('BooksTable', () => {
  test('shows no books message', () => {
    render(<BooksTable books={[]} isLoading={false} />);
    expect(screen.getByText('No books available')).toBeInTheDocument();
  });

  test('renders table with books', () => {
    const books = [
      {
        _id: '1',
        title: '1984',
        author: 'Orwell',
        genre: 'Fiction',
        isbn: '111',
      },
    ];
    render(<BooksTable books={books} isLoading={false} />);
    expect(screen.getByText('1984')).toBeInTheDocument();
    expect(screen.getByText('Orwell')).toBeInTheDocument();
  });
});
