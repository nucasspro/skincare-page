/**
 * Public Category Service
 * Read-only service for client-side components
 * Does NOT expose admin functions (create, update, delete)
 */

import { categoryReadService } from '@/lib/services/shared/category-read-service'
import type { Category } from '@/lib/types/category'

// Re-export for backward compatibility
export type { Category } from '@/lib/types/category'

class CategoryService {
  /**
   * Get all categories (public endpoint)
   */
  async getAllCategories(): Promise<Category[]> {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    return data.data || []
  }

  /**
   * Get category by ID
   * Optimized: Direct API call instead of fetching all categories
   */
  async getCategoryById(id: string): Promise<Category | undefined> {
    try {
      const response = await fetch(`/api/categories/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          return undefined
        }
        throw new Error('Failed to fetch category')
      }
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error fetching category by ID:', error)
      return undefined
    }
  }

  /**
   * Get category name by ID
   * Optimized: Uses getCategoryById for better performance
   */
  async getCategoryName(categoryId: string): Promise<string> {
    const category = await this.getCategoryById(categoryId)
    return category?.name || categoryId
  }

  /**
   * Get categories as object (Record<slug, name>)
   * Uses slug as key for filtering compatibility
   * Helper method for easy access in components
   * Categories are sorted in a specific order for display
   */
  async getCategoriesAsObject(): Promise<Record<string, string>> {
    const categories = await this.getAllCategories()
    return categoryReadService.getCategoriesAsObjectWithOrder(categories)
  }

  /**
   * Get categories for filter (excluding "all")
   */
  async getFilterCategories(): Promise<Category[]> {
    const categories = await this.getAllCategories()
    return categoryReadService.getFilterCategories(categories)
  }

  /**
   * Check if category exists
   */
  async categoryExists(categoryId: string): Promise<boolean> {
    const categories = await this.getAllCategories()
    return categoryReadService.categoryExists(categories, categoryId)
  }
}

export const categoryService = new CategoryService()
