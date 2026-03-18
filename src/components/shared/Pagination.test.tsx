import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/products');
  });

  it('renders nothing if page is 1 and has no more', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    const { container } = render(<Pagination hasMore={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders pagination controls correctly', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=2'));
    render(<Pagination hasMore={true} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates to next page on Next click', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=2'));
    render(<Pagination hasMore={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(mockPush).toHaveBeenCalledWith('/products?page=3');
  });

  it('navigates to previous page on Previous click', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=2'));
    render(<Pagination hasMore={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(mockPush).toHaveBeenCalledWith('/products?page=1');
  });

  it('disables Previous button on page 1', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=1'));
    render(<Pagination hasMore={true} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('disables Next button if hasMore is false', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?page=2'));
    render(<Pagination hasMore={false} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });
});
