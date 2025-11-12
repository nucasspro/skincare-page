import { Product } from '@/lib/product-service'
import { apiClient } from '@/lib/utils/api-client'
import { transformProductRecord } from '@/lib/utils/product-transformer'
import { generateSlug } from '@/lib/utils/slug-util'

interface ProductData {
  name: string
  tagline: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  category: string
  needs: string[]
  image: string
  hoverImage: string
  description: string
  benefits: string[]
  ingredients: string[]
  howToUse?: string
}

class AdminProductService {
  /**
   * Get all products
   */
  async getAllProducts(): Promise<Product[]> {
    const products = await apiClient.get<any[]>('/api/products', {
      defaultErrorMessage: 'Failed to fetch products',
    })
    return (products || []).map((p: any) => this.transformProduct(p))
  }

  /**
   * Create a new product
   */
  async createProduct(productData: ProductData): Promise<Product> {
    const product = await apiClient.post<any>('/api/admin/products', {
      ...productData,
      slug: generateSlug(productData.name),
    }, {
      defaultErrorMessage: 'Failed to create product',
    })
    return this.transformProduct(product)
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, productData: ProductData): Promise<Product> {
    const product = await apiClient.put<any>(`/api/admin/products/${id}`, {
      ...productData,
      slug: generateSlug(productData.name),
    }, {
      defaultErrorMessage: 'Failed to update product',
    })
    return this.transformProduct(product)
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/products/${id}`, {
      defaultErrorMessage: 'Failed to delete product',
    })
  }

  /**
   * Transform database product to Product interface
   */
  private transformProduct(dbProduct: any): Product & { createdAt?: number } {
    return transformProductRecord(dbProduct, {
      useExistingSlug: true,
      includeCreatedAt: true,
    }) as Product & { createdAt?: number }
  }
}

export const adminProductService = new AdminProductService()
