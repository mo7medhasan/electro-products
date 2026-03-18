import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './Image';
import { getCleanImageUrl } from '@/utils/formatUrl';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

jest.mock('@/utils/formatUrl', () => ({
  getCleanImageUrl: jest.fn((url) => `cleaned-${url}`),
}));

describe('Image Component', () => {
  it('renders with cleaned URL', () => {
    render(<Image src="test.jpg" alt="test image" width={100} height={100} />);
    const img = screen.getByAltText('test image');
    expect(img).toHaveAttribute('src', 'cleaned-test.jpg');
    expect(getCleanImageUrl).toHaveBeenCalledWith('test.jpg');
  });
});
