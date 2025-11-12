/**
 * API Response Type Definitions
 * Shared types for API responses across the application
 */

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = any> {
  data: T
  message?: string
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  error: string
  details?: string
}

/**
 * Generic API response type
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse
