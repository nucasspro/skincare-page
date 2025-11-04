import { userDataService } from '@/lib/services/user-data-service'
import { getCurrentUser, isAdmin } from '@/lib/utils/auth'
import { NextResponse } from 'next/server'

// GET single user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Users can only view their own profile unless they are admin
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only view your own profile' },
        { status: 403 }
      )
    }

    const user = await userDataService.getUserById(id)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user as any

    return NextResponse.json({ data: { ...userWithoutPassword, id: String(user.id || '') } })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { email, name, phone, address, password, role } = body

    const isUserAdmin = await isAdmin()

    // Users can only update their own profile, unless they are admin
    if (!isUserAdmin && currentUser.id !== id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only update your own profile' },
        { status: 403 }
      )
    }

    // Only admin can change role
    if (role !== undefined && !isUserAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Only admin can change user role' },
        { status: 403 }
      )
    }

    // Regular users cannot change their own role
    if (!isUserAdmin && currentUser.id === id && role !== undefined && role !== currentUser.role) {
      return NextResponse.json(
        { error: 'Forbidden: You cannot change your own role' },
        { status: 403 }
      )
    }

    const user = await userDataService.updateUser({
      id,
      email,
      name,
      phone: phone || null,
      address: address || null,
      password: password || undefined,
      role: role !== undefined ? role : (isUserAdmin ? undefined : 'user'),
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user as any

    return NextResponse.json({
      message: 'User updated successfully',
      data: { ...userWithoutPassword, id: String(user.id || '') }
    })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { error: 'Forbidden: Only admin can delete users' },
        { status: 403 }
      )
    }

    const { id } = await params

    // Prevent self-deletion
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    const success = await userDataService.deleteUser(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
