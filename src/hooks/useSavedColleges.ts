'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export function useSavedColleges() {
  const { data: session } = useSession();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      setSavedIds(new Set());
      return;
    }

    const fetchSaved = async () => {
      try {
        const res = await fetch('/api/saved');
        if (res.ok) {
          const data = await res.json();
          const ids = new Set<string>(
            data.savedColleges?.map((sc: { collegeId: string }) => sc.collegeId) ?? []
          );
          setSavedIds(ids);
        }
      } catch {
        // Silently fail - user can still interact
      }
    };

    fetchSaved();
  }, [session?.user]);

  const isCollegeSaved = useCallback(
    (collegeId: string) => savedIds.has(collegeId),
    [savedIds]
  );

  const toggleSave = useCallback(
    async (collegeId: string) => {
      if (!session?.user) return false;

      const isSaved = savedIds.has(collegeId);
      setLoading(true);

      // Optimistic update
      setSavedIds(prev => {
        const next = new Set(prev);
        if (isSaved) {
          next.delete(collegeId);
        } else {
          next.add(collegeId);
        }
        return next;
      });

      try {
        const res = await fetch('/api/saved', {
          method: isSaved ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId }),
        });

        if (!res.ok) {
          // Revert on failure
          setSavedIds(prev => {
            const next = new Set(prev);
            if (isSaved) {
              next.add(collegeId);
            } else {
              next.delete(collegeId);
            }
            return next;
          });
          return false;
        }
        return true;
      } catch {
        // Revert on error
        setSavedIds(prev => {
          const next = new Set(prev);
          if (isSaved) {
            next.add(collegeId);
          } else {
            next.delete(collegeId);
          }
          return next;
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [session?.user, savedIds]
  );

  return { savedIds, isCollegeSaved, toggleSave, loading, isAuthenticated: !!session?.user };
}
