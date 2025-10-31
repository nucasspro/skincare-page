export interface StatusOption {
  value: string
  label: string
  color: string
}

export const ORDER_STATUS_OPTIONS: StatusOption[] = [
  { value: 'pending', label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800' },
  { value: 'shipping', label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
  { value: 'delivered', label: 'Đã giao', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
]

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: 'COD (Thanh toán khi nhận hàng)',
  bank: 'Chuyển khoản ngân hàng',
}

export const PAYMENT_METHOD_LABELS_SHORT: Record<string, string> = {
  cod: 'COD',
  bank: 'Chuyển khoản',
}

export function getStatusLabel(status: string): string {
  return ORDER_STATUS_OPTIONS.find(s => s.value === status)?.label || status
}

export function getStatusColor(status: string): string {
  return ORDER_STATUS_OPTIONS.find(s => s.value === status)?.color || 'bg-neutral-100 text-neutral-600'
}

export function getStatusInfo(status: string): StatusOption {
  return ORDER_STATUS_OPTIONS.find(s => s.value === status) || {
    value: status,
    label: status,
    color: 'bg-neutral-100 text-neutral-600'
  }
}
