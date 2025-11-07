export interface Category {
  id: string
  name: string
  slug?: string | null // Slug for filtering (e.g., "da-dau", "da-mun-nhay-cam")
  description?: string
  createdAt: number
  updatedAt: number
}

interface CategoryData {
  name: string
  slug?: string | null // Optional slug for filtering
  description?: string
}

class AdminCategoryService {
  /**
   * Get all categories
   */
  async getAllCategories(): Promise<Category[]> {
    const response = await fetch('/api/admin/categories')
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
   */
  async getCategoriesAsObject(): Promise<Record<string, string>> {
    const categories = await this.getAllCategories()
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

  /**
   * Create a new category
   */
  async createCategory(categoryData: CategoryData): Promise<Category> {
    const response = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to create category' }))
      throw new Error(error.error || 'Failed to create category')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: string, categoryData: CategoryData): Promise<Category> {
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update category' }))
      throw new Error(error.error || 'Failed to update category')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete category' }))
      throw new Error(error.error || 'Failed to delete category')
    }
  }
}

export const adminCategoryService = new AdminCategoryService()
