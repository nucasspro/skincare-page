/**
 * Public Category Service
 * Read-only service for client-side components
 * Does NOT expose admin functions (create, update, delete)
 */

export interface Category {
  id: string
  name: string
  slug?: string | null // Slug for filtering (e.g., "da-dau", "da-mun-nhay-cam")
  description?: string
  createdAt: number
  updatedAt: number
}

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
   */
  async getCategoryById(id: string): Promise<Category | undefined> {
    const categories = await this.getAllCategories()
    return categories.find(cat => cat.id === id)
  }

  /**
   * Get category name by ID
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
  async getFilterCategories(): Promise<Category[]> {
    const categories = await this.getAllCategories()
    return categories.filter(cat => cat.id !== 'all')
  }

  /**
   * Check if category exists
   */
  async categoryExists(categoryId: string): Promise<boolean> {
    const category = await this.getCategoryById(categoryId)
    return !!category
  }
}

export const categoryService = new CategoryService()
