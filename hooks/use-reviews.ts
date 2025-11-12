/**
 * Custom hook for fetching reviews from database
 * Provides loading state and error handling
 */

'use client'

import type { Review } from '@/lib/review-service'
import { ReviewService } from '@/lib/review-service'
import { useEffect, useState } from 'react'

export function useReviews(productId?: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        setError(null)

        const fetchedReviews = productId
          ? await ReviewService.getReviewsByProductId(productId)
          : await ReviewService.getAllReviews()

        setReviews(fetchedReviews)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reviews'))
        console.error('Error fetching reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  return { reviews, loading, error }
}

export function useReviewsByProductId(productId: string) {
  return useReviews(productId)
}
