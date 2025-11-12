"use client"

import { type Category } from '@/lib/services/category-service'
import { useEffect, useState } from 'react'

// Request deduplication: if multiple components call useCategories() at the same time,
// only one API request will be made and all will wait for the same result
let categoriesCachePromise: Promise<Category[]> | null = null
let categoriesAsObjectCachePromise: Promise<Record<string, string>> | null = null

async function fetchCategoriesWithDeduplication(): Promise<Category[]> {
  // If there's already a fetch in progress, wait for it (deduplication)
  if (categoriesCachePromise) {
    return categoriesCachePromise
  }

  // Start new fetch
  categoriesCachePromise = (async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      return data.data || []
    } finally {
      // Clear promise so next call can start a new fetch
      categoriesCachePromise = null
    }
  })()

  return categoriesCachePromise
}

async function fetchCategoriesAsObjectWithDeduplication(): Promise<Record<string, string>> {
  // If there's already a fetch in progress, wait for it (deduplication)
  if (categoriesAsObjectCachePromise) {
    return categoriesAsObjectCachePromise
  }

  // Start new fetch
  categoriesAsObjectCachePromise = (async () => {
    try {
      const categories = await fetchCategoriesWithDeduplication()

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
    } finally {
      // Clear promise so next call can start a new fetch
      categoriesAsObjectCachePromise = null
    }
  })()

  return categoriesAsObjectCachePromise
}

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
          fetchCategoriesWithDeduplication(),
          fetchCategoriesAsObjectWithDeduplication(),
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
