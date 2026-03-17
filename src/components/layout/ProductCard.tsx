import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Product } from '@/types';
import { getCleanImageUrl } from '@/utils/formatUrl';
import Image from '../shared/Image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Try to use the first image, fallback to a placeholder if none
  const rawImageUrl = product.images?.[0] || 'https://via.placeholder.com/400';
  const imageUrl = getCleanImageUrl(rawImageUrl);

  // Shorten description for preview
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="flex flex-col bg-[#111111] border border-gray-800/80 rounded-3xl p-4 transition-transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Image Container - Links to details */}
      <Link href={`/product/${product.id}`} className="block h-[280px] w-full relative bg-[#E2E2E2] rounded-2xl overflow-hidden mb-5 group">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col flex-1">
        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Description + Read More */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-1">
          {truncateText(product.description, 50)}{' '}
          <Link href={`/product/${product.id}`} className="text-white hover:text-primary transition-colors text-xs font-medium ml-1">
            Read More
          </Link>
        </p>

        {/* Category Pill */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-700 bg-gray-800/30 text-xs font-medium text-gray-300">
            {typeof product.category === 'object' ? product.category.name : product.category || 'Category'}
          </span>
        </div>

        {/* Footer: Price & Add to Cart */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs mb-1">Price</span>
            <span className="text-white text-xl font-semibold">
              $ {product.price.toLocaleString()}
            </span>
          </div>
          <Button 
            className="rounded-xl! px-6 py-2 h-auto text-sm font-medium hover:brightness-110 active:scale-95"
            style={{ backgroundColor: '#7C3AED' }} // Custom purple from the design
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}