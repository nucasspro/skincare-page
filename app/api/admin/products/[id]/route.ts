import { withAdminAuth, withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { productDataService } from '@/lib/services/product-data-service'
import { errorResponse, successResponse, transformProductForResponse } from '@/lib/utils/api-response'
import { updateProductSchema } from '@/lib/validations/product-schemas'

// GET single product
export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const product = await productDataService.getProductById(id)

    if (!product) {
      return errorResponse(null, {
        status: 404,
        message: 'Product not found',
      })
    }

    const transformedProduct = transformProductForResponse(product)
    return successResponse(transformedProduct)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch product',
    })
  }
})

// PUT update product
export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const validatedData = await validateRequestBody(request, updateProductSchema)

    const product = await productDataService.updateProduct({
      id,
      name: validatedData.name,
      tagline: validatedData.tagline,
      price: validatedData.price,
      originalPrice: validatedData.originalPrice !== undefined ? validatedData.originalPrice : null,
      discount: validatedData.discount !== undefined ? validatedData.discount : null,
      category: validatedData.category,
      needs: validatedData.needs,
      image: validatedData.image,
      hoverImage: validatedData.hoverImage,
      description: validatedData.description !== undefined ? validatedData.description : null,
      benefits: validatedData.benefits,
      ingredients: validatedData.ingredients,
      howToUse: validatedData.howToUse,
    })

    const transformedProduct = transformProductForResponse(product)
    return successResponse(transformedProduct, {
      message: 'Product updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update product',
    })
  }
})

// DELETE product
export const DELETE = withAdminAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const success = await productDataService.deleteProduct(id)

    if (!success) {
      return errorResponse(null, {
        status: 404,
        message: 'Product not found or delete not supported',
      })
    }

    return successResponse(null, {
      message: 'Product deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete product',
    })
  }
})
