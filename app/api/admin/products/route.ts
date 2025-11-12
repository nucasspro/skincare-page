import { withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { productDataService } from '@/lib/services/product-data-service'
import { errorResponse, successResponse, transformProductForResponse } from '@/lib/utils/api-response'
import { createProductSchema } from '@/lib/validations/product-schemas'

// GET all products (admin)
export const GET = withAuth(async () => {
  try {
    const products = await productDataService.getAllProducts()
    const transformedProducts = products.map(transformProductForResponse)
    return successResponse(transformedProducts)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch products',
    })
  }
})

// POST create new product
export const POST = withAuth(async (request: Request) => {
  try {
    const validatedData = await validateRequestBody(request, createProductSchema)

    const product = await productDataService.createProduct({
      name: validatedData.name,
      tagline: validatedData.tagline,
      price: validatedData.price,
      originalPrice: validatedData.originalPrice || null,
      discount: validatedData.discount || null,
      category: validatedData.category,
      needs: validatedData.needs || [],
      image: validatedData.image,
      hoverImage: validatedData.hoverImage,
      description: validatedData.description || null,
      benefits: validatedData.benefits || null,
      ingredients: validatedData.ingredients || null,
      howToUse: validatedData.howToUse || null,
    })

    const transformedProduct = transformProductForResponse(product)
    return successResponse(transformedProduct, {
      status: 201,
      message: 'Product created successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to create product',
    })
  }
})
