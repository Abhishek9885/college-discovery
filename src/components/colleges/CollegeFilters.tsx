'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const collegeTypes = ['IIT', 'NIT', 'IIIT', 'Central', 'State', 'Private', 'Deemed'];

const stateOptions = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
];

export default function CollegeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get('type')?.split(',').filter(Boolean) || []
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete('page'); // Reset page on filter change
      router.push(`/colleges?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    updateParams({ search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    updateParams({ type: newTypes.join(',') });
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    updateParams({ state });
  };

  const clearAll = () => {
    setSearch('');
    setSelectedState('');
    setSelectedTypes([]);
    router.push('/colleges');
  };

  const hasFilters = search || selectedState || selectedTypes.length > 0;

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <Input
        label="Search"
        placeholder="Search colleges..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">State</label>
        <select
          value={selectedState}
          onChange={e => handleStateChange(e.target.value)}
          className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
        >
          <option value="">All States</option>
          {stateOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">College Type</label>
        <div className="flex flex-wrap gap-2">
          {collegeTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
                ${
                  selectedTypes.includes(type)
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)]'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasFilters && (
        <Button variant="ghost" fullWidth size="sm" onClick={clearAll}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {mobileOpen ? 'Hide Filters' : 'Show Filters'}
          {hasFilters && (
            <span className="ml-1 w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
              {(search ? 1 : 0) + (selectedState ? 1 : 0) + selectedTypes.length}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass-card p-5 mb-6">
          {filterContent}
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block glass-card p-5 sticky top-20">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Filters</h2>
        {filterContent}
      </div>
    </>
  );
}
