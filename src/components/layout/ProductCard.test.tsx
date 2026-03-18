import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Category } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

jest.mock('@/components/shared/Image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />, // Mocking custom Image component
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 199.99,
    description: 'Test description',
    images: ['https://example.com/image1.jpg'],
    category: { id: 1, name: 'Electronics', slug: 'electronics', image: '' },
    creationAt: '',
    updatedAt: '',
  };

  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$ 199.99')).toBeInTheDocument();
  });

  it('handles missing images structure gracefully', () => {
    const productWithoutImg = { ...mockProduct, images: [] };
    render(<ProductCard product={productWithoutImg} />);
    const img = screen.getByAltText('Test Product');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/400');
  });

  it('handles string category instead of object', () => {
    const productWithStringCat = { ...mockProduct, category: 'Gadgets' as unknown as Category };
    render(<ProductCard product={productWithStringCat} />);
    expect(screen.getByText('Gadgets')).toBeInTheDocument();
  });
});
