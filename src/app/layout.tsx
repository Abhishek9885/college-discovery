import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import SessionProvider from '@/components/providers/SessionProvider';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'CampusConnect | College Discovery Platform',
  description:
    'Discover your perfect college. Explore 1000+ colleges, compare programs, and find your ideal match with AI-powered predictions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <SessionProvider>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
