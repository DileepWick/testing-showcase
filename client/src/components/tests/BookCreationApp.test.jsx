import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookCreationApp from '../BookCreationApp';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('BookCreationApp', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders book creation form', async () => {
    await waitFor(() => render(<BookCreationApp />));
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
  });

  test('handles book submission and shows success message', async () => {
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      ) // initial fetchBooks
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      ) // form submit
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      ); // fetchBooks again

    await waitFor(() => render(<BookCreationApp />));

    fireEvent.change(screen.getByPlaceholderText('Enter book title'), {
      target: { value: '1984' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter author name'), {
      target: { value: 'George Orwell' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter ISBN'), {
      target: { value: '1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));

    await waitFor(() =>
      expect(screen.getByText('Book created successfully!')).toBeInTheDocument()
    );
  });
});
