'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function StarRating({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md',
  showValue = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayRating = hovered ?? rating;

  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayRating;
        const isHalf = !isFilled && starValue - 0.5 <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHovered(starValue)}
            onMouseLeave={() => interactive && setHovered(null)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-150 disabled:opacity-100`}
            aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
          >
            <svg
              className={`${sizeClasses[size]} ${isFilled || isHalf ? 'star-filled' : 'star-empty'}`}
              fill={isFilled ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isFilled ? 0 : 1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-[var(--text-secondary)]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
