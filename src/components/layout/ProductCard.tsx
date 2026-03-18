import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Product } from '@/types';
import Image from '../shared/Image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Try to use the first image, fallback to a placeholder if none
  const rawImageUrl = product.images?.[0] || 'https://via.placeholder.com/400';

  return (
    <div className="flex flex-col  bg-gray-900  overflow-hidden border border-gray-800/80 rounded-3xl p-4 transition-transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Image Container - Links to details */}
      <Link href={`/product/${product.id}`} className="block aspect-square w-full relative bg-[#E2E2E2] rounded-2xl overflow-hidden mb-5 group">
        <Image
          src={rawImageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col flex-1">
        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2 line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

      

        {/* Category Pill */}
        <div className="mb-2 md:mb-6">
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
         
        </div>
      </div>
    </div>
  );
}