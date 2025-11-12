import { productDataService } from '@/lib/services/product-data-service'
import { errorResponse, successResponse, transformProductForResponse } from '@/lib/utils/api-response'

// GET all products
export async function GET() {
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
}
