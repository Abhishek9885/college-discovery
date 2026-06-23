'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { getProxyImageUrl } from '@/lib/utils';
import SaveButton from '@/components/colleges/SaveButton';

export interface College {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  imageUrl?: string | null;
  minFees?: number | null;
  maxFees?: number | null;
  description?: string | null;
  established?: number | null;
  website?: string | null;
  _count?: {
    courses?: number;
    reviews?: number;
  };
}

interface CollegeCardProps {
  college: College;
  isSaved?: boolean;
  onToggleSave?: (collegeId: string) => void;
}

const typeBadgeVariant = (type: string) => {
  switch (type.toLowerCase()) {
    case 'iit':
      return 'primary' as const;
    case 'nit':
      return 'success' as const;
    case 'iiit':
      return 'warning' as const;
    default:
      return 'neutral' as const;
  }
};

function formatFees(min?: number | null, max?: number | null): string {
  if (!min && !max) return 'Fees N/A';
  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export default function CollegeCard({ college, isSaved = false, onToggleSave }: CollegeCardProps) {
  return (
    <Link href={`/colleges/${college.slug}`} className="block group">
      <div className="glass-card overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-violet-500/20">
          {college.imageUrl ? (
            <img
              src={getProxyImageUrl(college.imageUrl)}
              alt={college.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/30">
                {college.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Save button overlay */}
          <div className="absolute top-3 right-3">
            <SaveButton
              collegeId={college.id}
              isSaved={isSaved}
              onToggle={onToggleSave}
              size="sm"
            />
          </div>

          {/* Type badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant={typeBadgeVariant(college.type)}>{college.type}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {college.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {college.city}, {college.state}
          </p>

          <div className="flex items-center justify-between">
            <StarRating rating={college.rating} size="sm" showValue />
            <span className="text-xs font-medium text-[var(--text-tertiary)]">
              {formatFees(college.minFees, college.maxFees)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
