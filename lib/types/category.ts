/**
 * Category Type Definitions
 * Shared types for categories across the application
 */

export interface Category {
  id: string
  name: string
  slug?: string | null // Slug for filtering (e.g., "da-dau", "da-mun-nhay-cam")
  description?: string
  createdAt: number
  updatedAt: number
}

export interface CategoryData {
  name: string
  slug?: string | null // Optional slug for filtering
  description?: string
}
