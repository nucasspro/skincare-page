import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { categoryDataService } from '@/lib/services/category-data-service'
import { errorResponse, successResponse, transformRecordForResponse } from '@/lib/utils/api-response'
import { updateCategorySchema } from '@/lib/validations/category-schemas'

// GET single category
export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
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
})

// PUT update category
export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const validatedData = await validateRequestBody(request, updateCategorySchema)

    const category = await categoryDataService.updateCategory({
      id,
      name: validatedData.name,
      description: validatedData.description !== undefined ? validatedData.description : null,
      slug: validatedData.slug !== undefined ? validatedData.slug : null,
    })

    const transformedCategory = transformRecordForResponse(category)
    return successResponse(transformedCategory, {
      message: 'Category updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update category',
    })
  }
})

// DELETE category
export const DELETE = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const success = await categoryDataService.deleteCategory(id)

    if (!success) {
      return errorResponse(null, {
        status: 500,
        message: 'Failed to delete category',
      })
    }

    return successResponse(null, {
      message: 'Category deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete category',
    })
  }
})
