'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const navLinks = [
  { href: '/colleges', label: 'Colleges' },
  { href: '/compare', label: 'Compare' },
  { href: '/predictor', label: 'Predictor' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/qa', label: 'Q&A' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const userInitials = session?.user?.name
    ? session.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${
            scrolled
              ? 'bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm'
              : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="CampusConnect Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                CC
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">CampusConnect</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm transition-all duration-200
                    ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'font-bold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 shadow-sm'
                        : 'font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200 cursor-pointer"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Auth */}
              {session?.user ? (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-xs font-semibold">
                      {userInitials}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)] hidden lg:block">
                      {session.user.name}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card py-1 shadow-xl animate-[scaleIn_0.15s_ease-out]">
                      <Link
                        href="/saved"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Saved Colleges
                      </Link>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 z-50 w-72 h-full bg-[var(--bg-primary)] border-l border-[var(--border-color)] shadow-2xl md:hidden animate-[slideInRight_0.25s_ease-out]">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
              <span className="text-lg font-bold gradient-text">CampusConnect</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4 space-y-1" aria-label="Mobile navigation">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    block px-4 py-3 rounded-xl text-sm transition-colors
                    ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'font-bold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 shadow-sm'
                        : 'font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-[var(--border-color)]">
              {session?.user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold">
                      {userInitials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{session.user.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{session.user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/saved"
                    className="block px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    Saved Colleges
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" className="block">
                    <Button variant="secondary" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button variant="primary" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
