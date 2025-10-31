import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: product })
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
      slug,
    } = body

    const existing = await prisma.product.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const now = Math.floor(Date.now() / 1000)

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        tagline,
        price,
        originalPrice: originalPrice !== undefined ? originalPrice : null,
        discount: discount !== undefined ? discount : null,
        category,
        needs: typeof needs === 'string' ? needs : JSON.stringify(needs || []),
        image,
        hoverImage,
        description: description !== undefined ? description : null,
        benefits: typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []),
        ingredients: typeof ingredients === 'string' ? ingredients : JSON.stringify(ingredients || []),
        howToUse: howToUse !== undefined ? howToUse : null,
        updatedAt: now,
      },
    })

    return NextResponse.json({
      message: 'Product updated successfully',
      data: product,
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
  try {
    const { id } = await params

    try {
      await prisma.product.delete({
        where: { id },
      })
      return NextResponse.json({ message: 'Product deleted successfully' })
    } catch (error: any) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
