import { productDataService } from '@/lib/services/product-data-service'
import { getCurrentUser } from '@/lib/utils/auth'
import { NextResponse } from 'next/server'

// GET single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await productDataService.getProductById(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Transform for API response
    const transformedProduct = {
      ...product,
      id: String(product.id || ''), // Ensure id is always string
      needs: typeof product.needs === 'string' ? JSON.parse(product.needs || '[]') : product.needs || [],
      benefits: typeof product.benefits === 'string' ? JSON.parse(product.benefits || '[]') : product.benefits || [],
      ingredients: typeof product.ingredients === 'string' ? JSON.parse(product.ingredients || '[]') : product.ingredients || [],
    }

    return NextResponse.json({ data: transformedProduct })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
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

    const product = await productDataService.updateProduct({
      id,
      name,
      tagline,
      price,
      originalPrice: originalPrice !== undefined ? originalPrice : null,
      discount: discount !== undefined ? discount : null,
      category,
      needs: needs !== undefined ? needs : undefined,
      image,
      hoverImage,
      description: description !== undefined ? description : null,
      benefits: benefits !== undefined ? benefits : null,
      ingredients: ingredients !== undefined ? ingredients : null,
      howToUse: howToUse !== undefined ? howToUse : null,
    })

    // Transform for API response
    const transformedProduct = {
      ...product,
      id: String(product.id || ''), // Ensure id is always string
      needs: typeof product.needs === 'string' ? JSON.parse(product.needs || '[]') : product.needs || [],
      benefits: typeof product.benefits === 'string' ? JSON.parse(product.benefits || '[]') : product.benefits || [],
      ingredients: typeof product.ingredients === 'string' ? JSON.parse(product.ingredients || '[]') : product.ingredients || [],
    }

    return NextResponse.json({
      message: 'Product updated successfully',
      data: transformedProduct,
    })
  } catch (error: any) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Only admin can delete products
  if (currentUser.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only admin can delete products' },
      { status: 403 }
    )
  }

  try {
    const { id } = await params

    const success = await productDataService.deleteProduct(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Product not found or delete not supported' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
