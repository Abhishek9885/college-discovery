'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { College } from '@/types'
import CompareSelector from '@/components/compare/CompareSelector'
import CompareTable from '@/components/compare/CompareTable'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'

function CompareContent() {
  const searchParams = useSearchParams()
  const addId = searchParams.get('add')
  
  const [selectedColleges, setSelectedColleges] = useState<College[]>([])
  const [detailedColleges, setDetailedColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)

  // Auto-add college if provided in query param
  useEffect(() => {
    if (addId) {
      const fetchCollege = async () => {
        try {
          const res = await fetch(`/api/colleges/${addId}`)
          const data = await res.json()
          if (data.data) {
            const college = data.data
            setSelectedColleges(prev => {
              if (prev.some(c => c.id === college.id)) return prev
              return [...prev, college].slice(0, 3)
            })
          }
        } catch (e) {
          console.error('Failed to pre-fetch college', e)
        }
      }
      fetchCollege()
    }
  }, [addId])

  // Fetch complete details for compared colleges whenever the selected list changes
  useEffect(() => {
    if (selectedColleges.length === 0) {
      setDetailedColleges([])
      return
    }

    const fetchComparisonData = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/compare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collegeIds: selectedColleges.map((c) => c.id)
          })
        })
        const data = await res.json()
        if (data.data) {
          setDetailedColleges(data.data)
        }
      } catch (e) {
        console.error('Failed to compare colleges', e)
      } finally {
        setLoading(false)
      }
    }

    // Debounce/Trigger compare fetch
    fetchComparisonData()
  }, [selectedColleges])

  const handleAddCollege = (college: College) => {
    setSelectedColleges(prev => {
      if (prev.some(c => c.id === college.id)) return prev
      return [...prev, college].slice(0, 3)
    })
  }

  const handleRemoveCollege = (collegeId: string) => {
    setSelectedColleges(prev => prev.filter(c => c.id !== collegeId))
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Compare Colleges</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Compare up to 3 colleges side-by-side on metrics like fees, placements, ratings, and course counts.
        </p>
      </div>

      {/* Selector Container */}
      <Card className="p-6 md:p-8">
        <CompareSelector
          selectedColleges={selectedColleges}
          onAddCollege={handleAddCollege}
          onRemoveCollege={handleRemoveCollege}
        />
      </Card>

      {/* Comparison Results */}
      {selectedColleges.length === 0 ? (
        <EmptyState
          title="No colleges selected"
          description="Search and add colleges in the selector above to start comparing their metrics."
        />
      ) : loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--text-secondary)] font-medium">Analyzing parameters and generating comparison...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Comparison Results ({selectedColleges.length} Colleges)
          </h2>
          <CompareTable colleges={detailedColleges} />
        </div>
      )}
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <p className="text-sm text-[var(--text-secondary)]">Loading compare page...</p>
      </div>
    }>
      <CompareContent />
    </Suspense>
  )
}
