import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-tertiary)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-xl border border-[var(--border-color)]
              bg-[var(--bg-card)] text-[var(--text-primary)]
              placeholder:text-[var(--text-tertiary)]
              focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
              transition-all duration-300
              ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 text-sm
              ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
