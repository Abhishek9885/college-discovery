import StarRating from '@/components/ui/StarRating';

interface Review {
  id: string;
  title: string;
  comment: string;
  rating: number;
  createdAt: string;
  user: {
    name?: string | null;
  };
}

interface ReviewCardProps {
  review: Review;
}

function getInitials(name?: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          {getInitials(review.user.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-medium text-sm text-[var(--text-primary)]">
              {review.user.name || 'Anonymous'}
            </p>
            <time className="text-xs text-[var(--text-tertiary)]">
              {formatDate(review.createdAt)}
            </time>
          </div>

          <div className="mt-1">
            <StarRating rating={review.rating} size="sm" />
          </div>

          {review.title && (
            <h4 className="mt-2 font-medium text-sm text-[var(--text-primary)]">
              {review.title}
            </h4>
          )}

          <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
