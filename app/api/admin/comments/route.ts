import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { commentDataService } from '@/lib/services/comment-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { createCommentSchema } from '@/lib/validations/comment-schemas'

// GET all comments
export const GET = withAuth(async () => {
  try {
    const comments = await commentDataService.getAllComments()
    const transformedComments = comments.map(transformRecordForResponse)
    return successResponse(transformedComments)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch comments',
    })
  }
})

// POST create new comment
export const POST = withAuth(async (request: Request) => {
  try {
    const validatedData = await validateRequestBody(request, createCommentSchema)

    const comment = await commentDataService.createComment({
      productId: validatedData.productId,
      userId: validatedData.userId,
      userName: validatedData.userName || null,
      userEmail: validatedData.userEmail || null,
      content: validatedData.content,
      rating: validatedData.rating || 5,
      status: validatedData.status || 'pending',
    })

    const transformedComment = transformRecordForResponse(comment)
    return successResponse(transformedComment, {
      status: 201,
      message: 'Comment created successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to create comment',
    })
  }
})
