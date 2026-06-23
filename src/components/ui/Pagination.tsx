'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, className = '' }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }
    return pages;
  };

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {getVisiblePages().map((page, idx) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-3 py-2 text-sm text-[var(--text-tertiary)]"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`
              min-w-[2.25rem] h-9 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                page === currentPage
                  ? 'btn-gradient text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
              }
            `}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
