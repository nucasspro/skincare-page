import { ObjectId } from 'mongodb'

import { withAdminAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { ContactMessageRecord } from '@/lib/types/contact-message'
import { ContactMessageStatus } from '@/lib/types/contact-message'
import { updateContactMessageSchema } from '@/lib/validations/contact-message-schemas'
import { errorResponse, successResponse } from '@/lib/utils/api-response'

function transformContactMessage(doc: ContactMessageRecord & { _id: ObjectId }) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    status: doc.status,
    adminNotes: doc.adminNotes ?? null,
    repliedAt: doc.repliedAt ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

export const GET = withAdminAuth(async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    const db = await getDb()
    const collection = db.collection<ContactMessageRecord>('contact_messages')

    const message = await collection.findOne({ _id: new ObjectId(id) })

    if (!message) {
      return errorResponse('Không tìm thấy tin nhắn', {
        status: 404,
      })
    }

    return successResponse(transformContactMessage({ ...message, _id: message._id as ObjectId }))
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Không thể tải tin nhắn',
    })
  }
})

export const PUT = withAdminAuth(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    const body = await validateRequestBody(request, updateContactMessageSchema)

    const db = await getDb()
    const collection = db.collection<ContactMessageRecord>('contact_messages')

    const message = await collection.findOne({ _id: new ObjectId(id) })

    if (!message) {
      return errorResponse('Không tìm thấy tin nhắn', {
        status: 404,
      })
    }

    const updateData: Partial<ContactMessageRecord> = {
      updatedAt: Math.floor(Date.now() / 1000),
    }

    if (body.status) {
      updateData.status = body.status
      if (body.status === ContactMessageStatus.REPLIED && !body.repliedAt) {
        updateData.repliedAt = Math.floor(Date.now() / 1000)
      }
      if (body.status !== ContactMessageStatus.REPLIED && body.repliedAt === null) {
        updateData.repliedAt = null
      }
    }

    if (body.adminNotes !== undefined) {
      updateData.adminNotes = body.adminNotes ?? null
    }

    if (body.repliedAt !== undefined && body.repliedAt !== null) {
      updateData.repliedAt = body.repliedAt
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    const updated = await collection.findOne({ _id: new ObjectId(id) })

    return successResponse(transformContactMessage({ ...updated!, _id: updated!._id as ObjectId }), {
      message: 'Đã cập nhật tin nhắn',
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation error')) {
      return handleValidationError(error)
    }

    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Không thể cập nhật tin nhắn',
    })
  }
})

export const DELETE = withAdminAuth(async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params

    const db = await getDb()
    const collection = db.collection<ContactMessageRecord>('contact_messages')

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return errorResponse('Không tìm thấy tin nhắn', {
        status: 404,
      })
    }

    return successResponse(null, {
      message: 'Đã xóa tin nhắn',
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Không thể xóa tin nhắn',
    })
  }
})
