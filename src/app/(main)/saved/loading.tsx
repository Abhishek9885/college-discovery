import { CollegeCardSkeleton } from '@/components/ui/Skeleton'

export default function SavedLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CollegeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
