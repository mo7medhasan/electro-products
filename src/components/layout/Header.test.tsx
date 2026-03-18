import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useAuthStore } from '@/store/useAuthStore';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('Header Component', () => {
  const mockCheckAuth = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      checkAuth: mockCheckAuth,
      logout: mockLogout,
    });
    const { container } = render(<Header />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders unauthenticated state', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      checkAuth: mockCheckAuth,
      logout: mockLogout,
    });
    render(<Header />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders authenticated state with user info', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { name: 'John Doe', avatar: 'avatar.png' },
      isAuthenticated: true,
      isLoading: false,
      checkAuth: mockCheckAuth,
      logout: mockLogout,
    });
    render(<Header />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
