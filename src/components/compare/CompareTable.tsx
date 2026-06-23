'use client'

import { College } from '@/types'
import StarRating from '@/components/ui/StarRating'
import Link from 'next/link'

interface CompareTableProps {
  colleges: College[]
}

export default function CompareTable({ colleges }: CompareTableProps) {
  if (colleges.length === 0) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Get highlights (best values)
  const getBestRating = () => Math.max(...colleges.map(c => c.rating))
  const getBestAvgPackage = () => {
    const packages = colleges.map(c => c.placements?.[0]?.avgPackage || 0)
    return Math.max(...packages)
  }
  const getBestHighestPackage = () => {
    const packages = colleges.map(c => c.placements?.[0]?.highestPackage || 0)
    return Math.max(...packages)
  }
  const getBestPlacementRate = () => {
    const rates = colleges.map(c => c.placements?.[0]?.placementRate || 0)
    return Math.max(...rates)
  }
  const getLowestMinFees = () => Math.min(...colleges.map(c => c.minFees))

  const bestRating = getBestRating()
  const bestAvgPackage = getBestAvgPackage()
  const bestHighestPackage = getBestHighestPackage()
  const bestPlacementRate = getBestPlacementRate()
  const lowestMinFees = getLowestMinFees()

  return (
    <div className="rounded-3xl overflow-hidden glass-card border border-[var(--border-color)] overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
            <th className="p-5 font-bold text-[var(--text-primary)] w-1/4">Comparison Parameters</th>
            {colleges.map(c => (
              <th key={c.id} className="p-5 w-1/4">
                <div className="space-y-1">
                  <div className="font-extrabold text-base text-primary-600 dark:text-primary-400">
                    {c.name}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {c.city}, {c.state}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {/* Action Link */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Details Page</td>
            {colleges.map(c => (
              <td key={c.id} className="p-5">
                <Link
                  href={`/colleges/${c.slug}`}
                  className="inline-flex items-center text-xs font-bold text-primary-500 hover:underline gap-1"
                >
                  View Details
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </td>
            ))}
          </tr>

          {/* Rating */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Rating</td>
            {colleges.map(c => {
              const isBest = c.rating === bestRating && bestRating > 0
              return (
                <td key={c.id} className="p-5">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={c.rating} />
                    <span className={`font-bold ${isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                      {c.rating} {isBest && '🏆'}
                    </span>
                  </div>
                </td>
              )
            })}
          </tr>

          {/* College Type */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Type</td>
            {colleges.map(c => (
              <td key={c.id} className="p-5 font-semibold text-[var(--text-secondary)]">
                {c.type}
              </td>
            ))}
          </tr>

          {/* Established */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Established Year</td>
            {colleges.map(c => (
              <td key={c.id} className="p-5 text-[var(--text-secondary)] font-medium">
                {c.established} ({new Date().getFullYear() - c.established} years old)
              </td>
            ))}
          </tr>

          {/* Fees */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Fees Range (per year)</td>
            {colleges.map(c => {
              const isBest = c.minFees === lowestMinFees
              return (
                <td key={c.id} className="p-5">
                  <div className={`font-bold ${isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                    {formatCurrency(c.minFees)} - {formatCurrency(c.maxFees)}
                  </div>
                  {isBest && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">Most Affordable</span>}
                </td>
              )
            })}
          </tr>

          {/* Courses Count */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Courses Offered</td>
            {colleges.map(c => (
              <td key={c.id} className="p-5 font-semibold text-[var(--text-secondary)]">
                {c._count?.courses || c.courses?.length || 0} Programs
              </td>
            ))}
          </tr>

          {/* Average Package */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Average Package (LPA)</td>
            {colleges.map(c => {
              const latestPlacement = c.placements?.[0]
              const val = latestPlacement?.avgPackage || 0
              const isBest = val === bestAvgPackage && bestAvgPackage > 0
              return (
                <td key={c.id} className="p-5">
                  <div className={`text-base font-extrabold ${isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                    {val ? `₹${val.toFixed(1)} LPA` : 'N/A'}
                  </div>
                  {latestPlacement && <span className="text-[10px] text-[var(--text-tertiary)]">For {latestPlacement.year} batch</span>}
                </td>
              )
            })}
          </tr>

          {/* Highest Package */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Highest Package (LPA)</td>
            {colleges.map(c => {
              const latestPlacement = c.placements?.[0]
              const val = latestPlacement?.highestPackage || 0
              const isBest = val === bestHighestPackage && bestHighestPackage > 0
              return (
                <td key={c.id} className="p-5">
                  <div className={`text-base font-extrabold ${isBest ? 'text-violet-600 dark:text-violet-400' : 'text-[var(--text-primary)]'}`}>
                    {val ? `₹${val.toFixed(1)} LPA` : 'N/A'}
                  </div>
                  {latestPlacement && <span className="text-[10px] text-[var(--text-tertiary)]">For {latestPlacement.year} batch</span>}
                </td>
              )
            })}
          </tr>

          {/* Placement Rate */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Placement Rate</td>
            {colleges.map(c => {
              const latestPlacement = c.placements?.[0]
              const val = latestPlacement?.placementRate || 0
              const isBest = val === bestPlacementRate && bestPlacementRate > 0
              return (
                <td key={c.id} className="p-5">
                  <div className={`font-extrabold ${isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                    {val ? `${val}%` : 'N/A'}
                  </div>
                  {latestPlacement && <span className="text-[10px] text-[var(--text-tertiary)]">For {latestPlacement.year} batch</span>}
                </td>
              )
            })}
          </tr>

          {/* Top Recruiters */}
          <tr>
            <td className="p-5 font-bold text-[var(--text-primary)]">Top Recruiters</td>
            {colleges.map(c => {
              const latestPlacement = c.placements?.[0]
              let recruiters: string[] = []
              if (latestPlacement?.topRecruiters) {
                try {
                  recruiters = JSON.parse(latestPlacement.topRecruiters)
                } catch (e) {
                  if (Array.isArray(latestPlacement.topRecruiters)) {
                    recruiters = latestPlacement.topRecruiters as any
                  }
                }
              }
              return (
                <td key={c.id} className="p-5">
                  {recruiters.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {recruiters.slice(0, 4).map(r => (
                        <span key={r} className="text-[10px] bg-[var(--bg-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 rounded font-medium text-[var(--text-secondary)]">
                          {r}
                        </span>
                      ))}
                      {recruiters.length > 4 && (
                        <span className="text-[10px] text-[var(--text-tertiary)] self-center pl-1">
                          +{recruiters.length - 4} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-[var(--text-tertiary)]">N/A</span>
                  )}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
