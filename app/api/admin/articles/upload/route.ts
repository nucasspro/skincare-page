import { withAuth } from '@/lib/middleware/api-auth'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export const POST = withAuth(async (request: Request) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

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
        message: 'Kích thước ảnh vượt quá 5MB',
      })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadDir = path.join(process.cwd(), 'public', 'articles')
    await fs.mkdir(uploadDir, { recursive: true })

    const ext = path.extname(file.name) || '.png'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    const filePath = path.join(uploadDir, filename)

    await fs.writeFile(filePath, buffer)

    const publicPath = `/articles/${filename}`
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
