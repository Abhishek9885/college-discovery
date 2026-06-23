import type { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  success:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger:
    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  neutral:
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
};

export default function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
