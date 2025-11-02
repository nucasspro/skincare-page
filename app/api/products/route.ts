import { productDataService } from '@/lib/services/product-data-service'
import { NextResponse } from 'next/server'

// GET all products
export async function GET() {
  try {
    const products = await productDataService.getAllProducts()

    // Transform for API response (parse JSON fields)
    const transformedProducts = products.map((product) => ({
      ...product,
      id: String(product.id || ''), // Ensure id is always string
      needs: typeof product.needs === 'string' ? JSON.parse(product.needs || '[]') : product.needs || [],
      benefits: typeof product.benefits === 'string' ? JSON.parse(product.benefits || '[]') : product.benefits || [],
      ingredients: typeof product.ingredients === 'string' ? JSON.parse(product.ingredients || '[]') : product.ingredients || [],
    }))

    return NextResponse.json({ data: transformedProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
