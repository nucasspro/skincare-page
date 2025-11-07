"use client"

import { categoryService, type Category } from '@/lib/services/category-service'
import { useEffect, useState } from 'react'

/**
 * Hook to fetch categories from public category service
 * Use this in client components (NOT admin components)
 * For admin components, use adminCategoryService directly
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesAsObject, setCategoriesAsObject] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const [cats, catsAsObj] = await Promise.all([
          categoryService.getAllCategories(),
          categoryService.getCategoriesAsObject(),
        ])
        setCategories(cats)
        setCategoriesAsObject(catsAsObj)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'))
        console.error('Error fetching categories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return {
    categories,
    categoriesAsObject,
    loading,
    error,
  }
}

/**
 * Hook to get categories as object only (for backward compatibility)
 */
export function useCategoriesAsObject() {
  const { categoriesAsObject, loading, error } = useCategories()
  return { categories: categoriesAsObject, loading, error }
}
