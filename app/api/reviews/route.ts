import { reviewDataService } from '@/lib/services/review-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'

/**
 * Public Reviews API
 * Read-only endpoint for client-side components
 * No authentication required
 */
export async function GET() {
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
}
