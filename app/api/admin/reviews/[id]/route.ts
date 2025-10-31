import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET single review
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: review })
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}

// PUT update review
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      productId,
      reviewerName,
      rating,
      review,
    } = body

    const now = Math.floor(Date.now() / 1000)

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        ...(productId !== undefined && { productId }),
        ...(reviewerName !== undefined && { reviewerName }),
        ...(rating !== undefined && { rating }),
        ...(review !== undefined && { review }),
        updatedAt: now,
      },
    })

    return NextResponse.json({
      message: 'Review updated successfully',
      data: updatedReview,
    })
  } catch (error: any) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE review
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.review.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Review deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete review' },
      { status: 500 }
    )
  }
}
