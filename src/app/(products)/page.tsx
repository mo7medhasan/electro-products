import { getProducts } from "@/services/products.api";
import { use } from "react";
import Sidebar from "@/components/layout/Sidebar";
import ProductCard from "@/components/layout/ProductCard";
import { Product } from "@/types";

export default function HomePage() {
  const products = use(getProducts());
  
  return (
    <div className="flex min-h-screen flex-col gap-8">
      <div className="flex container gap-8 flex-col md:flex-row items-start">
        {/* sidebar */}
        <Sidebar />
        
        {/* main content */}
        <div className="flex-1 w-full">
          <div className="mb-6 flex justify-between items-end">
            <h2 className="text-3xl font-bold text-white">Products</h2>
            <span className="text-gray-400 text-sm">{products?.length || 0} items found</span>
          </div>

          {!products || products.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl text-gray-300">No products found.</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
