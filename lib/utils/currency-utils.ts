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
  amount: number | null | undefined,
  options?: {
    showDecimals?: boolean
    decimals?: number
  }
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0đ'
  }

  const { showDecimals = false, decimals = 0 } = options || {}

  const formatted = showDecimals
    ? amount.toLocaleString('vi-VN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : Math.round(amount).toLocaleString('vi-VN')

  return `${formatted}đ`
}

/**
 * Format number as Vietnamese currency (VND) with space before đ
 * Used in admin panel for consistency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted string with " đ" suffix (with space)
 *
 * @example
 * formatVND(1234567) // "1.234.567 đ"
 * formatVND(48) // "48 đ"
 */
export function formatVND(
  amount: number | null | undefined,
  options?: {
    showDecimals?: boolean
    decimals?: number
  }
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0 đ'
  }

  const { showDecimals = false, decimals = 0 } = options || {}

  const formatted = showDecimals
    ? amount.toLocaleString('vi-VN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : Math.round(amount).toLocaleString('vi-VN')

  return `${formatted} đ`
}

/**
 * Parse Vietnamese currency string to number
 * Removes "đ", "VNĐ", spaces, and dots (thousands separator)
 * @param value - The string value to parse
 * @returns Parsed number or NaN if invalid
 *
 * @example
 * parseVND("1.234.567 đ") // 1234567
 * parseVND("48 đ") // 48
 */
export function parseVND(value: string): number {
  if (!value) return NaN

  // Remove "đ", "VNĐ", spaces, and dots (thousands separator)
  const cleaned = value
    .replace(/VNĐ/gi, '')
    .replace(/đ/gi, '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.') // Replace comma with dot for decimal separator

  return parseFloat(cleaned)
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
