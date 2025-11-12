import { withAdminAuth, withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { userDataService } from '@/lib/services/user-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { createUserSchema } from '@/lib/validations/user-schemas'

// Helper to remove password from user object
function removePassword(user: any) {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

// GET all users
export const GET = withAuth(async () => {
  try {
    const users = await userDataService.getAllUsers()
    // Remove passwords from response
    const usersWithoutPasswords = users.map(u => removePassword(u))
    const transformedUsers = usersWithoutPasswords.map(transformRecordForResponse)
    return successResponse(transformedUsers)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch users',
    })
  }
})

// POST create new user
export const POST = withAdminAuth(async (request: Request) => {
  try {
    const validatedData = await validateRequestBody(request, createUserSchema)

    const user = await userDataService.createUser({
      email: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone || null,
      address: validatedData.address || null,
      password: validatedData.password || null,
      role: validatedData.role || 'user',
    })

    // Remove password from response
    const userWithoutPassword = removePassword(user)
    const transformedUser = transformRecordForResponse(userWithoutPassword)

    return successResponse(transformedUser, {
      status: 201,
      message: 'User created successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to create user',
    })
  }
})
