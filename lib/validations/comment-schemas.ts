/**
 * Comment Validation Schemas
 * Zod schemas for comment API request validation
 */

import { z } from 'zod'

/**
 * Schema for creating a comment
 */
export const createCommentSchema = z.object({
  productId: z.string().min(1, 'Product ID là bắt buộc'),
  userId: z.string().min(1, 'User ID là bắt buộc'),
  userName: z.string().optional().nullable(),
  userEmail: z.string().email('Email không hợp lệ').optional().nullable(),
  content: z.string().min(1, 'Nội dung comment là bắt buộc'),
  rating: z.number().min(1).max(5).optional().default(5),
  status: z.string().optional().default('pending'),
})

/**
 * Schema for updating a comment
 */
export const updateCommentSchema = z.object({
  content: z.string().min(1, 'Nội dung comment là bắt buộc').optional(),
  rating: z.number().min(1).max(5).optional(),
  status: z.string().optional(),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
