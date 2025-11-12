/**
 * User Validation Schemas
 * Zod schemas for user API request validation
 */

import { z } from 'zod'

/**
 * Schema for creating a user
 */
export const createUserSchema = z.object({
  email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
  name: z.string().min(1, 'Tên là bắt buộc'),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  role: z.string().optional().default('user'),
})

/**
 * Schema for updating a user
 */
export const updateUserSchema = createUserSchema.partial().extend({
  email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc').optional(),
  name: z.string().min(1, 'Tên là bắt buộc').optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
