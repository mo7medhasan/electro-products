"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCategories } from '@/services/categories.api';
import { Category } from '@/types';
import { Settings2Icon, Lock, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

function SidebarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get('category') || '';
  const isAllActive = !currentCategory;

  const { isAuthenticated, isLoading } = useAuthStore();
  const isDisabled = !isLoading && !isAuthenticated;
  const disableClasses = isDisabled ? "pointer-events-none opacity-50 grayscale select-none" : "";

  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const buildAllUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('page');
    return params.toString() ? `/?${params.toString()}` : "/";
  };

  const buildCategoryUrl = (catId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', catId.toString());
    params.delete('page');
    return `/?${params.toString()}`;
  };

  return (
    <>
      <div className={`md:hidden w-full mb-4 shrink-0 ${disableClasses}`}>
        <div className="relative flex items-center w-full bg-gray-900 border border-gray-800/80 rounded-2xl p-3 shadow-xl">
          <Settings2Icon className="text-primary w-5 h-5 ml-1 shrink-0 pointer-events-none" />
          <select 
            value={currentCategory || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                router.push(buildAllUrl());
              } else {
                router.push(buildCategoryUrl(Number(val)));
              }
            }}
            className="w-full bg-transparent text-white text-[15px] font-medium outline-none appearance-none cursor-pointer pl-3 pr-10 py-1"
          >
            <option value="" className="bg-gray-800 text-white">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()} className="bg-gray-800 text-white">
                {cat.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 flex items-center gap-2 pointer-events-none">
            {isDisabled && <Lock className="w-4 h-4 text-gray-500" />}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <aside className={`max-md:hidden md:w-[260px] w-full max-h-[calc(100vh-5rem)] overflow-y-auto shrink-0 bg-gray-900 border border-gray-800/80 rounded-2xl p-4 flex flex-col text-white shadow-xl h-fit md:sticky top-5 transition-all duration-300 ${disableClasses}`}>
        <div className="flex items-center justify-between px-3 py-2 mb-3">
          <div className="flex items-center gap-3">
            <Settings2Icon className='text-primary'/> 
            <span className="text-[17px] font-medium tracking-wide">Categories :</span>
          </div>
          {isDisabled && <Lock className="w-4 h-4 text-gray-500" />}
        </div>

        <div className="flex flex-col gap-1">
          <Link 
            href={buildAllUrl()} 
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
                href={buildCategoryUrl(cat.id)} 
                className={`px-4 py-2.5 transition-all text-[15px] font-medium line-clamp-1 ${
                  isActive 
                    ? 'border-l-2 border-primary text-white bg-gray-800/40 rounded-r-lg' 
                    : 'border-l-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 rounded-r-lg '
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default function Sidebar() {
  return (
    <React.Suspense fallback={
      <aside className="md:w-[260px] w-full shrink-0 bg-gray-900 border border-gray-800/80 rounded-2xl p-4 h-96 skeleton-pulse" />
    }>
      <SidebarContent />
    </React.Suspense>
  );
}
