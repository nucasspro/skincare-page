import { categoryDataService } from '@/lib/services/category-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'

/**
 * Public Category API by ID
 * Read-only endpoint for client-side components
 * No authentication required
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await categoryDataService.getCategoryById(id)

    if (!category) {
      return errorResponse(null, {
        status: 404,
        message: 'Category not found',
      })
    }

    const transformedCategory = transformRecordForResponse(category)
    return successResponse(transformedCategory)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch category',
    })
  }
}
