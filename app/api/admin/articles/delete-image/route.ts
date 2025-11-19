import { withAuth } from '@/lib/middleware/api-auth'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

/**
 * Delete image file from articles folder
 */
export const POST = withAuth(async (request: Request) => {
  try {
    const body = await request.json()
    const { imageUrl } = body

    if (!imageUrl || typeof imageUrl !== 'string') {
      return errorResponse(null, {
        status: 400,
        message: 'Image URL is required',
      })
    }

    // Extract path from URL: /articles/articleId/filename.jpg
    if (!imageUrl.startsWith('/articles/')) {
      return errorResponse(null, {
        status: 400,
        message: 'Invalid image URL',
      })
    }

    // Remove leading slash and get file path
    const relativePath = imageUrl.slice(1) // Remove leading '/'
    const filePath = path.join(process.cwd(), 'public', relativePath)

    // Security check: ensure file is within public/articles directory
    const publicArticlesPath = path.join(process.cwd(), 'public', 'articles')
    const resolvedFilePath = path.resolve(filePath)
    const resolvedArticlesPath = path.resolve(publicArticlesPath)

    if (!resolvedFilePath.startsWith(resolvedArticlesPath)) {
      return errorResponse(null, {
        status: 403,
        message: 'Access denied',
      })
    }

    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      // File doesn't exist, consider it already deleted
      return successResponse({ deleted: true, message: 'File already deleted or not found' })
    }

    // Delete file
    await fs.unlink(filePath)

    return successResponse({
      deleted: true,
      message: 'Image deleted successfully',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to delete image',
    })
  }
})
