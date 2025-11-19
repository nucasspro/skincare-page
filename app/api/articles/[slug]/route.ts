import { articleDataService } from '@/lib/services/article-data-service'
import { errorResponse, successResponse } from '@/lib/utils/api-response'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return errorResponse(null, {
        status: 400,
        message: 'Missing article slug',
      })
    }

    const article = await articleDataService.getArticleBySlug(slug)

    if (!article) {
      return errorResponse(null, {
        status: 404,
        message: 'Article not found',
      })
    }

    return successResponse(article)
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to fetch article detail',
    })
  }
}
