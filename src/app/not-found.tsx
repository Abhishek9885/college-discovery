import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-black gradient-text tracking-tighter">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Page Not Found</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-xl btn-gradient font-bold text-sm cursor-pointer shadow-md"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
