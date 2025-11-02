import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check if env variables are configured
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Simple credential check (compare with env variables)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session token with expiry timestamp (2 hours from now)
      const expiresAt = Date.now() + 2 * 60 * 60 * 1000 // 2 hours
      const sessionToken = Buffer.from(`${username}:${expiresAt}`).toString('base64')

      // Set httpOnly cookie
      const cookieStore = await cookies()
      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(expiresAt),
        path: '/',
      })

      return NextResponse.json({ success: true, message: 'Login successful' })
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
