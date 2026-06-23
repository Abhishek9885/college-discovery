import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/saved']
const protectedApiRoutes = ['/api/saved', '/api/reviews']

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isProtectedApiRoute = protectedApiRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Allow GET requests to public API routes, but protect mutations
  if (isProtectedApiRoute) {
    // POST/PUT/DELETE on /api/reviews always requires auth
    // All methods on /api/saved require auth
    if (!req.auth) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { status: 401 }
        )
      }
      const signInUrl = new URL('/login', req.nextUrl.origin)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  if (isProtectedRoute) {
    if (!req.auth) {
      const signInUrl = new URL('/login', req.nextUrl.origin)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
