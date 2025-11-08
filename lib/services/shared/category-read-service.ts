/**
 * Shared Category Read Service
 * Contains common read operations shared between public and admin category services
 */

import type { Category } from '@/lib/types/category'

/**
 * Shared category read operations
 * These methods are used by both public and admin category services
 */
export class CategoryReadService {
  /**
   * Get category by ID from array
   */
  getCategoryById(categories: Category[], id: string): Category | undefined {
    return categories.find(cat => cat.id === id)
  }

  /**
   * Get category name by ID
   */
  getCategoryName(categories: Category[], categoryId: string): string {
    const category = this.getCategoryById(categories, categoryId)
    return category?.name || categoryId
  }

  /**
   * Get categories as object (Record<slug, name>)
   * Uses slug as key for filtering compatibility
   */
  getCategoriesAsObject(categories: Category[]): Record<string, string> {
    const result: Record<string, string> = {}
    categories.forEach(cat => {
      // Use slug as key if available, fallback to id
      const key = cat.slug || cat.id
      result[key] = cat.name
    })
    // Always include "all" option
    result['all'] = 'Tất cả'
    return result
  }

  /**
   * Get categories as object with display order (for public service)
   * Categories are sorted in a specific order for display
   */
  getCategoriesAsObjectWithOrder(categories: Category[]): Record<string, string> {
    // Define display order for categories (by slug)
    const displayOrder = [
      'da-mun-nhay-cam',  // Da mụn nhạy cảm
      'da-dau',            // Da dầu
      'da-kho',            // Da khô
      'ngan-ngua-lao-hoa', // Ngăn ngừa lão hoá
    ]

    const result: Record<string, string> = {}

    // First, add "all" option
    result['all'] = 'Tất cả'

    // Then add categories in the specified order
    displayOrder.forEach(slug => {
      const category = categories.find(cat => cat.slug === slug)
      if (category) {
        result[slug] = category.name
      }
    })

    // Finally, add any remaining categories that weren't in the display order
    categories.forEach(cat => {
      const key = cat.slug || cat.id
      if (!result[key] && key !== 'all') {
        result[key] = cat.name
      }
    })

    return result
  }

  /**
   * Get categories for filter (excluding "all")
   */
  getFilterCategories(categories: Category[]): Category[] {
    return categories.filter(cat => cat.id !== 'all')
  }

  /**
   * Check if category exists
   */
  categoryExists(categories: Category[], categoryId: string): boolean {
    const category = this.getCategoryById(categories, categoryId)
    return !!category
  }
}

// Export singleton instance
export const categoryReadService = new CategoryReadService()
