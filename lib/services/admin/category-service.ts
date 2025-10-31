export interface Category {
  id: string
  name: string
  description?: string
  createdAt: number
  updatedAt: number
}

interface CategoryData {
  name: string
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
