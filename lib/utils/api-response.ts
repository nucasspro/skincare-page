/**
 * API Response Utilities
 * Standardized response helpers for API routes
 */

import { NextResponse } from 'next/server'
import { transformProductForAPI } from './product-transformer'

/**
 * Ensure ID is always a string
 * Converts any ID value to string safely
 */
export function ensureStringId(id: unknown): string {
  if (id === null || id === undefined) {
    return ''
  }
  return String(id)
}

/**
 * Parse JSON field safely
 * Handles both string and array formats
 * @deprecated Use product-transformer or order-transformer utilities instead
 * This function is kept for backward compatibility but should not be used in new code
 */
export function parseJsonField(field: unknown, defaultValue: any = []): any {
  if (field === null || field === undefined) {
    return defaultValue
  }
  if (typeof field === 'string') {
    try {
      return JSON.parse(field || JSON.stringify(defaultValue))
    } catch {
      return defaultValue
    }
  }
  if (Array.isArray(field)) {
    return field
  }
  return defaultValue
}

/**
 * Transform product for API response
 * Parses JSON fields (needs, benefits, ingredients) and ensures ID is string
 * @template T - The input product type from database
 * @returns Transformed product with proper types (Product interface)
 */
export function transformProductForResponse<T = any>(product: T): ReturnType<typeof transformProductForAPI> {
  // transformProductForAPI returns Product type
  return transformProductForAPI(product) as ReturnType<typeof transformProductForAPI>
}

/**
 * Transform record for API response
 * Ensures ID is string and preserves other fields
 * @template T - The input record type
 * @returns Transformed record with string ID
 */
export function transformRecordForResponse<T extends { id?: unknown }>(
  record: T
): T & { id: string } {
  return {
    ...record,
    id: ensureStringId(record.id),
  }
}

/**
 * Success response helper
 * Creates a standardized success response with type safety
 * @template T - The type of data being returned
 * @param data - The data to return in the response
 * @param options - Optional response options (status, message)
 * @returns NextResponse with typed data
 */
export function successResponse<T = any>(
  data: T | null,
  options?: {
    status?: number
    message?: string
  }
): NextResponse<{
  data: T | null
  message?: string
}> {
  const { status = 200, message } = options || {}

  const response: {
    data: T | null
    message?: string
  } = { data }
  if (message) {
    response.message = message
  }

  return NextResponse.json(response, { status })
}

/**
 * Error response helper
 * Creates a standardized error response
 * @param error - The error object or message
 * @param options - Optional error response options (status, message, defaultMessage)
 * @returns NextResponse with error message
 */
export function errorResponse(
  error: unknown,
  options?: {
    status?: number
    message?: string
    defaultMessage?: string
  }
): NextResponse<{
  error: string
}> {
  const { status = 500, message, defaultMessage = 'An error occurred' } = options || {}

  let errorMessage = message || defaultMessage

  if (error instanceof Error) {
    errorMessage = error.message || errorMessage
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  // Log error for debugging
  console.error(`[API Error] ${errorMessage}:`, error)

  return NextResponse.json(
    { error: errorMessage },
    { status }
  )
}
