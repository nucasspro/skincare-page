/**
 * Category Validation Schemas
 * Zod schemas for category API request validation
 */

import { z } from 'zod'

/**
 * Schema for creating a category
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Tên danh mục là bắt buộc'),
  slug: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})

/**
 * Schema for updating a category
 */
export const updateCategorySchema = createCategorySchema.partial().extend({
  name: z.string().min(1, 'Tên danh mục là bắt buộc').optional(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
