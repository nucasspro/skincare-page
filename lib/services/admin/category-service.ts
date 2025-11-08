import { categoryReadService } from '@/lib/services/shared/category-read-service'
import type { Category, CategoryData } from '@/lib/types/category'
import { apiClient } from '@/lib/utils/api-client'

// Re-export for backward compatibility
export type { Category, CategoryData } from '@/lib/types/category'

class AdminCategoryService {
  /**
   * Get all categories
   */
  async getAllCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/api/admin/categories', {
      defaultErrorMessage: 'Failed to fetch categories',
    })
  }

  /**
   * Get category by ID
   * Optimized: Direct API call instead of fetching all categories
   */
  async getCategoryById(id: string): Promise<Category | undefined> {
    try {
      return await apiClient.get<Category>(`/api/admin/categories/${id}`, {
        defaultErrorMessage: 'Failed to fetch category',
      })
    } catch (error) {
      // Return undefined if category not found (404)
      if (error instanceof Error && ((error as any).status === 404 || error.message.includes('404'))) {
        return undefined
      }
      throw error
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
   */
  async getCategoriesAsObject(): Promise<Record<string, string>> {
    const categories = await this.getAllCategories()
    return categoryReadService.getCategoriesAsObject(categories)
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

  /**
   * Create a new category
   */
  async createCategory(categoryData: CategoryData): Promise<Category> {
    return apiClient.post<Category>('/api/admin/categories', categoryData, {
      defaultErrorMessage: 'Failed to create category',
    })
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: string, categoryData: CategoryData): Promise<Category> {
    return apiClient.put<Category>(`/api/admin/categories/${id}`, categoryData, {
      defaultErrorMessage: 'Failed to update category',
    })
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/categories/${id}`, {
      defaultErrorMessage: 'Failed to delete category',
    })
  }
}

export const adminCategoryService = new AdminCategoryService()
