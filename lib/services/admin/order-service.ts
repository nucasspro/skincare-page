import { apiClient } from '@/lib/utils/api-client'
import { transformOrderRecord } from '@/lib/utils/order-transformer'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string

  // Customer
  customerName: string
  customerEmail?: string
  customerPhone: string

  // User (optional - for logged in users)
  userId?: string

  // Address
  streetAddress: string
  wardName?: string
  districtName?: string
  provinceName?: string

  // Order
  status: string
  paymentMethod: string
  items: OrderItem[]
  total: number
  notes?: string

  // Timestamps
  createdAt: number
  updatedAt: number
}

interface OrderData {
  status?: string
  paymentMethod?: string
  notes?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  streetAddress?: string
  wardName?: string
  districtName?: string
  provinceName?: string
}

class AdminOrderService {
  /**
   * Get all orders
   */
  async getAllOrders(): Promise<Order[]> {
    const orders = await apiClient.get<Order[]>('/api/admin/orders', {
      defaultErrorMessage: 'Failed to fetch orders',
    })
    return (orders || []).map((order: any) => transformOrderRecord(order))
  }

  /**
   * Get a single order
   */
  async getOrder(id: string): Promise<Order> {
    const order = await apiClient.get<Order>(`/api/admin/orders/${id}`, {
      defaultErrorMessage: 'Failed to fetch order',
    })
    return transformOrderRecord(order)
  }

  /**
   * Update an existing order
   */
  async updateOrder(id: string, orderData: OrderData): Promise<Order> {
    return apiClient.put<Order>(`/api/admin/orders/${id}`, orderData, {
      defaultErrorMessage: 'Failed to update order',
    })
  }

  /**
   * Delete an order
   */
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/orders/${id}`, {
      defaultErrorMessage: 'Failed to delete order',
    })
  }

  /**
   * Get order statistics
   */
  getOrderStats(orders: Order[]) {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      shipping: orders.filter(o => o.status === 'shipping').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0),
    }
  }
}

export const adminOrderService = new AdminOrderService()
