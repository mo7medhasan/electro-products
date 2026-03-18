import { getProducts, getProductsWithSearchAndCategory } from "@/services/products.api";
import Sidebar from "@/components/layout/Sidebar";
import ProductCard from "@/components/layout/ProductCard";
import { Product } from "@/types";
import SearchBar from "@/components/layout/SearchBar";
import Pagination from "@/components/shared/Pagination";

interface HomePageProps {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "";
  const currentPage = Number(params?.page) || 1;
  const limit = 8;
  const skip = (currentPage - 1) * limit;

  // If there are search/filter params, use the filtered endpoint
  const products: Product[] =
    search || category
      ? await getProductsWithSearchAndCategory({ search, category, limit, skip })
      : await getProducts({ limit, skip });

  // Assume there are more products if we get a full page of results
  const hasMore = products.length === limit;

  return (
    <div className="flex min-h-screen flex-col gap-8">
      <div className="flex container gap-8 flex-col md:flex-row items-start">
        {/* sidebar */}
        <Sidebar />

        {/* main content */}
        <div className="flex-1 w-full">
          <div className="mb-6 flex justify-between items-end">
            <h2 className="text-3xl font-bold text-white">Products</h2>
            {products.length > 0 && (
              <span className="text-gray-400 text-sm">
                Showing {skip + 1}-{skip + products.length} items
              </span>
            )}
          </div>
          <SearchBar />
          {!products || products.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-xl text-gray-300 mb-2">No products found.</h3>
              {search && (
                <p className="text-gray-500 text-sm">
                  No results for &quot;{search}&quot;. Try a different search term.
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <Pagination hasMore={hasMore} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
