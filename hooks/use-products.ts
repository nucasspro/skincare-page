/**
 * Custom hook for fetching products from database
 * Provides loading state and error handling
 * Includes caching to prevent duplicate API calls
 */

'use client'

import type { Product } from '@/lib/product-service'
import { transformProductRecord } from '@/lib/utils/product-transformer'
import { useEffect, useState } from 'react'

/**
 * Transform ProductRecord from API to Product interface
 * @param record - ProductRecord from API
 */
function transformProduct(record: any): Product {
  return transformProductRecord(record)
}

// Request deduplication: if multiple components call useProducts() at the same time,
// only one API request will be made and all will wait for the same result
let productsCachePromise: Promise<Product[]> | null = null

async function fetchProductsWithDeduplication(): Promise<Product[]> {
  // If there's already a fetch in progress, wait for it (deduplication)
  if (productsCachePromise) {
    return productsCachePromise
  }

  // Start new fetch
  productsCachePromise = (async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      const productRecords = data.data || []

      // Transform ProductRecord to Product interface
      const transformedProducts = productRecords.map(transformProduct)

      return transformedProducts
    } finally {
      // Clear promise so next call can start a new fetch
      productsCachePromise = null
    }
  })()

  return productsCachePromise
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        const fetchedProducts = await fetchProductsWithDeduplication()
        setProducts(fetchedProducts)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'))
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

/**
 * Custom hook for fetching a single product by ID from database
 * Provides loading state and error handling
 * Uses request deduplication to avoid duplicate API calls
 */
export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)

        // Fetch all products (with deduplication) and find the one we need
        const fetchedProducts = await fetchProductsWithDeduplication()
        const foundProduct = fetchedProducts.find((p: Product) => p.id === productId)
        setProduct(foundProduct || null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'))
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    } else {
      setLoading(false)
    }
  }, [productId])

  return { product, loading, error }
}
