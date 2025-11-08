import { apiClient } from '@/lib/utils/api-client'

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
    return apiClient.get<Review[]>('/api/admin/reviews', {
      defaultErrorMessage: 'Failed to fetch reviews',
    })
  }

  /**
   * Create a new review
   */
  async createReview(reviewData: ReviewData): Promise<Review> {
    return apiClient.post<Review>('/api/admin/reviews', reviewData, {
      defaultErrorMessage: 'Failed to create review',
    })
  }

  /**
   * Update an existing review
   */
  async updateReview(id: string, reviewData: Partial<ReviewData>): Promise<Review> {
    return apiClient.put<Review>(`/api/admin/reviews/${id}`, reviewData, {
      defaultErrorMessage: 'Failed to update review',
    })
  }

  /**
   * Delete a review
   */
  async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/reviews/${id}`, {
      defaultErrorMessage: 'Failed to delete review',
    })
  }
}

export const adminReviewService = new AdminReviewService()
