/**
 * Single source of truth for order status definitions
 * All status-related styling and labels should be defined here
 */

export interface StatusOption {
  value: string
  label: string
  color: string // Tailwind classes for background and text color
  badgeClass?: string // Optional: for badge styling (legacy support)
}

/**
 * Centralized order status definitions
 * To add/modify status: update this array only
 */
export const ORDER_STATUS_OPTIONS: StatusOption[] = [
  {
    value: 'pending',
    label: 'Chờ xác nhận',
    color: 'bg-yellow-100 text-yellow-800',
    badgeClass: 'bg-warning'
  },
  {
    value: 'confirmed',
    label: 'Đã xác nhận',
    color: 'bg-blue-100 text-blue-800',
    badgeClass: 'bg-info'
  },
  {
    value: 'shipping',
    label: 'Đang giao',
    color: 'bg-purple-100 text-purple-800',
    badgeClass: 'bg-info'
  },
  {
    value: 'delivered',
    label: 'Đã giao',
    color: 'bg-green-100 text-green-800',
    badgeClass: 'bg-success'
  },
  {
    value: 'cancelled',
    label: 'Đã hủy',
    color: 'bg-red-100 text-red-800',
    badgeClass: 'bg-danger'
  },
]

/**
 * Payment method labels - full descriptions
 */
export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: 'COD (Thanh toán khi nhận hàng)',
  bank: 'Chuyển khoản ngân hàng',
}

/**
 * Payment method labels - short versions
 */
export const PAYMENT_METHOD_LABELS_SHORT: Record<string, string> = {
  cod: 'COD',
  bank: 'Chuyển khoản',
}

/**
 * Default status option for unknown statuses
 */
const DEFAULT_STATUS_OPTION: StatusOption = {
  value: 'unknown',
  label: 'Không xác định',
  color: 'bg-neutral-100 text-neutral-600'
}

/**
 * Get status label by status value
 * @param status - Status value (e.g., 'pending', 'confirmed')
 * @returns Status label or the status value if not found
 */
export function getStatusLabel(status: string): string {
  return ORDER_STATUS_OPTIONS.find(s => s.value === status)?.label || status
}

/**
 * Get status color classes by status value
 * @param status - Status value (e.g., 'pending', 'confirmed')
 * @returns Tailwind color classes or default color classes
 */
export function getStatusColor(status: string): string {
  return ORDER_STATUS_OPTIONS.find(s => s.value === status)?.color || DEFAULT_STATUS_OPTION.color
}

/**
 * Get complete status information by status value
 * This is the recommended function to use for getting status info
 * @param status - Status value (e.g., 'pending', 'confirmed')
 * @returns Complete StatusOption object with all properties
 */
export function getStatusInfo(status: string): StatusOption {
  return ORDER_STATUS_OPTIONS.find(s => s.value === status) || {
    ...DEFAULT_STATUS_OPTION,
    value: status,
    label: status,
  }
}

/**
 * Check if a status value is valid
 * @param status - Status value to check
 * @returns true if status exists in ORDER_STATUS_OPTIONS
 */
export function isValidStatus(status: string): boolean {
  return ORDER_STATUS_OPTIONS.some(s => s.value === status)
}

/**
 * Get all status values
 * @returns Array of status values
 */
export function getAllStatusValues(): string[] {
  return ORDER_STATUS_OPTIONS.map(s => s.value)
}
