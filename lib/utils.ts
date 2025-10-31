import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number as Vietnamese currency (đ)
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted string with "đ" suffix
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