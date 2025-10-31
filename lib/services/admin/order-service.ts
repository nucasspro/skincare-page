export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  userName?: string
  userEmail?: string
  status: string
  total: number
  items: OrderItem[]
  shippingAddress: string
  phone: string
  notes?: string
  createdAt: number
  updatedAt: number
}

interface OrderData {
  status?: string
  shippingAddress?: string
  phone?: string
  notes?: string
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
}

export const adminOrderService = new AdminOrderService()
