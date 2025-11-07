/**
 * Date utility functions
 * Format dates in Vietnamese format
 */

/**
 * Format Unix timestamp to Vietnamese date string
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string (dd/mm/yyyy) or '-' if invalid
 *
 * @example
 * formatDate(1704067200) // "01/01/2024"
 * formatDate(null) // "-"
 */
export function formatDate(timestamp?: number | null): string {
  if (!timestamp || timestamp === 0) return '-'
  // Convert Unix timestamp (seconds) to milliseconds
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
