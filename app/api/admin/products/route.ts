import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET all products (admin)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ data: products })
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
      slug,
    } = body

    if (!name || !tagline || !price || !category || !image || !hoverImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const now = Math.floor(Date.now() / 1000)

    const product = await prisma.product.create({
      data: {
        name,
        tagline,
        price,
        originalPrice: originalPrice || null,
        discount: discount || null,
        category,
        needs: typeof needs === 'string' ? needs : JSON.stringify(needs || []),
        image,
        hoverImage,
        description: description || null,
        benefits: typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []),
        ingredients: typeof ingredients === 'string' ? ingredients : JSON.stringify(ingredients || []),
        howToUse: howToUse || null,
        createdAt: now,
        updatedAt: now,
      },
    })

    return NextResponse.json(
      { message: 'Product created successfully', data: product },
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
