/**
 * Setting Validation Schemas
 * Zod schemas for setting API request validation
 */

import { z } from 'zod'

export const SettingTypeEnum = z.enum(['string', 'number', 'image', 'boolean', 'json'])

/**
 * Schema for creating a setting
 */
export const createSettingSchema = z.object({
  key: z.string().min(1, 'Key là bắt buộc').regex(/^[a-z0-9_]+$/, 'Key chỉ được chứa chữ thường, số và dấu gạch dưới'),
  value: z.string().min(1, 'Value là bắt buộc'),
  type: SettingTypeEnum,
  description: z.string().optional().nullable(),
  group: z.string().optional().nullable(),
  isPublic: z.boolean().optional().default(false),
})

/**
 * Schema for updating a setting
 */
export const updateSettingSchema = z.object({
  value: z.string().optional(),
  type: SettingTypeEnum.optional(),
  description: z.string().optional().nullable(),
  group: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
})

/**
 * Validate setting value based on type
 */
export function validateSettingValue(value: string, type: string): boolean {
  switch (type) {
    case 'number':
      return !isNaN(parseFloat(value)) && isFinite(parseFloat(value))
    case 'boolean':
      return value === 'true' || value === 'false' || value === '1' || value === '0'
    case 'json':
      try {
        JSON.parse(value)
        return true
      } catch {
        return false
      }
    case 'image':
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    case 'string':
    default:
      return true
  }
}
