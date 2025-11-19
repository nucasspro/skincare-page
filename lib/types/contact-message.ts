export enum ContactMessageStatus {
  UNREAD = 'unread',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: ContactMessageStatus
  adminNotes?: string | null
  repliedAt?: number | null
  createdAt: number
  updatedAt: number
}

export interface CreateContactMessageData {
  name: string
  email: string
  subject: string
  message: string
}

export interface UpdateContactMessageData {
  status?: ContactMessageStatus
  adminNotes?: string | null
  repliedAt?: number | null
}

import type { ObjectId } from 'mongodb'

export interface ContactMessageRecord {
  _id: string | ObjectId
  name: string
  email: string
  subject: string
  message: string
  status: ContactMessageStatus
  adminNotes?: string | null
  repliedAt?: number | null
  createdAt: number
  updatedAt: number
}
