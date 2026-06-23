import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary-600 via-violet-600 to-primary-800 animate-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 flex items-center gap-2 mb-8 group"
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
          CC
        </div>
        <span className="text-2xl font-bold text-white">CampusConnect</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
