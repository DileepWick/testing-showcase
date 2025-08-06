// src/components/__tests__/MessageAlert.test.jsx
import { render, screen } from '@testing-library/react';
import MessageAlert from '../MessageAlert';

describe('MessageAlert', () => {
  test('renders nothing when message is empty', () => {
    const { container } = render(<MessageAlert message={{ text: '' }} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders error message', () => {
    render(<MessageAlert message={{ text: 'Error', isError: true }} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('renders success message', () => {
    render(<MessageAlert message={{ text: 'Success', isError: false }} />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
