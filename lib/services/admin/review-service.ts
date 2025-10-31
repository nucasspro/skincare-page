export interface Review {
  id: string
  productId: string
  reviewerName: string
  rating: number
  review: string
  createdAt: number
  updatedAt: number
}

interface ReviewData {
  productId: string
  reviewerName: string
  rating: number
  review: string
}

class AdminReviewService {
  /**
   * Get all reviews
   */
  async getAllReviews(): Promise<Review[]> {
    const response = await fetch('/api/admin/reviews')
    if (!response.ok) {
      throw new Error('Failed to fetch reviews')
    }
    const data = await response.json()
    return data.data || []
  }

  /**
   * Create a new review
   */
  async createReview(reviewData: ReviewData): Promise<Review> {
    const response = await fetch('/api/admin/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to create review' }))
      throw new Error(error.error || 'Failed to create review')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Update an existing review
   */
  async updateReview(id: string, reviewData: Partial<ReviewData>): Promise<Review> {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update review' }))
      throw new Error(error.error || 'Failed to update review')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Delete a review
   */
  async deleteReview(id: string): Promise<void> {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete review' }))
      throw new Error(error.error || 'Failed to delete review')
    }
  }
}

export const adminReviewService = new AdminReviewService()
