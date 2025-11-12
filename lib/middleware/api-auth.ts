/**
 * API Authentication Middleware
 * Wrapper functions for API route authentication
 */

import { errorResponse } from '@/lib/utils/api-response'
import { getCurrentUser } from '@/lib/utils/auth'
import { NextResponse } from 'next/server'

/**
 * API route handler type
 */
type ApiHandler = (
  request: Request,
  context?: any
) => Promise<NextResponse> | NextResponse

/**
 * Wrapper to require authentication
 * Returns 401 if user is not authenticated
 */
export function withAuth(handler: ApiHandler): ApiHandler {
  return async (request: Request, context?: any) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return errorResponse(null, {
        status: 401,
        message: 'Unauthorized',
      })
    }
    return handler(request, context)
  }
}

/**
 * Wrapper to require admin role
 * Returns 401 if user is not authenticated
 * Returns 403 if user is not admin
 */
export function withAdminAuth(handler: ApiHandler): ApiHandler {
  return async (request: Request, context?: any) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return errorResponse(null, {
        status: 401,
        message: 'Unauthorized',
      })
    }
    if (currentUser.role !== 'admin') {
      return errorResponse(null, {
        status: 403,
        message: 'Forbidden: Admin access required',
      })
    }
    return handler(request, context)
  }
}
