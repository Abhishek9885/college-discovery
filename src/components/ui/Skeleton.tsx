type SkeletonVariant = 'text' | 'circle' | 'card' | 'rect';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

function SkeletonItem({
  variant = 'text',
  width,
  height,
  className = '',
}: Omit<SkeletonProps, 'count'>) {
  const baseClasses = 'animate-pulse-subtle bg-[var(--border-color)] dark:bg-slate-800';

  const variantStyles: Record<SkeletonVariant, string> = {
    text: `h-4 rounded-md ${width || 'w-full'}`,
    circle: `rounded-full ${width || 'w-10'} ${height || 'h-10'}`,
    card: `rounded-2xl ${width || 'w-full'} ${height || 'h-48'}`,
    rect: `rounded-xl ${width || 'w-full'} ${height || 'h-20'}`,
  };

  return <div className={`${baseClasses} ${variantStyles[variant]} ${className}`} />;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}: SkeletonProps) {
  if (count === 1) {
    return <SkeletonItem variant={variant} width={width} height={height} className={className} />;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem
          key={i}
          variant={variant}
          width={width}
          height={height}
          className={className}
        />
      ))}
    </div>
  );
}

export function CollegeCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <SkeletonItem variant="card" height="h-48" className="!rounded-b-none" />
      <div className="p-5 space-y-3">
        <SkeletonItem variant="text" width="w-3/4" />
        <SkeletonItem variant="text" width="w-1/2" />
        <div className="flex gap-2">
          <SkeletonItem variant="text" width="w-16" />
          <SkeletonItem variant="text" width="w-20" />
        </div>
        <SkeletonItem variant="text" width="w-2/3" />
      </div>
    </div>
  );
}
