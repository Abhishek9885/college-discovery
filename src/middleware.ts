import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/saved']
const protectedApiRoutes = ['/api/saved', '/api/reviews']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isProtectedApiRoute = protectedApiRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Allow GET requests to public API routes, but protect mutations
  if (isProtectedApiRoute || isProtectedRoute) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    
    if (!token) {
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

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|public|images).*)',
  ],
}
