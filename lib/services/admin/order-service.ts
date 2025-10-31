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
    const response = await fetch('/api/admin/orders')
    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }
    const data = await response.json()
    return (data.data || []).map((order: any) => ({
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
    }))
  }

  /**
   * Get a single order
   */
  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`/api/admin/orders/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch order')
    }
    const data = await response.json()
    return {
      ...data.data,
      items: typeof data.data.items === 'string' ? JSON.parse(data.data.items) : data.data.items,
    }
  }

  /**
   * Update an existing order
   */
  async updateOrder(id: string, orderData: OrderData): Promise<Order> {
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update order' }))
      throw new Error(error.error || 'Failed to update order')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Delete an order
   */
  async deleteOrder(id: string): Promise<void> {
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete order' }))
      throw new Error(error.error || 'Failed to delete order')
    }
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
