/**
 * Request Validation Middleware
 * Utilities for validating API request bodies with Zod schemas
 */

import { errorResponse } from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Validate request body with Zod schema
 * Throws error if validation fails, returns validated data if succeeds
 */
export async function validateRequestBody<T extends z.ZodTypeAny>(
  request: Request,
  schema: T
): Promise<z.infer<T>> {
  try {
    const body = await request.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map(e => `${e.path.join('.')}: ${e.message}`)
        .join(', ')
      throw new Error(`Validation error: ${errorMessage}`)
    }
    throw error
  }
}

/**
 * Helper to handle validation errors in route handlers
 */
export function handleValidationError(error: unknown): NextResponse {
  if (error instanceof Error && error.message.startsWith('Validation error:')) {
    return errorResponse(null, {
      status: 400,
      message: error.message,
    })
  }
  return errorResponse(error, {
    status: 400,
    message: 'Invalid request body',
  })
}
