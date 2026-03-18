"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../shared/Input";
import { Search, X, Lock } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/store/useAuthStore";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuthStore();
  const isDisabled = !isLoading && !isAuthenticated;

  const currentSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(currentSearch);
  const debouncedQuery = useDebounce(query, 400);

  // Sync URL params when debounced value changes
  useEffect(() => {
    // If the input value didn't actually change relative to the URL, don't trigger a push
    if (debouncedQuery === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedQuery.trim()) {
      params.set("search", debouncedQuery.trim());
    } else {
      params.delete("search");
    }

    // Reset pagination to page 1 on a new search
    params.delete("page");

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    router.push(newUrl);
  }, [debouncedQuery, currentSearch, router, searchParams]);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <div className="mb-6">
      <div className="relative max-w-sm">
        <Input
          type="text"
          placeholder={isDisabled ? "Sign in to search products" : "Search products..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm pr-10"
          disabled={isDisabled}
          leftIcon={
            isDisabled ? (
              <Lock className="w-4 h-4 text-gray-500" />
            ) : (
              <Search className="w-4 h-4 text-primary" />
            )
          }
          rightIcon={
            query && !isDisabled ? (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            ) : undefined
          }
          id="product-search"
        />
      </div>
    </div>
  );
}
