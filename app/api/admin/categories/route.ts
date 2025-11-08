import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { categoryDataService } from '@/lib/services/category-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { createCategorySchema } from '@/lib/validations/category-schemas'

// GET all categories
export const GET = withAuth(async () => {
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
})

// POST create new category
export const POST = withAuth(async (request: Request) => {
  try {
    const validatedData = await validateRequestBody(request, createCategorySchema)

    const category = await categoryDataService.createCategory({
      name: validatedData.name,
      description: validatedData.description || null,
      slug: validatedData.slug || null,
    })

    const transformedCategory = transformRecordForResponse(category)
    return successResponse(transformedCategory, {
      status: 201,
      message: 'Category created successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to create category',
    })
  }
})
