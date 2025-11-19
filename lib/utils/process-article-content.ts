/**
 * Process Article Content
 * Automatically extracts base64 images from HTML content, uploads them,
 * and replaces them with URLs to reduce content size
 */

import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const MAX_IMAGE_WIDTH = 1920
const MAX_IMAGE_HEIGHT = 1920
const JPEG_QUALITY = 85
const PNG_QUALITY = 90
const WEBP_QUALITY = 85
const DEFAULT_FOLDER = 'shared'

function sanitizeFolderName(value: string | null | undefined): string {
  if (!value || typeof value !== 'string') {
    return DEFAULT_FOLDER
  }
  const trimmed = value.trim()
  if (!trimmed) {
    return DEFAULT_FOLDER
  }
  return /^[a-zA-Z0-9_-]+$/.test(trimmed) ? trimmed : DEFAULT_FOLDER
}

/**
 * Extract base64 images from HTML content
 * Returns array of { src, dataUrl, mimeType }
 */
function extractBase64Images(html: string): Array<{ src: string; dataUrl: string; mimeType: string }> {
  const images: Array<{ src: string; dataUrl: string; mimeType: string }> = []

  // Match <img src="data:image/...;base64,..." />
  const base64Regex = /<img[^>]+src=["'](data:image\/([^;]+);base64,([^"']+))["'][^>]*>/gi
  let match

  while ((match = base64Regex.exec(html)) !== null) {
    const fullDataUrl = match[1]
    const mimeType = match[2] || 'png'
    const base64Data = match[3]

    images.push({
      src: fullDataUrl,
      dataUrl: base64Data,
      mimeType: mimeType.toLowerCase(),
    })
  }

  return images
}

/**
 * Process and save base64 image
 */
async function processBase64Image(
  dataUrl: string,
  mimeType: string,
  folderName: string
): Promise<string> {
  // Convert base64 to buffer
  const buffer = Buffer.from(dataUrl, 'base64')

  // Determine file extension
  let ext = '.jpg'
  if (mimeType === 'png') ext = '.png'
  else if (mimeType === 'webp') ext = '.webp'
  else if (mimeType === 'gif') ext = '.gif'

  // Create upload directory
  const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName)
  await fs.mkdir(uploadDir, { recursive: true })

  // Process image with sharp
  let processedBuffer: Buffer

  try {
    const image = sharp(buffer)
    const metadata = await image.metadata()

    // Resize if too large
    let resizedImage = image
    if (
      (metadata.width && metadata.width > MAX_IMAGE_WIDTH) ||
      (metadata.height && metadata.height > MAX_IMAGE_HEIGHT)
    ) {
      resizedImage = image.resize(MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT, {
        withoutEnlargement: true,
        fit: 'inside',
      })
    }

    // Convert and compress
    if (mimeType === 'jpeg' || mimeType === 'jpg') {
      processedBuffer = await resizedImage
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer()
      ext = '.jpg'
    } else if (mimeType === 'png') {
      processedBuffer = await resizedImage
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toBuffer()
      ext = '.png'
    } else if (mimeType === 'webp') {
      processedBuffer = await resizedImage
        .webp({ quality: WEBP_QUALITY })
        .toBuffer()
      ext = '.webp'
    } else if (mimeType === 'gif') {
      // Keep GIF as is
      processedBuffer = buffer
      ext = '.gif'
    } else {
      // Fallback to JPEG
      processedBuffer = await resizedImage
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer()
      ext = '.jpg'
    }
  } catch (error) {
    // If sharp fails, use original buffer
    console.warn('Sharp processing failed for base64 image:', error)
    processedBuffer = buffer
  }

  // Generate filename and save
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const filePath = path.join(uploadDir, filename)
  await fs.writeFile(filePath, processedBuffer)

  // Return public URL
  return `/articles/${folderName}/${filename}`
}

/**
 * Process article content: extract base64 images, upload them, replace with URLs
 */
export async function processArticleContent(
  content: string,
  articleId?: string | null
): Promise<string> {
  if (!content || typeof content !== 'string') {
    return content
  }

  // Extract base64 images
  const base64Images = extractBase64Images(content)

  if (base64Images.length === 0) {
    return content
  }

  // Process each image
  const folderName = sanitizeFolderName(articleId)
  let processedContent = content

  for (const image of base64Images) {
    try {
      const url = await processBase64Image(image.dataUrl, image.mimeType, folderName)
      // Replace base64 src with URL
      processedContent = processedContent.replace(image.src, url)
    } catch (error) {
      console.error('Failed to process base64 image:', error)
      // Keep original base64 if processing fails
    }
  }

  return processedContent
}
