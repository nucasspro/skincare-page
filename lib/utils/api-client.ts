/**
 * API Client Utilities
 * Standardized fetch wrapper with error handling for admin services
 */

interface ApiClientOptions extends RequestInit {
  defaultErrorMessage?: string
}

interface ApiResponse<T = any> {
  data: T
  message?: string
}

/**
 * API Client class
 * Provides standardized methods for making API requests
 */
class ApiClient {
  /**
   * Make a GET request
   */
  async get<T = any>(url: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'GET',
    })
  }

  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'DELETE',
    })
  }

  /**
   * Internal request method with error handling
   */
  private async request<T = any>(url: string, options?: ApiClientOptions): Promise<T> {
    const { defaultErrorMessage, ...fetchOptions } = options || {}

    try {
      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        // Include status code in error message for 404 handling
        const errorMessage = `HTTP ${response.status}: ${defaultErrorMessage || 'Request failed'}`
        // Try to parse error response
        const errorData = await response.json().catch(() => ({
          error: errorMessage,
          status: response.status,
        }))
        const error = new Error(errorData.error || errorMessage)
        // Attach status code to error for easier checking
        ;(error as any).status = errorData.status || response.status
        throw error
      }

      // Parse response
      const data: ApiResponse<T> = await response.json()

      // Return data field if present, otherwise return the whole response
      return (data.data !== undefined ? data.data : data) as T
    } catch (error) {
      // Re-throw if it's already an Error
      if (error instanceof Error) {
        throw error
      }
      // Otherwise wrap in Error
      throw new Error(defaultErrorMessage || 'Request failed')
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
