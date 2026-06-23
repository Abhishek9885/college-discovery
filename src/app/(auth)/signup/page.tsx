'use client';

import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and a number';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || data.error || 'Signup failed. Please try again.' });
        return;
      }

      // Auto-login after signup
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Account created but login failed. Please log in manually.' });
      } else {
        router.push('/colleges');
        router.refresh();
      }
    } catch {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'name', label: 'Full Name', type: 'text', value: name, onChange: setName, placeholder: 'John Doe', autoComplete: 'name' },
    { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'you@example.com', autoComplete: 'email' },
    { id: 'password', label: 'Password', type: showPassword ? 'text' : 'password', value: password, onChange: setPassword, placeholder: '••••••••', autoComplete: 'new-password' },
    { id: 'confirmPassword', label: 'Confirm Password', type: showPassword ? 'text' : 'password', value: confirmPassword, onChange: setConfirmPassword, placeholder: '••••••••', autoComplete: 'new-password' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
        <p className="text-sm text-white/70">Join CampusConnect and discover your future</p>
      </div>

      {errors.general && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-sm text-red-200 text-center" role="alert">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {fields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-white/90 mb-1.5">
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className={`
                  w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/40
                  bg-white/10 border transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40
                  ${errors[field.id] ? 'border-red-400' : 'border-white/20'}
                  ${(field.id === 'password' || field.id === 'confirmPassword') ? 'pr-10' : ''}
                `}
              />
              {(field.id === 'password' || field.id === 'confirmPassword') && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {errors[field.id] && (
              <p className="mt-1.5 text-xs text-red-300">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <Button
          type="submit"
          loading={loading}
          fullWidth
          className="!bg-white !text-primary-700 font-semibold hover:!bg-white/90 !shadow-lg mt-2"
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/60">
        Already have an account?{' '}
        <Link href="/login" className="text-white font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
