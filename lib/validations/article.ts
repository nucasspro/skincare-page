import { z } from 'zod'

import { ARTICLE_CATEGORIES } from '@/lib/types/article'

export const articleCategorySchema = z.enum(ARTICLE_CATEGORIES)

export const articleBaseSchema = z.object({
  title: z.string().min(1, 'Tiêu đề là bắt buộc'),
  slug: z.string().min(1, 'Slug là bắt buộc').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ được chứa ký tự thường, số và dấu gạch nối'),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  content: z.string().min(1, 'Nội dung bài viết là bắt buộc'),
  excerpt: z.string().max(500, 'Mô tả ngắn tối đa 500 ký tự').optional().nullable(),
  featuredImage: z.string().min(1).optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
  author: z.string().max(120, 'Tên tác giả tối đa 120 ký tự').optional().nullable(),
  publishedAt: z
    .union([
      z.number().int().nonnegative(),
      z.string().min(1),
      z.date(),
    ])
    .optional()
    .nullable(),
  isPublished: z.boolean().optional().default(false),
})

export const createArticleSchema = articleBaseSchema

export const updateArticleSchema = articleBaseSchema
  .partial()
  .extend({
    id: z.string().min(1, 'ID là bắt buộc'),
  })

export const articleQuerySchema = z.object({
  category: z.string().optional(),
  isFeatured: z
    .union([z.boolean(), z.string()])
    .transform((value) => {
      if (typeof value === 'boolean') return value
      if (typeof value === 'string') {
        return ['true', '1', 'yes'].includes(value.toLowerCase())
      }
      return undefined
    })
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(9),
  limit: z.coerce.number().int().min(1).max(12).optional(),
  includeUnpublished: z
    .union([z.boolean(), z.string()])
    .transform((value) => {
      if (typeof value === 'boolean') return value
      if (typeof value === 'string') {
        return ['true', '1', 'yes'].includes(value.toLowerCase())
      }
      return false
    })
    .optional(),
  excludeSlug: z.string().optional(),
})

export type ArticleInput = z.infer<typeof createArticleSchema>
export type ArticleUpdateInput = z.infer<typeof updateArticleSchema>
export type ArticleQueryInput = z.infer<typeof articleQuerySchema>
