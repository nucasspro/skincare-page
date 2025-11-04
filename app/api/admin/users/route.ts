import { userDataService } from '@/lib/services/user-data-service'
import { getCurrentUser, isAdmin } from '@/lib/utils/auth'
import { NextResponse } from 'next/server'

// GET all users
export async function GET() {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const users = await userDataService.getAllUsers()
    // Remove passwords from response
    return NextResponse.json({
      data: users.map(u => {
        const { password, ...userWithoutPassword } = u as any
        return { ...userWithoutPassword, id: String(u.id || '') }
      })
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST create new user
export async function POST(request: Request) {
  try {
    // Check authentication and admin role
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Only admin can create users' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, name, phone, address, password, role } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const user = await userDataService.createUser({
      email,
      name,
      phone: phone || null,
      address: address || null,
      password: password || null,
      role: role || 'user',
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user as any

    return NextResponse.json(
      { message: 'User created successfully', data: { ...userWithoutPassword, id: String(user.id || '') } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    )
  }
}
