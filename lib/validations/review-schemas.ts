/**
 * Review Validation Schemas
 * Zod schemas for review API request validation
 */

import { z } from 'zod'

/**
 * Schema for creating a review
 */
export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID là bắt buộc'),
  reviewerName: z.string().min(1, 'Tên người đánh giá là bắt buộc'),
  rating: z.number().min(1).max(5, 'Rating phải từ 1 đến 5'),
  review: z.string().min(1, 'Nội dung đánh giá là bắt buộc'),
})

/**
 * Schema for updating a review
 */
export const updateReviewSchema = createReviewSchema.partial()

export type CreateReviewInput = z.infer<typeof createReviewSchema>
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>
