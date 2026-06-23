'use client'

import { College } from '@/types'
import StarRating from '@/components/ui/StarRating'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface PredictorResultItem {
  college: College
  minRank: number
  maxRank: number
  chance: 'High' | 'Medium' | 'Low'
}

interface PredictorResultsProps {
  results: PredictorResultItem[]
  rankInput: number
}

export default function PredictorResults({ results, rankInput }: PredictorResultsProps) {
  if (results.length === 0) return null

  const getChanceBadgeVariant = (chance: 'High' | 'Medium' | 'Low') => {
    switch (chance) {
      case 'High':
        return 'success'
      case 'Medium':
        return 'warning'
      case 'Low':
        return 'danger'
      default:
        return 'neutral'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border-color)] pb-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Recommended Colleges ({results.length} matches)
        </h2>
        <p className="text-xs text-[var(--text-secondary)] font-medium mt-1 sm:mt-0">
          Showing colleges where cutoff range matches your rank <strong className="text-primary-500 font-extrabold">{rankInput}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map(({ college, minRank, maxRank, chance }) => (
          <Card key={college.id} className="p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-1">
                  <Badge variant="primary">{college.type}</Badge>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)] line-clamp-1 hover:text-primary-500">
                    <Link href={`/colleges/${college.slug}`}>{college.name}</Link>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <svg className="w-3 h-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {college.city}, {college.state}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={getChanceBadgeVariant(chance)}>
                    {chance} Chance
                  </Badge>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] text-xs">
                <div>
                  <p className="text-[var(--text-tertiary)] font-medium mb-0.5">Annual Fees</p>
                  <p className="font-bold text-[var(--text-primary)]">
                    {formatCurrency(college.minFees)} - {formatCurrency(college.maxFees)}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-tertiary)] font-medium mb-0.5">Rating</p>
                  <div className="flex items-center gap-1">
                    <StarRating rating={college.rating} size="sm" />
                    <span className="font-bold text-[var(--text-primary)]">{college.rating}</span>
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-[var(--border-color)]">
                  <p className="text-[var(--text-tertiary)] font-medium mb-0.5">Cutoff Rank Range</p>
                  <p className="font-bold text-primary-600 dark:text-primary-400">
                    {minRank.toLocaleString()} - {maxRank.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border-color)]">
              <Link
                href={`/compare?add=${college.id}`}
                className="text-xs font-bold text-[var(--text-secondary)] hover:text-primary-500 transition-colors"
              >
                + Compare College
              </Link>
              <Link
                href={`/colleges/${college.slug}`}
                className="inline-flex items-center text-xs font-bold text-primary-500 hover:underline gap-1"
              >
                View Details
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
