import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { commentDataService } from '@/lib/services/comment-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { updateCommentSchema } from '@/lib/validations/comment-schemas'

// GET single comment
export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const comment = await commentDataService.getCommentById(id)

    if (!comment) {
      return errorResponse(null, {
        status: 404,
        message: 'Comment not found',
      })
    }

    const transformedComment = transformRecordForResponse(comment)
    return successResponse(transformedComment)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch comment',
    })
  }
})

// PUT update comment
export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const validatedData = await validateRequestBody(request, updateCommentSchema)

    const updateData: any = { id }
    if (validatedData.content !== undefined) updateData.content = validatedData.content
    if (validatedData.rating !== undefined) updateData.rating = validatedData.rating
    if (validatedData.status !== undefined) updateData.status = validatedData.status

    const comment = await commentDataService.updateComment(updateData)
    const transformedComment = transformRecordForResponse(comment)

    return successResponse(transformedComment, {
      message: 'Comment updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update comment',
    })
  }
})

// DELETE comment
export const DELETE = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const success = await commentDataService.deleteComment(id)

    if (!success) {
      return errorResponse(null, {
        status: 500,
        message: 'Failed to delete comment',
      })
    }

    return successResponse(null, {
      message: 'Comment deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete comment',
    })
  }
})
