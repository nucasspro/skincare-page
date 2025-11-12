import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { reviewDataService } from '@/lib/services/review-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { updateReviewSchema } from '@/lib/validations/review-schemas'

// GET single review
export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const review = await reviewDataService.getReviewById(id)

    if (!review) {
      return errorResponse(null, {
        status: 404,
        message: 'Review not found',
      })
    }

    const transformedReview = transformRecordForResponse(review)
    return successResponse(transformedReview)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch review',
    })
  }
})

// PUT update review
export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const validatedData = await validateRequestBody(request, updateReviewSchema)

    const updateData: any = { id }
    if (validatedData.productId !== undefined) updateData.productId = validatedData.productId
    if (validatedData.reviewerName !== undefined) updateData.reviewerName = validatedData.reviewerName
    if (validatedData.rating !== undefined) updateData.rating = validatedData.rating
    if (validatedData.review !== undefined) updateData.review = validatedData.review

    const updatedReview = await reviewDataService.updateReview(updateData)
    const transformedReview = transformRecordForResponse(updatedReview)

    return successResponse(transformedReview, {
      message: 'Review updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update review',
    })
  }
})

// DELETE review
export const DELETE = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const success = await reviewDataService.deleteReview(id)

    if (!success) {
      return errorResponse(null, {
        status: 500,
        message: 'Failed to delete review',
      })
    }

    return successResponse(null, {
      message: 'Review deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete review',
    })
  }
})
