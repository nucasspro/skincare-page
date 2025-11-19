import { withAuth } from '@/lib/middleware/api-auth'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB (cho phép upload ảnh lớn, sẽ compress sau)
const MAX_IMAGE_WIDTH = 1920 // Max width sau khi resize
const MAX_IMAGE_HEIGHT = 1920 // Max height sau khi resize
const JPEG_QUALITY = 85 // Quality cho JPEG
const PNG_QUALITY = 90 // Quality cho PNG
const WEBP_QUALITY = 85 // Quality cho WebP
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const DEFAULT_FOLDER = 'shared'

function sanitizeFolderName(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') {
    return DEFAULT_FOLDER
  }
  const trimmed = value.trim()
  if (!trimmed) {
    return DEFAULT_FOLDER
  }
  return /^[a-zA-Z0-9_-]+$/.test(trimmed) ? trimmed : DEFAULT_FOLDER
}

export const POST = withAuth(async (request: Request) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const folderName = sanitizeFolderName(formData.get('articleId'))

    if (!(file instanceof File)) {
      return errorResponse(null, {
        status: 400,
        message: 'Thiếu tập tin tải lên',
      })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse(null, {
        status: 400,
        message: 'Định dạng ảnh không được hỗ trợ',
      })
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(null, {
        status: 400,
        message: `Kích thước ảnh vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB. Vui lòng nén ảnh trước khi upload.`,
      })
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer())
    const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName)
    await fs.mkdir(uploadDir, { recursive: true })

    // Process image với sharp: resize và compress
    let processedBuffer: Buffer
    let outputExt = path.extname(file.name) || '.jpg'
    let outputMime = file.type

    try {
      // Dynamic import sharp to reduce bundle size
      const sharp = (await import('sharp')).default
      const image = sharp(originalBuffer)
      const metadata = await image.metadata()

      // Resize nếu ảnh quá lớn (giữ tỷ lệ, fit inside)
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

      // Convert và compress dựa trên format
      if (file.type === 'image/jpeg' || outputExt === '.jpg' || outputExt === '.jpeg') {
        processedBuffer = await resizedImage
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer()
        outputExt = '.jpg'
        outputMime = 'image/jpeg'
      } else if (file.type === 'image/png' || outputExt === '.png') {
        processedBuffer = await resizedImage
          .png({ quality: PNG_QUALITY, compressionLevel: 9 })
          .toBuffer()
        outputExt = '.png'
        outputMime = 'image/png'
      } else if (file.type === 'image/webp' || outputExt === '.webp') {
        processedBuffer = await resizedImage
          .webp({ quality: WEBP_QUALITY })
          .toBuffer()
        outputExt = '.webp'
        outputMime = 'image/webp'
      } else if (file.type === 'image/gif') {
        // GIF giữ nguyên, không compress
        processedBuffer = originalBuffer
        outputExt = '.gif'
        outputMime = 'image/gif'
      } else {
        // Fallback: convert sang JPEG
        processedBuffer = await resizedImage
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer()
        outputExt = '.jpg'
        outputMime = 'image/jpeg'
      }
    } catch (error) {
      // Nếu sharp không xử lý được (ví dụ: file không phải ảnh hợp lệ), dùng buffer gốc
      console.warn('Sharp processing failed, using original buffer:', error)
      processedBuffer = originalBuffer
    }

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${outputExt}`
    const filePath = path.join(uploadDir, filename)

    await fs.writeFile(filePath, processedBuffer as Uint8Array)

    const publicPath = `/articles/${folderName}/${filename}`
    return successResponse(
      { url: publicPath },
      {
        status: 201,
        message: 'Tải ảnh thành công',
      }
    )
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Không thể tải ảnh',
    })
  }
})
