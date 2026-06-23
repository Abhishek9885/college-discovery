'use client';

import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
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
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Invalid email or password. Please try again.' });
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

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-sm text-white/70">Sign in to continue to CampusConnect</p>
      </div>

      {errors.general && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-sm text-red-200 text-center" role="alert">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`
              w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/40
              bg-white/10 border transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40
              ${errors.email ? 'border-red-400' : 'border-white/20'}
            `}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`
              w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/40
              bg-white/10 border transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40
              ${errors.password ? 'border-red-400' : 'border-white/20'}
            `}
            autoComplete="current-password"
          />
          {errors.password && <p className="mt-1.5 text-xs text-red-300">{errors.password}</p>}
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
          className="!bg-white !text-primary-700 font-semibold hover:!bg-white/90 !shadow-lg mt-2"
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/60">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-white font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
