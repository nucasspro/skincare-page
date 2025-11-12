/**
 * Review Data Service
 * Service layer với error handling (no caching)
 */

import type { CreateReviewData, ReviewRecord, UpdateReviewData } from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

export class ReviewDataService {
  async getAllReviews(): Promise<ReviewRecord[]> {
    try {
      console.log('📥 Fetching reviews from data source...')
      const reviews = await dataSource.getAllReviews()
      return reviews
    } catch (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
  }

  async getReviewById(id: string): Promise<ReviewRecord | null> {
    try {
      const review = await dataSource.getReviewById(id)
      return review
    } catch (error) {
      console.error(`Error fetching review ${id}:`, error)
      throw error
    }
  }

  async createReview(data: CreateReviewData): Promise<ReviewRecord> {
    try {
      const review = await dataSource.createReview(data)
      return review
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  }

  async updateReview(data: UpdateReviewData): Promise<ReviewRecord> {
    try {
      const review = await dataSource.updateReview(data)
      return review
    } catch (error) {
      console.error('Error updating review:', error)
      throw error
    }
  }

  async deleteReview(id: string): Promise<boolean> {
    try {
      const result = await dataSource.deleteReview(id)
      return result
    } catch (error) {
      console.error('Error deleting review:', error)
      throw error
    }
  }
}

export const reviewDataService = new ReviewDataService()
