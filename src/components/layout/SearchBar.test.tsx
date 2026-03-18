import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/hooks/useDebounce', () => ({
  // Skip debouncing for easier testing
  useDebounce: <T,>(val: T) => val,
}));

describe('SearchBar Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
  });

  it('renders correctly when authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search products...')).not.toBeDisabled();
  });

  it('is disabled when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Sign in to search products')).toBeDisabled();
  });

  it('updates URL on search input', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'laptop' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?search=laptop');
  });

  it('clears search when clear button is clicked', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?search=laptop'));
    
    render(<SearchBar />);
    const input = screen.getByDisplayValue('laptop');
    expect(input).toBeInTheDocument();
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(mockPush).toHaveBeenCalledWith('/'); // Because we mocked useDebounce to be instant
  });
});
