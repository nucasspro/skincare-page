import { withAdminAuth, withAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { articleDataService } from '@/lib/services/article-data-service'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { getCurrentUser } from '@/lib/utils/auth'
import { generateSlug } from '@/lib/utils/slug-util'
import { createArticleSchema } from '@/lib/validations/article'

function normalizePublishedAt(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'number') {
    return value > 1_000_000_000_000 ? Math.floor(value / 1000) : value
  }
  if (value instanceof Date) {
    return Math.floor(value.getTime() / 1000)
  }
  if (typeof value === 'string') {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return Math.floor(parsed.getTime() / 1000)
    }
  }
  return null
}

const updateArticleSchema = createArticleSchema.partial().required({
  title: true,
  slug: true,
  category: true,
  content: true,
})

export const GET = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const article = await articleDataService.getArticleById(id)

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
      defaultMessage: 'Failed to fetch article',
    })
  }
})

export const PUT = withAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const validatedData = await validateRequestBody(request, updateArticleSchema)
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return errorResponse(null, {
        status: 401,
        message: 'Unauthorized',
      })
    }

    const article = await articleDataService.updateArticle({
      id,
      title: validatedData.title,
      slug: validatedData.slug || generateSlug(validatedData.title),
      category: validatedData.category,
      content: validatedData.content,
      excerpt: validatedData.excerpt ?? null,
      featuredImage: validatedData.featuredImage ?? null,
      isFeatured: validatedData.isFeatured ?? false,
      author: validatedData.author ?? null,
      publishedAt: normalizePublishedAt(validatedData.publishedAt),
      isPublished: validatedData.isPublished ?? false,
      updatedBy: currentUser.id,
    })

    return successResponse(article, {
      message: 'Article updated successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Validation error:')) {
      return handleValidationError(error)
    }
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to update article',
    })
  }
})

export const DELETE = withAdminAuth(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const success = await articleDataService.deleteArticle(id)

    if (!success) {
      return errorResponse(null, {
        status: 404,
        message: 'Article not found',
      })
    }

    return successResponse(null, {
      message: 'Article deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete article',
    })
  }
})
