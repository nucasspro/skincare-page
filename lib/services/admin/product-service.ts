import { Product } from '@/lib/product-service'
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
    const response = await fetch('/api/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    return (data.data || []).map((p: any) => this.transformProduct(p))
  }

  /**
   * Create a new product
   */
  async createProduct(productData: ProductData): Promise<Product> {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        slug: generateSlug(productData.name),
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to create product' }))
      throw new Error(error.error || 'Failed to create product')
    }

    const data = await response.json()
    return this.transformProduct(data.data)
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, productData: ProductData): Promise<Product> {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        slug: generateSlug(productData.name),
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update product' }))
      throw new Error(error.error || 'Failed to update product')
    }

    const data = await response.json()
    return this.transformProduct(data.data)
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete product' }))
      throw new Error(error.error || 'Failed to delete product')
    }
  }

  /**
   * Transform database product to Product interface
   */
  private transformProduct(dbProduct: any): Product & { createdAt?: number } {
    return {
      id: dbProduct.id,
      slug: dbProduct.slug || generateSlug(dbProduct.name),
      name: dbProduct.name,
      tagline: dbProduct.tagline,
      price: dbProduct.price,
      originalPrice: dbProduct.originalPrice || undefined,
      discount: dbProduct.discount || undefined,
      category: dbProduct.category,
      needs: typeof dbProduct.needs === 'string' ? JSON.parse(dbProduct.needs) : dbProduct.needs || [],
      image: dbProduct.image,
      hoverImage: dbProduct.hoverImage,
      description: dbProduct.description || undefined,
      benefits: typeof dbProduct.benefits === 'string' ? JSON.parse(dbProduct.benefits) : dbProduct.benefits || [],
      ingredients: typeof dbProduct.ingredients === 'string' ? JSON.parse(dbProduct.ingredients) : dbProduct.ingredients || [],
      howToUse: dbProduct.howToUse || undefined,
      createdAt: dbProduct.createdAt,
    }
  }
}

export const adminProductService = new AdminProductService()
