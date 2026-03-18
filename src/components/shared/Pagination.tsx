"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../shared/Button";

interface PaginationProps {
  hasMore: boolean;
}

export default function Pagination({ hasMore }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (currentPage === 1 && !hasMore) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        leftIcon={<ChevronLeft className="w-4 h-4" />}
      >
        Previous
      </Button>

      <div className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 text-sm font-medium">
        Page <span className="text-white font-bold">{currentPage}</span>
      </div>

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMore}
        rightIcon={<ChevronRight className="w-4 h-4" />}
      >
        Next
      </Button>
    </div>
  );
}
