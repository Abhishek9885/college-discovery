'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StarRating from '@/components/ui/StarRating';
import { CollegeCardSkeleton } from '@/components/ui/Skeleton';
import type { College } from '@/components/colleges/CollegeCard';
import { getProxyImageUrl } from '@/lib/utils';



const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Smart Search',
    description: 'Find colleges by name, location, type, and ranking with our intelligent search.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Compare Colleges',
    description: 'Side-by-side comparison of fees, placements, and ratings for informed decisions.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Save Favorites',
    description: 'Bookmark colleges you love and build your personalized shortlist effortlessly.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'College Predictor',
    description: 'Enter your exam rank and discover colleges where you can get admission.',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [topColleges, setTopColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopColleges = async () => {
      try {
        const res = await fetch('/api/colleges?sortBy=rating&limit=6');
        if (res.ok) {
          const data = await res.json();
          setTopColleges(data.data?.colleges || []);
        }
      } catch {
        // Silently fail, show empty state
      } finally {
        setLoading(false);
      }
    };
    fetchTopColleges();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-violet-600/10" aria-hidden="true" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[800] leading-[0.95] tracking-tight mb-6">
                <span className="block text-[var(--text-primary)]">Discover Your</span>
                <span className="block gradient-text">Perfect College</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0">
                Explore 1000+ colleges, compare programs, and find your ideal match
                with AI-powered predictions.
              </p>

              {/* Search bar */}
              <div className="max-w-3xl mx-auto lg:mx-0 mb-8">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--text-tertiary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search colleges, courses, locations..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-base lg:text-lg transition-all shadow-sm"
                      aria-label="Search colleges"
                    />
                  </div>
                  <Button type="submit" size="lg" className="px-8 text-lg hidden sm:flex">
                    Search
                  </Button>
                </form>
                {/* Quick Chips */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                  {['Engineering', 'MBA', 'Medical', 'Law'].map((chip) => (
                    <Link key={chip} href={`/colleges?course=${encodeURIComponent(chip)}`}>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition-colors cursor-pointer border border-[var(--border-color)]">
                        {chip}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link href="/colleges">
                  <Button variant="primary" size="lg">
                    Explore Colleges
                  </Button>
                </Link>
                <Link href="/predictor">
                  <Button variant="secondary" size="lg">
                    College Predictor
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero image collage / floating cards */}
            <div className="hidden lg:block relative w-full h-full min-h-[500px]">
              {/* Glow Behind Collage */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 rounded-full opacity-60 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.4), transparent 70%)' }} />

              <div className="relative w-full aspect-square max-w-lg mx-auto z-10 mt-8">
                {/* Image Collage Grid */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-5 p-4">
                  {/* Top Left (IIT Bombay) */}
                  <div className="relative rounded-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}>
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000" alt="Beautiful Campus" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))' }} />
                  </div>
                  {/* Top Right (IIT Delhi) */}
                  <div className="relative rounded-2xl overflow-hidden transform translate-y-8 rotate-3 hover:rotate-0 transition-transform duration-500 z-10" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}>
                    <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000" alt="University Students" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))' }} />
                  </div>
                  {/* Bottom Left (IIT Madras) */}
                  <div className="relative rounded-2xl overflow-hidden transform -translate-y-4 -rotate-3 hover:rotate-0 transition-transform duration-500 z-10" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}>
                    <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000" alt="Modern Campus Building" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))' }} />
                  </div>
                  {/* Bottom Right (NIT Trichy) */}
                  <div className="relative rounded-2xl overflow-hidden transform translate-y-4 rotate-3 hover:rotate-0 transition-transform duration-500 z-10" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}>
                    <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" alt="Library Campus" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.05))' }} />
                  </div>
                </div>

                {/* Floating stat cards */}
                <div 
                  className="absolute top-12 -left-6 px-6 py-4 rounded-2xl animate-float z-20 shadow-2xl" 
                  style={{ 
                    animationDelay: '0s', animationDuration: '5s',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' 
                  }}
                >
                  <p className="text-3xl font-black text-white leading-tight">4.8 <span className="text-yellow-400 text-2xl">★</span></p>
                  <p className="text-[13px] font-semibold text-white/80 tracking-wide mt-1">Student Rating</p>
                </div>

                <div 
                  className="absolute top-1/2 -right-4 px-6 py-4 rounded-2xl animate-float z-20 shadow-2xl" 
                  style={{ 
                    animationDelay: '1.5s', animationDuration: '6s',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' 
                  }}
                >
                  <p className="text-3xl font-black text-white leading-tight"><span className="text-emerald-400 text-2xl mr-1">₹</span>54 LPA</p>
                  <p className="text-[13px] font-semibold text-white/80 tracking-wide mt-1">Highest CTC</p>
                </div>

                <div 
                  className="absolute bottom-24 -left-2 px-6 py-4 rounded-2xl animate-float z-20 shadow-2xl" 
                  style={{ 
                    animationDelay: '0.8s', animationDuration: '4.5s',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' 
                  }}
                >
                  <p className="text-3xl font-black text-white leading-tight"><span className="text-blue-400 text-2xl mr-1">#</span>12</p>
                  <p className="text-[13px] font-semibold text-white/80 tracking-wide mt-1">NIRF 2025</p>
                </div>

                <div 
                  className="absolute bottom-8 right-8 px-6 py-4 rounded-2xl animate-float z-20 shadow-2xl" 
                  style={{ 
                    animationDelay: '2s', animationDuration: '5.5s',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' 
                  }}
                >
                  <p className="text-3xl font-black text-white leading-tight">95<span className="text-violet-400 text-2xl">%</span></p>
                  <p className="text-[13px] font-semibold text-white/80 tracking-wide mt-1">Placement Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="py-10 border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-[var(--border-color)]/50">
            <div className="px-4">
              <p className="text-3xl font-extrabold text-[var(--text-primary)]">1200+</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium uppercase tracking-wider">Colleges</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-extrabold text-[var(--text-primary)]">50K+</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium uppercase tracking-wider">Students</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-extrabold text-[var(--text-primary)]">20K+</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium uppercase tracking-wider">Reviews</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-extrabold text-[var(--text-primary)]">95%</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium uppercase tracking-wider">Accuracy Predictor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Colleges Section */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
              Trending Colleges
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Discover the most sought-after institutions based on real student data and placement records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1: Highest Placements */}
            <div className="glass-card p-6 flex flex-col h-full border-t-4 border-t-green-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Highest Placements</h3>
              </div>
              <div className="space-y-4 flex-1">
                {[
                  { name: 'IIT Bombay', metric: '₹3.67 CPA', location: 'Mumbai, Maharashtra' },
                  { name: 'BITS Pilani', metric: '₹60.7 LPA', location: 'Pilani, Rajasthan' },
                  { name: 'IIT Delhi', metric: '₹2.4 CPA', location: 'New Delhi, Delhi' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer group">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] group-hover:text-primary-600 transition-colors">{item.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 dark:text-green-400">{item.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Best ROI */}
            <div className="glass-card p-6 flex flex-col h-full border-t-4 border-t-secondary-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center text-secondary-600 dark:text-secondary-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Best ROI</h3>
              </div>
              <div className="space-y-4 flex-1">
                {[
                  { name: 'Jadavpur University', metric: 'Fees: ₹10K', location: 'Kolkata, West Bengal' },
                  { name: 'FMS Delhi', metric: 'Avg: ₹34 LPA', location: 'New Delhi, Delhi' },
                  { name: 'Jamia Millia Islamia', metric: 'Fees: ₹16K', location: 'New Delhi, Delhi' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer group">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] group-hover:text-secondary-600 transition-colors">{item.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary-600 dark:text-secondary-400">{item.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: Most Searched */}
            <div className="glass-card p-6 flex flex-col h-full border-t-4 border-t-accent-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-600 dark:text-accent-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Most Searched</h3>
              </div>
              <div className="space-y-4 flex-1">
                {[
                  { name: 'VIT Vellore', metric: '12K+ Searches', location: 'Vellore, Tamil Nadu' },
                  { name: 'NIT Trichy', metric: '9.8K+ Searches', location: 'Tiruchirappalli, Tamil Nadu' },
                  { name: 'SRM Institute', metric: '8.5K+ Searches', location: 'Chennai, Tamil Nadu' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer group">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] group-hover:text-accent-600 transition-colors">{item.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-600 dark:text-accent-400">{item.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
              Everything you need to decide
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our platform provides all the tools and data you need to make informed decisions about your education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(feature => (
              <Card key={feature.title} variant="interactive" padding="lg">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Colleges Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                Top Rated Colleges
              </h2>
              <p className="text-[var(--text-secondary)]">
                Highest rated institutions by our community
              </p>
            </div>
            <Link href="/colleges">
              <Button variant="ghost">
                View All →
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          ) : topColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topColleges.map(college => (
                <Link key={college.id} href={`/colleges/${college.slug}`} className="block group">
                  <Card variant="interactive" padding="none">
                    <div className="relative h-44 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary-500/20 to-violet-500/20">
                      {college.imageUrl ? (
                        <img
                          src={getProxyImageUrl(college.imageUrl)}
                          alt={college.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white/30">
                            {college.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {college.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        {college.city}, {college.state}
                      </p>
                      <StarRating rating={college.rating} size="sm" showValue />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--text-tertiary)]">
              <p>No colleges available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-violet-600 px-8 py-16 text-center animate-gradient">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" aria-hidden="true" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to find your dream college?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of students who have found their perfect college match using CampusConnect.
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="!bg-white !text-primary-700 font-semibold hover:!bg-white/90 !shadow-xl"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
