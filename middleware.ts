import { validateSessionToken } from '@/lib/utils/session'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow /admin (login page) - no protection needed
  if (pathname === '/admin') {
    return NextResponse.next()
  }

  // Protect other admin routes (dashboard, products, etc.)
  if (pathname.startsWith('/admin/') && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('admin_session')?.value

    // Check if session exists and is valid (not expired)
    if (!validateSessionToken(sessionToken)) {
      // Redirect to /admin if no session or expired
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Redirect from login page if already authenticated
  if (pathname === '/admin/login') {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (validateSessionToken(sessionToken)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
