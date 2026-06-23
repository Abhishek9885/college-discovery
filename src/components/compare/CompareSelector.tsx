'use client'

import { useState, useEffect, useRef } from 'react'
import { College } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface CompareSelectorProps {
  selectedColleges: College[]
  onAddCollege: (college: College) => void
  onRemoveCollege: (collegeId: string) => void
}

export default function CompareSelector({
  selectedColleges,
  onAddCollege,
  onRemoveCollege
}: CompareSelectorProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const debouncedSearch = useDebounce(search, 300)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch results when debouncedSearch changes
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([])
      return
    }

    const fetchColleges = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/colleges?search=${encodeURIComponent(debouncedSearch)}&limit=5`)
        const data = await res.json()
        if (data.data?.colleges) {
          // Filter out already selected colleges
          const filtered = data.data.colleges.filter(
            (c: College) => !selectedColleges.some(selected => selected.id === c.id)
          )
          setResults(filtered)
        }
      } catch (e) {
        console.error('Failed to search colleges', e)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [debouncedSearch, selectedColleges])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Search Input with Dropdown */}
      <div className="relative">
        <Input
          label="Search and Add Colleges"
          placeholder={
            selectedColleges.length >= 3
              ? "Max 3 colleges selected (remove one to add another)"
              : "Type college name (e.g., IIT Bombay)..."
          }
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          disabled={selectedColleges.length >= 3}
          className="w-full"
        />

        {isOpen && (search.trim() || loading) && (
          <div className="absolute z-20 left-0 right-0 mt-1 rounded-2xl glass-card border border-[var(--border-color)] overflow-hidden shadow-xl max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-sm text-[var(--text-secondary)]">
                Searching colleges...
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-sm text-[var(--text-secondary)]">
                No colleges found matching "{search}"
              </div>
            ) : (
              <div className="divide-y divide-[var(--border-color)]">
                {results.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => {
                      onAddCollege(college)
                      setSearch('')
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[var(--bg-secondary)] flex justify-between items-center transition-colors duration-150 cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[var(--text-primary)]">
                        {college.name}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {college.city}, {college.state} • {college.type}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary-500 hover:text-primary-600">
                      + Add
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Chips */}
      {selectedColleges.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedColleges.map((college) => (
            <div
              key={college.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
            >
              <span>{college.name}</span>
              <button
                onClick={() => onRemoveCollege(college.id)}
                className="hover:bg-primary-500/20 rounded-full p-0.5 transition-colors duration-150 cursor-pointer"
                title="Remove college"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
