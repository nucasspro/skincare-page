import type {
  ArticleQueryOptions,
  ArticleRecord,
  CreateArticleData,
  UpdateArticleData,
} from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

interface ArticleListOptions extends ArticleQueryOptions {
  page?: number
  pageSize?: number
}

export class ArticleDataService {
  async getArticles(options: ArticleListOptions = {}) {
    const page = options.page && options.page > 0 ? options.page : 1
    const pageSize = options.pageSize && options.pageSize > 0 ? options.pageSize : options.limit ?? 9
    const skip = (page - 1) * pageSize

    const countFilters: ArticleQueryOptions = { ...options }
    delete countFilters.limit
    delete (countFilters as any).skip

    const [articles, total] = await Promise.all([
      dataSource.getAllArticles({
        ...options,
        limit: options.limit ?? pageSize,
        skip,
      }),
      dataSource.countArticles(countFilters),
    ])

    return {
      articles,
      total,
      page,
      pageSize: options.limit ?? pageSize,
    }
  }

  async getArticleById(id: string): Promise<ArticleRecord | null> {
    return dataSource.getArticleById(id)
  }

  async getArticleBySlug(slug: string): Promise<ArticleRecord | null> {
    return dataSource.getArticleBySlug(slug)
  }

  async createArticle(data: CreateArticleData): Promise<ArticleRecord> {
    return dataSource.createArticle(data)
  }

  async updateArticle(data: UpdateArticleData): Promise<ArticleRecord> {
    return dataSource.updateArticle(data)
  }

  async deleteArticle(id: string): Promise<boolean> {
    return dataSource.deleteArticle(id)
  }
}

export const articleDataService = new ArticleDataService()
