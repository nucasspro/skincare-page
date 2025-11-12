/**
 * Product Validation Schemas
 * Zod schemas for product API request validation
 */

import { z } from 'zod'

/**
 * Schema for creating a product
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  tagline: z.string().min(1, 'Tagline là bắt buộc'),
  price: z.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  originalPrice: z.number().optional().nullable(),
  discount: z.number().optional().nullable(),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  needs: z.array(z.string()).optional().default([]),
  image: z.string().min(1, 'Hình ảnh là bắt buộc'),
  hoverImage: z.string().min(1, 'Hình ảnh hover là bắt buộc'),
  description: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  howToUse: z.string().optional(),
})

/**
 * Schema for updating a product
 */
export const updateProductSchema = createProductSchema.partial().extend({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc').optional(),
  tagline: z.string().min(1, 'Tagline là bắt buộc').optional(),
  price: z.number().min(0, 'Giá phải lớn hơn hoặc bằng 0').optional(),
  category: z.string().min(1, 'Danh mục là bắt buộc').optional(),
  image: z.string().min(1, 'Hình ảnh là bắt buộc').optional(),
  hoverImage: z.string().min(1, 'Hình ảnh hover là bắt buộc').optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
