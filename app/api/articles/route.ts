import { articleDataService } from '@/lib/services/article-data-service'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { articleQuerySchema } from '@/lib/validations/article'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const rawParams = Object.fromEntries(url.searchParams.entries())
    const parsed = articleQuerySchema.safeParse(rawParams)

    if (!parsed.success) {
      const message = parsed.error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ')
      return errorResponse(null, {
        status: 400,
        message: `Validation error: ${message}`,
      })
    }

    const params = parsed.data
    const page = params.page || 1
    const pageSize = params.limit ?? params.pageSize ?? 9

    const { articles, total } = await articleDataService.getArticles({
      category: params.category,
      isFeatured: params.isFeatured,
      search: params.search,
      includeUnpublished: params.includeUnpublished,
      excludeSlug: params.excludeSlug,
      page,
      pageSize,
      limit: params.limit,
    })

    return successResponse({
      data: articles,
      total,
      page,
      pageSize,
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch articles',
    })
  }
}
