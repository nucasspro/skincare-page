import { reviewDataService } from '@/lib/services/review-data-service'
import { NextResponse } from 'next/server'

// GET all reviews
export async function GET() {
  try {
    const reviews = await reviewDataService.getAllReviews()
    return NextResponse.json({
      data: reviews.map(r => ({ ...r, id: String(r.id || '') }))
    })
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
    const { productId, reviewerName, rating, review } = body

    if (!productId || !reviewerName || !rating || !review) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newReview = await reviewDataService.createReview({
      productId,
      reviewerName,
      rating,
      review,
    })

    return NextResponse.json(
      { message: 'Review created successfully', data: { ...newReview, id: String(newReview.id || '') } },
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
