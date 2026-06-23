import CollegeCard, { type College } from '@/components/colleges/CollegeCard';
import { CollegeCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

interface CollegeGridProps {
  colleges: College[];
  loading?: boolean;
  savedIds?: Set<string>;
  onToggleSave?: (collegeId: string) => void;
  skeletonCount?: number;
}

export default function CollegeGrid({
  colleges,
  loading = false,
  savedIds = new Set(),
  onToggleSave,
  skeletonCount = 6,
}: CollegeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CollegeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <EmptyState
        title="No colleges found"
        description="Try adjusting your filters or search terms to find more colleges."
        actionLabel="Clear Filters"
        actionHref="/colleges"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map(college => (
        <CollegeCard
          key={college.id}
          college={college}
          isSaved={savedIds.has(college.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
