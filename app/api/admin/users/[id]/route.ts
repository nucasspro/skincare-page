import { withAdminAuth, withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { userDataService } from '@/lib/services/user-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { getCurrentUser } from '@/lib/utils/auth'
import { updateUserSchema } from '@/lib/validations/user-schemas'

// Helper to remove password from user object
function removePassword(user: any) {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

// GET single user
export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    // withAuth ensures user is authenticated, but we need to check role
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      // This shouldn't happen due to withAuth, but TypeScript needs it
      return errorResponse(null, {
        status: 401,
        message: 'Unauthorized',
      })
    }

    const { id } = await params

    // Users can only view their own profile unless they are admin
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      return errorResponse(null, {
        status: 403,
        message: 'Forbidden: You can only view your own profile',
      })
    }

    const user = await userDataService.getUserById(id)

    if (!user) {
      return errorResponse(null, {
        status: 404,
        message: 'User not found',
      })
    }

    // Remove password from response
    const userWithoutPassword = removePassword(user)
    const transformedUser = transformRecordForResponse(userWithoutPassword)

    return successResponse(transformedUser)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch user',
    })
  }
})

// PUT update user
export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return errorResponse(null, {
        status: 401,
        message: 'Unauthorized',
      })
    }

    const { id } = await params
    const validatedData = await validateRequestBody(request, updateUserSchema)

    const isUserAdmin = currentUser.role === 'admin'

    // Users can only update their own profile, unless they are admin
    if (!isUserAdmin && currentUser.id !== id) {
      return errorResponse(null, {
        status: 403,
        message: 'Forbidden: You can only update your own profile',
      })
    }

    // Only admin can change role
    if (validatedData.role !== undefined && !isUserAdmin) {
      return errorResponse(null, {
        status: 403,
        message: 'Forbidden: Only admin can change user role',
      })
    }

    // Regular users cannot change their own role
    if (!isUserAdmin && currentUser.id === id && validatedData.role !== undefined && validatedData.role !== currentUser.role) {
      return errorResponse(null, {
        status: 403,
        message: 'Forbidden: You cannot change your own role',
      })
    }

    const user = await userDataService.updateUser({
      id,
      email: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone !== undefined ? validatedData.phone : null,
      address: validatedData.address !== undefined ? validatedData.address : null,
      password: validatedData.password || undefined,
      role: validatedData.role !== undefined ? validatedData.role : (isUserAdmin ? undefined : 'user'),
    })

    // Remove password from response
    const userWithoutPassword = removePassword(user)
    const transformedUser = transformRecordForResponse(userWithoutPassword)

    return successResponse(transformedUser, {
      message: 'User updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update user',
    })
  }
})

// DELETE user
export const DELETE = withAdminAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    // withAdminAuth ensures user is admin and authenticated
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      // This shouldn't happen due to withAdminAuth, but TypeScript needs it
      return errorResponse(null, {
        status: 401,
        message: 'Unauthorized',
      })
    }

    const { id } = await params

    // Prevent self-deletion
    if (currentUser.id === id) {
      return errorResponse(null, {
        status: 400,
        message: 'Cannot delete your own account',
      })
    }

    const success = await userDataService.deleteUser(id)

    if (!success) {
      return errorResponse(null, {
        status: 500,
        message: 'Failed to delete user',
      })
    }

    return successResponse(null, {
      message: 'User deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete user',
    })
  }
})
