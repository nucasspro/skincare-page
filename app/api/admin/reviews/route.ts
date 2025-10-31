import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET all reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ data: reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST create new review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      productId,
      reviewerName,
      rating,
      review,
    } = body

    if (!productId || !reviewerName || !rating || !review) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const now = Math.floor(Date.now() / 1000)

    const newReview = await prisma.review.create({
      data: {
        productId,
        reviewerName,
        rating,
        review,
        createdAt: now,
        updatedAt: now,
      },
    })

    return NextResponse.json(
      { message: 'Review created successfully', data: newReview },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    )
  }
}
