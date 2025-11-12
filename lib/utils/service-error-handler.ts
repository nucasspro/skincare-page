/**
 * Service Error Handler Utilities
 * Wrapper functions for consistent error handling in data services
 */

/**
 * Wrap an async operation with error handling
 * Logs errors with context and re-throws them
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    console.error(`Error in ${context}:`, error)
    throw error
  }
}

/**
 * Wrap an async operation with error handling and logging
 * Includes optional log message before execution
 */
export async function withErrorHandlingAndLog<T>(
  operation: () => Promise<T>,
  context: string,
  logMessage?: string
): Promise<T> {
  try {
    if (logMessage) {
      console.log(logMessage)
    }
    return await operation()
  } catch (error) {
    console.error(`Error in ${context}:`, error)
    throw error
  }
}
