import { productDataService } from '@/lib/services/product-data-service'
import { getCurrentUser } from '@/lib/utils/auth'
import { NextResponse } from 'next/server'

// GET all products (admin)
export async function GET() {
  // Check authentication
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
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

// POST create new product
export async function POST(request: Request) {
  // Check authentication
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const {
      name,
      tagline,
      price,
      originalPrice,
      discount,
      category,
      needs,
      image,
      hoverImage,
      description,
      benefits,
      ingredients,
      howToUse,
    } = body

    if (!name || !tagline || !price || !category || !image || !hoverImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = await productDataService.createProduct({
      name,
      tagline,
      price,
      originalPrice: originalPrice || null,
      discount: discount || null,
      category,
      needs: needs || [],
      image,
      hoverImage,
      description: description || null,
      benefits: benefits || null,
      ingredients: ingredients || null,
      howToUse: howToUse || null,
    })

    // Transform for API response
    const transformedProduct = {
      ...product,
      id: String(product.id || ''), // Ensure id is always string
      needs: typeof product.needs === 'string' ? JSON.parse(product.needs || '[]') : product.needs || [],
      benefits: typeof product.benefits === 'string' ? JSON.parse(product.benefits || '[]') : product.benefits || [],
      ingredients: typeof product.ingredients === 'string' ? JSON.parse(product.ingredients || '[]') : product.ingredients || [],
    }

    return NextResponse.json(
      { message: 'Product created successfully', data: transformedProduct },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    )
  }
}
