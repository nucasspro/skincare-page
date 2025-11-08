import { categoryDataService } from '@/lib/services/category-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'

/**
 * Public Categories API
 * Read-only endpoint for client-side components
 * No authentication required
 */
export async function GET() {
  try {
    const categories = await categoryDataService.getAllCategories()
    const transformedCategories = categories.map(transformRecordForResponse)
    return successResponse(transformedCategories)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch categories',
    })
  }
}
