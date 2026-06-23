'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CollegeGrid from '@/components/colleges/CollegeGrid';
import CollegeFilters from '@/components/colleges/CollegeFilters';
import Pagination from '@/components/ui/Pagination';
import { useSavedColleges } from '@/hooks/useSavedColleges';
import type { College } from '@/components/colleges/CollegeCard';

function CollegesContent() {
  const searchParams = useSearchParams();
  const { savedIds, toggleSave } = useSavedColleges();
  const [colleges, setColleges] = useState<College[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentPage = Number(searchParams.get('page') || '1');

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has('page')) params.set('page', '1');

      const res = await fetch(`/api/colleges?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setColleges(data.data?.colleges || []);
      setTotalPages(data.data?.totalPages || 1);
    } catch {
      setError('Failed to load colleges. Please try again.');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Explore Colleges
        </h1>
        <p className="text-[var(--text-secondary)]">
          Discover and filter through hundreds of top institutions
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-72 flex-shrink-0">
          <CollegeFilters />
        </div>

        {/* Results */}
        <div className="flex-1">
          {error ? (
            <div className="glass-card p-8 text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-500 font-medium mb-2">Something went wrong</p>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{error}</p>
              <button
                onClick={fetchColleges}
                className="btn-gradient px-4 py-2 rounded-xl text-sm font-medium text-white cursor-pointer"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <CollegeGrid
                colleges={colleges}
                loading={loading}
                savedIds={savedIds}
                onToggleSave={toggleSave}
              />
              {!loading && colleges.length > 0 && (
                <div className="mt-8">
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse-subtle space-y-4">
          <div className="h-8 bg-[var(--border-color)] rounded w-48" />
          <div className="h-4 bg-[var(--border-color)] rounded w-64" />
        </div>
      </div>
    }>
      <CollegesContent />
    </Suspense>
  );
}
