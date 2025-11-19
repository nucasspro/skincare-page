import type { Article } from '@/lib/types/article'
import { apiClient } from '@/lib/utils/api-client'
import { generateSlug } from '@/lib/utils/slug-util'

interface ArticleFormPayload {
  title: string
  slug: string
  category: string
  content: string
  excerpt?: string | null
  featuredImage?: string | null
  author?: string | null
  publishedAt?: number | null
  isFeatured: boolean
  isPublished: boolean
}

interface ArticleListResponse {
  data: Article[]
  total: number
  page: number
  pageSize: number
}

class AdminArticleService {
  async getArticles(params?: {
    search?: string
    category?: string
    isFeatured?: boolean
    isPublished?: boolean
    page?: number
    pageSize?: number
  }): Promise<ArticleListResponse> {
    const searchParams = new URLSearchParams()

    if (params?.search) searchParams.set('search', params.search)
    if (params?.category) searchParams.set('category', params.category)
    if (typeof params?.isFeatured === 'boolean') searchParams.set('isFeatured', String(params.isFeatured))
    if (typeof params?.isPublished === 'boolean') searchParams.set('isPublished', String(params.isPublished))
    if (params?.page) searchParams.set('page', String(params.page))
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize))

    const query = searchParams.toString()
    const url = query ? `/api/admin/articles?${query}` : '/api/admin/articles'

    return apiClient.get<ArticleListResponse>(url, {
      defaultErrorMessage: 'Không thể tải danh sách bài viết',
    })
  }

  async getArticle(id: string): Promise<Article> {
    return apiClient.get<Article>(`/api/admin/articles/${id}`, {
      defaultErrorMessage: 'Không thể tải bài viết',
    })
  }

  async createArticle(payload: ArticleFormPayload): Promise<Article> {
    const article = await apiClient.post<Article>('/api/admin/articles', {
      ...payload,
      slug: payload.slug || generateSlug(payload.title),
    }, {
      defaultErrorMessage: 'Không thể tạo bài viết',
    })
    return article
  }

  async updateArticle(id: string, payload: ArticleFormPayload): Promise<Article> {
    const article = await apiClient.put<Article>(`/api/admin/articles/${id}`, {
      ...payload,
      slug: payload.slug || generateSlug(payload.title),
    }, {
      defaultErrorMessage: 'Không thể cập nhật bài viết',
    })
    return article
  }

  async deleteArticle(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/articles/${id}`, {
      defaultErrorMessage: 'Không thể xoá bài viết',
    })
  }
}

export const adminArticleService = new AdminArticleService()
