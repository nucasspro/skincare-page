/**
 * Product Data Service
 * Service layer với error handling (no caching)
 */

import type { CreateProductData, ProductRecord, UpdateProductData } from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

export class ProductDataService {
  /**
   * Get all products
   */
  async getAllProducts(): Promise<ProductRecord[]> {
    try {
      // Always fetch from data source (no cache)
      console.log('📥 Fetching products from data source...')
      const products = await dataSource.getAllProducts()
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<ProductRecord | null> {
    try {
      // Always fetch from data source (no cache)
      const product = await dataSource.getProductById(id)
      return product
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      throw error
    }
  }

  /**
   * Create new product
   */
  async createProduct(data: CreateProductData): Promise<ProductRecord> {
    try {
      const product = await dataSource.createProduct(data)
      return product
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  /**
   * Update product
   */
  async updateProduct(data: UpdateProductData): Promise<ProductRecord> {
    try {
      const product = await dataSource.updateProduct(data)
      return product
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const result = await dataSource.deleteProduct(id)
      return result
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }
}

// Export singleton instance
export const productDataService = new ProductDataService()
