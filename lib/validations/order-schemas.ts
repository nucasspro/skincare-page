/**
 * Order Validation Schemas
 * Zod schemas for order API request validation
 */

import { z } from 'zod'

/**
 * Schema for order item
 */
export const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
  image: z.string().optional(),
})

/**
 * Schema for creating/updating an order
 */
export const createOrderSchema = z.object({
  status: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional().nullable(),
  customerName: z.string().min(1, 'Tên khách hàng là bắt buộc').optional(),
  customerEmail: z.string().email('Email không hợp lệ').optional().nullable(),
  customerPhone: z.string().min(1, 'Số điện thoại là bắt buộc').optional(),
  streetAddress: z.string().optional(),
  wardName: z.string().optional().nullable(),
  districtName: z.string().optional().nullable(),
  provinceName: z.string().optional().nullable(),
})

/**
 * Schema for updating an order
 */
export const updateOrderSchema = createOrderSchema.partial()

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
