/**
 * Article Type Definitions
 * Shared types for blog/article entities across the application
 */

export const ARTICLE_CATEGORIES = ['kien-thuc-dep', 'hoat-dong-cellic', 'other'] as const

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: string | null
  category: ArticleCategory | string
  isFeatured: boolean
  author?: string | null
  publishedAt?: number | null
  isPublished: boolean
  content: string
  createdAt: number
  updatedAt: number
  createdBy?: string | null
  updatedBy?: string | null
}

export interface ArticleListParams {
  category?: ArticleCategory | string
  isFeatured?: boolean
  search?: string
  page?: number
  pageSize?: number
  limit?: number
  includeUnpublished?: boolean
  excludeSlug?: string
}

export interface ArticleListResponse {
  data: Article[]
  total: number
  page: number
  pageSize: number
}

export interface ArticleMutationPayload {
  title: string
  slug: string
  content: string
  category: ArticleCategory | string
  excerpt?: string | null
  featuredImage?: string | null
  isFeatured?: boolean
  author?: string | null
  publishedAt?: number | null
  isPublished?: boolean
}
