import { CollegeCardSkeleton } from '@/components/ui/Skeleton'

export default function CollegesLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters skeleton */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="h-10 bg-[var(--border-color)] rounded-xl animate-pulse" />
          <div className="h-32 bg-[var(--border-color)] rounded-xl animate-pulse" />
          <div className="h-20 bg-[var(--border-color)] rounded-xl animate-pulse" />
          <div className="h-20 bg-[var(--border-color)] rounded-xl animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-[var(--border-color)] rounded animate-pulse" />
            <div className="h-10 w-40 bg-[var(--border-color)] rounded-xl animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CollegeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
