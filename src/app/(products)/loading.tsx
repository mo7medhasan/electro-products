import Sidebar from "@/components/layout/Sidebar";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col gap-8">
      <div className="flex container gap-8 flex-col md:flex-row items-start">
        {/* sidebar */}
        <Sidebar />
        
        {/* main content */}
        <div className="flex-1 w-full">
          {/* Header Skeleton */}
          <div className="mb-6 flex justify-between items-end">
            <div className="h-9 bg-gray-800/80 rounded-lg w-32 animate-pulse"></div>
            <div className="h-5 bg-gray-800/80 rounded w-24 animate-pulse"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="flex flex-col bg-gray-900 border border-gray-800/80 rounded-3xl p-4 animate-pulse"
              >
                {/* Image Container Skeleton */}
                <div className="block aspect-square w-full relative bg-gray-800/50 rounded-2xl mb-5"></div>
            
                <div className="flex flex-col flex-1">
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-800/60 rounded-lg w-[85%] mb-2"></div>
                  <div className="h-6 bg-gray-800/60 rounded-lg w-[60%] mb-6"></div>
            
                  {/* Category Pill Skeleton */}
                  <div className="mb-6">
                    <div className="h-7 bg-gray-800/50 rounded-full w-24 border border-gray-700/50"></div>
                  </div>
            
                  {/* Footer Skeleton: Price & Add to Cart */}
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                      <div className="h-4 bg-gray-800/50 rounded w-10 mb-1"></div>
                      <div className="h-6 bg-gray-800/60 rounded-lg w-20"></div>
                    </div>
                    <div className="h-10 bg-gray-800/60 rounded-xl w-28"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
