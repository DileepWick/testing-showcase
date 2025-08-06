// src/components/__tests__/BookForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../BookForm';

describe('BookForm', () => {
  const mockSubmit = vi.fn();
  const mockChange = vi.fn();
  const formData = {
    title: '',
    author: '',
    genre: 'Fiction',
    isbn: '',
  };

  test('renders input fields and submit button', () => {
    render(
      <BookForm
        formData={formData}
        handleChange={mockChange}
        handleSubmit={mockSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByPlaceholderText('Enter book title')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter author name')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter ISBN')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add Book/i })
    ).toBeInTheDocument();
  });

  test('calls submit handler on submit', () => {
    render(
      <BookForm
        formData={formData}
        handleChange={mockChange}
        handleSubmit={mockSubmit}
        isLoading={false}
      />
    );

    fireEvent.submit(screen.getByRole('button'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
