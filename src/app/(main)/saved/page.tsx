'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CollegeGrid from '@/components/colleges/CollegeGrid'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { College } from '@/types'

export default function SavedCollegesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/saved')
      return
    }

    if (status === 'authenticated') {
      const fetchSavedColleges = async () => {
        try {
          const res = await fetch('/api/saved')
          const data = await res.json()
          if (data.data) {
            // Mapping the list of saved college relations to the colleges themselves
            const list = data.data.map((item: any) => item.college)
            setColleges(list)
            setSavedIds(new Set(list.map((c: any) => c.id)))
          }
        } catch (e) {
          console.error('Failed to fetch saved colleges', e)
        } finally {
          setLoading(false)
        }
      }
      fetchSavedColleges()
    }
  }, [status, router])

  const handleToggleSave = (collegeId: string) => {
    // When saved status is toggled (removed), update the list on the page
    setColleges(prev => prev.filter(c => c.id !== collegeId))
    setSavedIds(prev => {
      const next = new Set(prev)
      next.delete(collegeId)
      return next
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <div className="h-8 w-48 bg-[var(--border-color)] rounded animate-pulse" />
        <div className="h-4 w-96 bg-[var(--border-color)] rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 bg-[var(--border-color)] rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Title block */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Saved Colleges</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Manage your shortlisted colleges, view details, compare, or remove them.
        </p>
      </div>

      {colleges.length === 0 ? (
        <EmptyState
          title="No saved colleges yet"
          description="Your shortlist is empty. Explore and save colleges to see them here!"
          actionLabel="Explore Colleges"
          actionHref="/colleges"
        />
      ) : (
        <div className="space-y-6">
          <CollegeGrid
            colleges={colleges}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        </div>
      )}
    </div>
  )
}
