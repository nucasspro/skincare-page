import { authenticateUser, createSessionToken } from '@/lib/utils/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Email và password là bắt buộc' },
        { status: 400 }
      )
    }

    // Authenticate user from database
    const user = await authenticateUser(username, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Email hoặc password không đúng' },
        { status: 401 }
      )
    }

    // Allow both admin and user roles to login
    // Role-based permissions will be enforced in individual API routes

    // Create session token with expiry timestamp (2 hours from now)
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    const sessionToken = createSessionToken(user.id, 2)

    // Set httpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expiresAt),
      path: '/',
    })

    return NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Đăng nhập thất bại' },
      { status: 500 }
    )
  }
}
