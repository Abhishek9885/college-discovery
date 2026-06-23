'use client';

import { useState, type FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';

interface ReviewFormProps {
  collegeId: string;
  onSuccess?: (newReview: any) => void;
}

export default function ReviewForm({ collegeId, onSuccess }: ReviewFormProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  if (!session?.user) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-sm text-[var(--text-secondary)] mb-3">
          Please sign in to leave a review.
        </p>
        <a href="/login">
          <Button variant="primary" size="sm">
            Sign In
          </Button>
        </a>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (rating === 0) newErrors.rating = 'Please select a rating';
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!comment.trim()) newErrors.comment = 'Comment is required';
    if (comment.trim().length < 10) newErrors.comment = 'Comment must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId, rating, title, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ general: data.error || 'Failed to submit review' });
        return;
      }

      const data = await res.json();
      setSuccess(true);
      setRating(0);
      setTitle('');
      setComment('');
      onSuccess?.(data.data);

      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Write a Review</h3>

      {success && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-700 dark:text-emerald-300" role="alert">
          Review submitted successfully!
        </div>
      )}

      {errors.general && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-300" role="alert">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Rating
          </label>
          <StarRating rating={rating} interactive onChange={setRating} size="lg" />
          {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
        </div>

        {/* Title */}
        <Input
          label="Title"
          placeholder="Summarize your experience"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={errors.title}
        />

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your detailed experience..."
            rows={4}
            className={`
              w-full rounded-xl border border-[var(--border-color)]
              bg-[var(--bg-card)] text-[var(--text-primary)]
              placeholder:text-[var(--text-tertiary)]
              focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
              transition-all duration-300 px-4 py-2.5 text-sm resize-none
              ${errors.comment ? 'border-red-500' : ''}
            `}
          />
          {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment}</p>}
        </div>

        <Button type="submit" loading={loading}>
          Submit Review
        </Button>
      </form>
    </div>
  );
}
