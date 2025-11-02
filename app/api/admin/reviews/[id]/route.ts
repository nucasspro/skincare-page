import { reviewDataService } from '@/lib/services/review-data-service'
import { NextResponse } from 'next/server'

// GET single review
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const review = await reviewDataService.getReviewById(id)

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: { ...review, id: String(review.id || '') } })
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
    const { productId, reviewerName, rating, review } = body

    const updateData: any = { id }
    if (productId !== undefined) updateData.productId = productId
    if (reviewerName !== undefined) updateData.reviewerName = reviewerName
    if (rating !== undefined) updateData.rating = rating
    if (review !== undefined) updateData.review = review

    const updatedReview = await reviewDataService.updateReview(updateData)

    return NextResponse.json({
      message: 'Review updated successfully',
      data: { ...updatedReview, id: String(updatedReview.id || '') },
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
    const success = await reviewDataService.deleteReview(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete review' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete review' },
      { status: 500 }
    )
  }
}
