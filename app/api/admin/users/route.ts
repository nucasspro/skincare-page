import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ data: users })
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

    const now = Math.floor(Date.now() / 1000)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone: phone || null,
        address: address || null,
        role: role || 'user',
        createdAt: now,
        updatedAt: now,
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', id: user.id },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.code === 'P2002' || error.message?.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
