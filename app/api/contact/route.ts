import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

import { handleValidationError, validateRequestBody } from '@/lib/middleware/validate-request'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import type { ContactMessageRecord } from '@/lib/types/contact-message'
import { ContactMessageStatus } from '@/lib/types/contact-message'
import { createContactMessageSchema } from '@/lib/validations/contact-message-schemas'
import { emailService } from '@/lib/services/email-service'

function transformContactMessage(doc: ContactMessageRecord) {
  return {
    id: doc._id?.toString(),
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

export async function POST(request: Request) {
  try {
    const body = await validateRequestBody(request, createContactMessageSchema)

    const db = await getDb()
    const collection = db.collection<ContactMessageRecord>('contact_messages')

    const now = Math.floor(Date.now() / 1000)
    const objectId = new ObjectId()
    const newMessage: ContactMessageRecord = {
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

    await collection.insertOne(newMessage)

    // Fire-and-forget email notification
    const responseMessage = transformContactMessage(newMessage)

    emailService
      .sendContactNotification({
        id: responseMessage.id,
        name: responseMessage.name,
        email: responseMessage.email,
        subject: responseMessage.subject,
        message: responseMessage.message,
        status: responseMessage.status,
        adminNotes: responseMessage.adminNotes,
        repliedAt: responseMessage.repliedAt,
        createdAt: responseMessage.createdAt,
        updatedAt: responseMessage.updatedAt,
      })
      .catch((error) => {
        console.error('[API /api/contact] Failed to send notification email:', error)
      })

    return NextResponse.json(
      {
        message: 'Tin nhắn của bạn đã được ghi nhận thành công',
        data: responseMessage,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation error')) {
      return handleValidationError(error)
    }

    console.error('[API /api/contact] Failed to submit contact message:', error)
    return NextResponse.json(
      {
        error: 'Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau.',
      },
      { status: 500 }
    )
  }
}
