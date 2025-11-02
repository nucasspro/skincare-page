import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function isValidSession(sessionToken: string | undefined): boolean {
  if (!sessionToken) return false

  try {
    // Decode session token to get expiry timestamp
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8')
    const [username, expiresAtStr] = decoded.split(':')

    if (!username || !expiresAtStr) return false

    // Check if session has expired
    const expiresAt = parseInt(expiresAtStr, 10)
    const now = Date.now()

    // Session is valid if not expired
    return expiresAt > now
  } catch (error) {
    // Invalid token format
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionToken = request.cookies.get('admin_session')?.value

    // Check if session exists and is valid (not expired)
    if (!isValidSession(sessionToken)) {
      // Redirect to login if no session or expired
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect from login page if already authenticated
  if (pathname === '/admin/login') {
    const sessionToken = request.cookies.get('admin_session')?.value
    if (isValidSession(sessionToken)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
