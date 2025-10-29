/**
 * Currency utility functions
 * Format prices to Vietnamese Dong (VND)
 */

/**
 * Format number as Vietnamese currency (VND)
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted string with "đ" suffix
 *
 * @example
 * formatCurrency(1234567) // "1.234.567đ"
 * formatCurrency(48) // "48đ"
 */
export function formatCurrency(
  amount: number,
  options?: {
    showDecimals?: boolean
    decimals?: number
  }
): string {
  const { showDecimals = false, decimals = 0 } = options || {}

  const formatted = showDecimals
    ? amount.toLocaleString('vi-VN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : amount.toLocaleString('vi-VN')

  return `${formatted}đ`
}

/**
 * Format currency with decimals (for display purposes)
 * @param amount - The amount to format
 * @returns Formatted string with 2 decimals and "đ" suffix
 *
 * @example
 * formatCurrencyWithDecimals(1234.56) // "1.234,56đ"
 */
export function formatCurrencyWithDecimals(amount: number): string {
  return formatCurrency(amount, { showDecimals: true, decimals: 2 })
}

/**
 * Format currency for price range display
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @returns Formatted string like "0đ - 200đ"
 */
export function formatPriceRange(min: number, max: number): string {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}
