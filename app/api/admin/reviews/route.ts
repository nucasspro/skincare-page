import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { reviewDataService } from '@/lib/services/review-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { createReviewSchema } from '@/lib/validations/review-schemas'

// GET all reviews
export const GET = withAuth(async () => {
  try {
    const reviews = await reviewDataService.getAllReviews()
    const transformedReviews = reviews.map(transformRecordForResponse)
    return successResponse(transformedReviews)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch reviews',
    })
  }
})

// POST create new review
export const POST = withAuth(async (request: Request) => {
  try {
    const validatedData = await validateRequestBody(request, createReviewSchema)

    const newReview = await reviewDataService.createReview({
      productId: validatedData.productId,
      reviewerName: validatedData.reviewerName,
      rating: validatedData.rating,
      review: validatedData.review,
    })

    const transformedReview = transformRecordForResponse(newReview)
    return successResponse(transformedReview, {
      status: 201,
      message: 'Review created successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to create review',
    })
  }
})
