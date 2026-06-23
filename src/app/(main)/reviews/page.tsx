import React from 'react';

export default function ReviewsPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-violet-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-primary-500/20 animate-float">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
        Student Reviews
      </h1>
      <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
        We are aggregating thousands of verified student reviews to help you make the best decision. This feature is launching very soon!
      </p>
      <a href="/" className="btn-gradient px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-primary-500/30 transition-all inline-block">
        Back to Home
      </a>
    </div>
  );
}
