/**
 * Category Data Service
 * Service layer với error handling (no caching)
 */

import type { CreateCategoryData, CategoryRecord, UpdateCategoryData } from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

export class CategoryDataService {
  async getAllCategories(): Promise<CategoryRecord[]> {
    try {
      console.log('📥 Fetching categories from data source...')
      const categories = await dataSource.getAllCategories()
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  async getCategoryById(id: string): Promise<CategoryRecord | null> {
    try {
      const category = await dataSource.getCategoryById(id)
      return category
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error)
      throw error
    }
  }

  async createCategory(data: CreateCategoryData): Promise<CategoryRecord> {
    try {
      const category = await dataSource.createCategory(data)
      return category
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  }

  async updateCategory(data: UpdateCategoryData): Promise<CategoryRecord> {
    try {
      const category = await dataSource.updateCategory(data)
      return category
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const result = await dataSource.deleteCategory(id)
      return result
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }
}

export const categoryDataService = new CategoryDataService()
