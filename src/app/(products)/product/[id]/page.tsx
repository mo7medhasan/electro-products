import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/services/products.api';
import Button from '@/components/shared/Button';
import { getCleanImageUrl } from '@/utils/formatUrl';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  // Handle various API return formats safely
  const rawImageUrl = product.images?.[0] || 'https://via.placeholder.com/800';
  const imageUrl = getCleanImageUrl(rawImageUrl);

  const categoryName = typeof product.category === 'object' && product.category 
    ? (product.category as {name: string}).name 
    : (product.category as unknown as string) || 'Category';

  return (
    <div className="container mx-auto padding-x pb-20 pt-4">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/" className="text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="bg-[#111111] border border-gray-800/80 rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-stretch">
        
        {/* Left Side: Product Image Display */}
        <div className="w-full lg:w-1/2 shrink-0">
          <div className="relative w-full aspect-square bg-[#E2E2E2] rounded-[24px] overflow-hidden flex items-center justify-center p-8 lg:p-12 group h-full shadow-inner">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-4">
          
          {/* Main Info */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-700 bg-gray-800/40 text-xs font-semibold tracking-wider text-purple-400 uppercase mb-5 shadow-sm">
               {categoryName}
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              {product.description}
            </p>
          </div>

          <div className="w-full h-px bg-gray-800/60 mb-8 border-none"></div>

          {/* Pricing & Checkout */}
          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-1 tracking-wide">Total Price</span>
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                ${product.price ? product.price.toLocaleString() : '0.00'}
              </span>
            </div>
            
            <Button 
              size="lg"
              className="w-full sm:w-auto rounded-2xl! px-10 py-4 text-lg font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-purple-900/20"
              style={{ backgroundColor: '#7C3AED' }} // Match purple theme button
            >
               Add To Cart
            </Button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
