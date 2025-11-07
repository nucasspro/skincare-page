import { reviewDataService } from '@/lib/services/review-data-service'
import { NextResponse } from 'next/server'

/**
 * Public Reviews API
 * Read-only endpoint for client-side components
 * No authentication required
 */
export async function GET() {
  try {
    const reviews = await reviewDataService.getAllReviews()
    return NextResponse.json({
      data: reviews.map(r => ({
        ...r,
        id: String(r.id || ''), // Ensure id is always string
      }))
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
