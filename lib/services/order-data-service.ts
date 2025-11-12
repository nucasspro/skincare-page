/**
 * Order Data Service
 * Service layer với error handling (no caching)
 */

import type { CreateOrderData, OrderRecord, UpdateOrderData } from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

export class OrderDataService {
  async getAllOrders(): Promise<OrderRecord[]> {
    try {
      console.log('📥 Fetching orders from data source...')
      const orders = await dataSource.getAllOrders()
      return orders
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  async getOrderById(id: string): Promise<OrderRecord | null> {
    try {
      const order = await dataSource.getOrderById(id)
      return order
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error)
      throw error
    }
  }

  async createOrder(data: CreateOrderData): Promise<OrderRecord> {
    try {
      const order = await dataSource.createOrder(data)
      return order
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  async updateOrder(data: UpdateOrderData): Promise<OrderRecord> {
    try {
      const order = await dataSource.updateOrder(data)
      return order
    } catch (error) {
      console.error('Error updating order:', error)
      throw error
    }
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      const result = await dataSource.deleteOrder(id)
      return result
    } catch (error) {
      console.error('Error deleting order:', error)
      throw error
    }
  }
}

export const orderDataService = new OrderDataService()
