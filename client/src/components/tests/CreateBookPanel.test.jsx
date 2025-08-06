// src/components/__tests__/CreateBookPanel.test.jsx
import { render, screen } from '@testing-library/react';
import CreateBookPanel from '../CreateBookPanel';

describe('CreateBookPanel', () => {
  test('renders heading and passes props to form', () => {
    const formData = { title: '', author: '', genre: 'Fiction', isbn: '' };
    const props = {
      message: { text: '', isError: false },
      formData,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
      isLoading: false,
    };

    render(<CreateBookPanel {...props} />);
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter book title')).toBeInTheDocument();
  });
});
