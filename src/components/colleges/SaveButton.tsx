'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SaveButtonProps {
  collegeId: string;
  isSaved: boolean;
  onToggle?: (collegeId: string) => void;
  size?: 'sm' | 'md';
}

export default function SaveButton({ collegeId, isSaved, onToggle, size = 'md' }: SaveButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [optimisticSaved, setOptimisticSaved] = useState(isSaved);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      router.push('/login');
      return;
    }

    setSaving(true);
    setOptimisticSaved(!optimisticSaved);

    try {
      const url = optimisticSaved ? `/api/saved/${collegeId}` : '/api/saved';
      const method = optimisticSaved ? 'DELETE' : 'POST';
      const body = optimisticSaved ? undefined : JSON.stringify({ collegeId });
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (res.ok) {
        onToggle?.(collegeId);
      } else {
        setOptimisticSaved(optimisticSaved); // revert
      }
    } catch {
      setOptimisticSaved(optimisticSaved); // revert
    } finally {
      setSaving(false);
    }
  };

  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={handleClick}
      disabled={saving}
      className={`
        ${sizeClasses} rounded-full flex items-center justify-center
        transition-all duration-200 cursor-pointer
        ${
          optimisticSaved
            ? 'bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50'
            : 'bg-[var(--bg-glass)] text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
        }
        ${saving ? 'opacity-50' : ''}
      `}
      aria-label={optimisticSaved ? 'Remove from saved' : 'Save college'}
    >
      <svg
        className={iconSize}
        fill={optimisticSaved ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={optimisticSaved ? 0 : 2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
