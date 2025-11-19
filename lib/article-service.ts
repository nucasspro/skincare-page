import type { Article, ArticleListParams, ArticleListResponse } from '@/lib/types/article'

interface ArticleDetailResponse {
  data: Article | null
}

const ARTICLES_API_ENDPOINT = '/api/articles'
const DEFAULT_PAGE_SIZE = 9

type ApiResponse<T> = {
  data: T
  message?: string
}

function resolveBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }

  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (explicitUrl) {
    return explicitUrl.endsWith('/') ? explicitUrl.slice(0, -1) : explicitUrl
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    const prefix = vercelUrl.startsWith('http') ? '' : 'https://'
    return `${prefix}${vercelUrl}`
  }

  return process.env.APP_BASE_URL ?? 'http://localhost:3000'
}

function buildQueryString(params?: ArticleListParams): string {
  if (!params) return ''

  const searchParams = new URLSearchParams()

  if (params.category) searchParams.set('category', params.category)
  if (typeof params.isFeatured === 'boolean') searchParams.set('isFeatured', String(params.isFeatured))
  if (params.search) searchParams.set('search', params.search)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.pageSize) searchParams.set('pageSize', String(params.pageSize))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.excludeSlug) searchParams.set('excludeSlug', params.excludeSlug)
  if (typeof params.includeUnpublished === 'boolean') searchParams.set('includeUnpublished', String(params.includeUnpublished))

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const baseUrl = resolveBaseUrl()
  const url = `${baseUrl}${path}`

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: init?.cache ?? 'no-store',
    next: init?.next ?? { revalidate: 0 },
  })

  if (!response.ok) {
    const errorPayload = await response.text()
    throw new Error(errorPayload || `Failed to fetch ${url}`)
  }

  return response.json() as Promise<ApiResponse<T>>
}

export class ArticleService {
  static async list(params?: ArticleListParams): Promise<ArticleListResponse> {
    const queryString = buildQueryString({
      pageSize: params?.pageSize ?? params?.limit ?? DEFAULT_PAGE_SIZE,
      ...params,
    })
    const payload = await fetchFromApi<ArticleListResponse>(`${ARTICLES_API_ENDPOINT}${queryString}`)
    return (
      payload.data ?? {
        data: [],
        total: 0,
        page: params?.page ?? 1,
        pageSize: params?.pageSize ?? params?.limit ?? DEFAULT_PAGE_SIZE,
      }
    )
  }

  static async getBySlug(slug: string): Promise<Article | null> {
    if (!slug) return null

    const payload = await fetchFromApi<ArticleDetailResponse>(`${ARTICLES_API_ENDPOINT}/${slug}`)
    return payload.data
  }

  static async getFeatured(limit: number = 1): Promise<Article[]> {
    const response = await this.list({ isFeatured: true, limit })
    return response.data ?? []
  }

  static async getByCategory(category: string, limit: number = 3): Promise<Article[]> {
    const response = await this.list({ category, limit })
    return response.data ?? []
  }

  static async getRelatedArticles(slug: string, options?: { category?: string; limit?: number }): Promise<Article[]> {
    const limit = options?.limit ?? 3

    // Prefer using provided category filter
    if (options?.category) {
      const response = await this.list({
        category: options.category,
        excludeSlug: slug,
        limit,
      })
      return response.data ?? []
    }

    // Fallback: fetch the article to determine its category
    const article = await this.getBySlug(slug)
    if (!article) return []

    const response = await this.list({
      category: article.category,
      excludeSlug: slug,
      limit,
    })
    return response.data ?? []
  }

  static async search(query: string, limit: number = DEFAULT_PAGE_SIZE): Promise<Article[]> {
    if (!query.trim()) return []
    const response = await this.list({ search: query, limit })
    return response.data ?? []
  }
}

export const getArticles = ArticleService.list.bind(ArticleService)
export const getArticleBySlug = ArticleService.getBySlug.bind(ArticleService)
export const getFeaturedArticles = ArticleService.getFeatured.bind(ArticleService)
export const getArticlesByCategory = ArticleService.getByCategory.bind(ArticleService)
export const getRelatedArticles = ArticleService.getRelatedArticles.bind(ArticleService)
export const searchArticles = ArticleService.search.bind(ArticleService)
