import { ContactMessageStatus } from '@/lib/types/contact-message'
import { z } from 'zod'

export const createContactMessageSchema = z.object({
  name: z
    .string({ required_error: 'Tên là bắt buộc' })
    .trim()
    .min(1, 'Tên là bắt buộc')
    .max(200, 'Tên không được vượt quá 200 ký tự'),
  email: z
    .string({ required_error: 'Email là bắt buộc' })
    .trim()
    .email('Email không hợp lệ')
    .max(255, 'Email không được vượt quá 255 ký tự'),
  subject: z
    .string({ required_error: 'Chủ đề là bắt buộc' })
    .trim()
    .min(1, 'Chủ đề là bắt buộc')
    .max(255, 'Chủ đề không được vượt quá 255 ký tự'),
  message: z
    .string({ required_error: 'Nội dung là bắt buộc' })
    .trim()
    .min(1, 'Nội dung là bắt buộc'),
})

export const updateContactMessageSchema = z.object({
  status: z.nativeEnum(ContactMessageStatus).optional(),
  adminNotes: z
    .string()
    .trim()
    .max(2000, 'Ghi chú không được vượt quá 2000 ký tự')
    .optional()
    .nullable(),
  repliedAt: z
    .number()
    .int()
    .positive('Thời gian trả lời không hợp lệ')
    .optional()
    .nullable(),
})

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>
export type UpdateContactMessageInput = z.infer<typeof updateContactMessageSchema>
