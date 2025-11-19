import { ObjectId } from 'mongodb'

import { withAdminAuth } from '@/lib/middleware/api-auth'
import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { ContactMessageRecord } from '@/lib/types/contact-message'
import { ContactMessageStatus } from '@/lib/types/contact-message'
import { errorResponse, successResponse } from '@/lib/utils/api-response'
import { createContactMessageSchema } from '@/lib/validations/contact-message-schemas'

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

export const GET = withAdminAuth(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(Number(searchParams.get('page')) || 1, 1)
    const perPage = Math.min(Math.max(Number(searchParams.get('perPage')) || 10, 1), 100)
    const statusParam = searchParams.get('status')
    const search = searchParams.get('search')?.trim()

    const filter: Record<string, any> = {}

    if (statusParam && Object.values(ContactMessageStatus).includes(statusParam as ContactMessageStatus)) {
      filter.status = statusParam
    }

    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      filter.$or = [
        { name: regex },
        { email: regex },
        { subject: regex },
      ]
    }

    const db = await getDb()
    const collection = db.collection<ContactMessageRecord>('contact_messages')

    const total = await collection.countDocuments(filter)
    const items = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray()

    return successResponse({
      items: items.map((item) => transformContactMessage({ ...item, _id: item._id as unknown as ObjectId })),
      total,
      page,
      perPage,
    })
  } catch (error) {
    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Không thể tải danh sách tin nhắn',
    })
  }
})

export const POST = withAdminAuth(async (request: Request) => {
  try {
    const body = await validateRequestBody(request, createContactMessageSchema)

    const db = await getDb()
    const collection = db.collection<ContactMessageRecord>('contact_messages')

    const now = Math.floor(Date.now() / 1000)
    const objectId = new ObjectId()
    const newMessage = {
      _id: objectId,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      status: ContactMessageStatus.UNREAD,
      adminNotes: null,
      repliedAt: null,
      createdAt: now,
      updatedAt: now,
    }

    await collection.insertOne(newMessage as unknown as ContactMessageRecord)

    return successResponse(transformContactMessage(newMessage), {
      status: 201,
      message: 'Đã tạo tin nhắn mới',
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation error')) {
      return handleValidationError(error)
    }

    return errorResponse(error, {
      status: 500,
      defaultMessage: 'Không thể tạo tin nhắn',
    })
  }
})
