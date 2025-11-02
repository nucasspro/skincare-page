import { userDataService } from '@/lib/services/user-data-service'
import { NextResponse } from 'next/server'

// GET all users
export async function GET() {
  try {
    const users = await userDataService.getAllUsers()
    return NextResponse.json({
      data: users.map(u => ({ ...u, id: String(u.id || '') }))
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
    const body = await request.json()
    const { email, name, phone, address, role } = body

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
      role: role || 'user',
    })

    return NextResponse.json(
      { message: 'User created successfully', data: { ...user, id: String(user.id || '') } },
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
