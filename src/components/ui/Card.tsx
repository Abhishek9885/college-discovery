import type { ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'interactive';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'glass-card',
  elevated:
    'glass-card shadow-lg hover:shadow-xl transition-shadow duration-300',
  interactive:
    'glass-card hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}: CardProps) {
  return (
    <div className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}
