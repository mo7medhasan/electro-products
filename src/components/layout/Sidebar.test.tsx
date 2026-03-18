import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCategories } from '@/services/categories.api';
import { useAuthStore } from '@/store/useAuthStore';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

jest.mock('@/services/categories.api', () => ({
  getCategories: jest.fn(),
}));

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('Sidebar Component', () => {
  const mockCategories = [
    { id: 1, name: 'Electronics', slug: 'electronics' },
    { id: 2, name: 'Clothes', slug: 'clothes' },
  ];
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
  });

  it('renders categories from API', async () => {
    render(<Sidebar />);
    await waitFor(() => {
      expect(screen.getAllByText('Electronics').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Clothes').length).toBeGreaterThan(0);
    });
  });

  it('disables interactions when not authenticated', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    const { container } = render(<Sidebar />);
    // Select the wrapper that gets the disableClasses
    await waitFor(() => {
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('pointer-events-none');
    });
  });

  it('handles mobile dropdown selection', async () => {
    render(<Sidebar />);
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?category=1');
  });
});
