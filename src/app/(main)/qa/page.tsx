import React from 'react';

export default function QAPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-accent-500/20 animate-float">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
        Questions & Answers
      </h1>
      <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
        Have questions about admissions, cutoffs, or campus life? Our community Q&A forum is launching soon to connect you with alumni and experts.
      </p>
      <a href="/" className="btn-gradient px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-primary-500/30 transition-all inline-block">
        Back to Home
      </a>
    </div>
  );
}
