import { withAuth } from '@/lib/middleware/api-auth'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

/**
 * Extract image URLs from HTML content
 */
function extractImageUrls(html: string): string[] {
  const urls: string[] = []
  // Match <img src="/articles/..." />
  const imgRegex = /<img[^>]+src=["'](\/articles\/[^"']+)["'][^>]*>/gi
  let match

  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1]
    if (url && !url.startsWith('data:')) {
      urls.push(url)
    }
  }

  return urls
}

/**
 * Delete unused images from article folder
 */
export const POST = withAuth(async (request: Request) => {
  try {
    const body = await request.json()
    const { articleId, oldContent, newContent } = body

    if (!articleId) {
      return errorResponse(null, {
        status: 400,
        message: 'Article ID is required',
      })
    }

    // Extract image URLs from old and new content
    const oldImages = oldContent ? extractImageUrls(oldContent) : []
    const newImages = newContent ? extractImageUrls(newContent) : []

    // Find images that were removed
    const removedImages = oldImages.filter((url) => !newImages.includes(url))

    if (removedImages.length === 0) {
      return successResponse({ deleted: 0, message: 'No images to delete' })
    }

    // Delete files
    let deletedCount = 0
    const articleFolder = path.join(process.cwd(), 'public', 'articles', articleId)

    for (const imageUrl of removedImages) {
      try {
        // Extract filename from URL: /articles/articleId/filename.jpg
        const filename = imageUrl.split('/').pop()
        if (filename) {
          const filePath = path.join(articleFolder, filename)
          await fs.unlink(filePath)
          deletedCount++
        }
      } catch (error) {
        // File might not exist, ignore
        console.warn(`Failed to delete image ${imageUrl}:`, error)
      }
    }

    return successResponse({
      deleted: deletedCount,
      message: `Deleted ${deletedCount} unused image(s)`,
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Failed to cleanup images',
    })
  }
})
