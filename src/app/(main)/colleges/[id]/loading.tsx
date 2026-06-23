export default function CollegeDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero skeleton */}
      <div className="rounded-3xl overflow-hidden glass-card border border-[var(--border-color)]">
        <div className="h-48 md:h-64 bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 relative -mt-16 md:-mt-20">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-slate-300 dark:bg-slate-700 animate-pulse border-4 border-[var(--bg-primary)]" />
          <div className="flex-1 space-y-3 pt-16 md:pt-20">
            <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-1/5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
        <div className="space-y-6">
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    </div>
  )
}
