"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getCategories } from '@/services/categories.api';
import { Category } from '@/types';
import { Settings2Icon,  } from 'lucide-react';

function SidebarContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const isAllActive = !currentCategory;

  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <aside className="w-[260px] shrink-0 bg-gray-900 border border-gray-800/80 rounded-2xl p-4 flex flex-col text-white shadow-xl h-fit sticky  top-5 ">
      <div className="flex items-center gap-3 px-3 py-2 mb-3">
     <Settings2Icon className='text-primary'/> 
        <span className="text-[17px] font-medium tracking-wide">Categories :</span>
      </div>

      <div className="flex flex-col gap-1">
        <Link 
          href="/" 
          className={`px-4 py-2.5 transition-all text-[15px] font-medium ${
            isAllActive 
              ? 'border-l-2 border-primary text-white bg-gray-800/40 rounded-r-lg' 
              : 'border-l-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 rounded-r-lg '
          }`}
        >
          All
        </Link>
        
        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug || currentCategory === cat.id.toString();
          
          return (
            <Link 
              key={cat.id}
              href={`/?category=${cat.id}`} 
              className={`px-4 py-2.5 transition-all text-[15px] font-medium ${
                isActive 
                  ? 'border-l-2 border-primary text-white bg-gray-800/40 rounded-r-lg' 
                  : 'border-l-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 rounded-r-lg'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default function Sidebar() {
  return (
    <React.Suspense fallback={
      <aside className="w-[260px] shrink-0 bg-[#111111] border border-gray-800/80 rounded-2xl p-4 h-96 skeleton-pulse" />
    }>
      <SidebarContent />
    </React.Suspense>
  );
}
