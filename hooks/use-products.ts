/**
 * Custom hook for fetching products from database
 * Provides loading state and error handling
 */

'use client'

import type { Product } from '@/lib/product-service'
import { useEffect, useState } from 'react'

/**
 * Generate URL-friendly slug from product name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD') // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}

/**
 * Transform ProductRecord from API to Product interface
 * @param record - ProductRecord from API
 */
function transformProduct(record: any): Product {
  // Parse needs, benefits, ingredients if they are strings
  const needs = typeof record.needs === 'string'
    ? JSON.parse(record.needs || '[]')
    : Array.isArray(record.needs)
    ? record.needs.map((n: any) => typeof n === 'string' ? n : n.id || n.name)
    : []

  const benefits = typeof record.benefits === 'string'
    ? JSON.parse(record.benefits || '[]')
    : Array.isArray(record.benefits)
    ? record.benefits.map((b: any) => typeof b === 'string' ? b : b.title || b.description)
    : []

  const ingredients = typeof record.ingredients === 'string'
    ? JSON.parse(record.ingredients || '[]')
    : Array.isArray(record.ingredients)
    ? record.ingredients.map((i: any) => typeof i === 'string' ? i : i.name)
    : []

  return {
    id: String(record.id || ''),
    slug: generateSlug(record.name), // Generate slug from name
    name: record.name || '',
    tagline: record.tagline || '',
    price: record.price || 0,
    originalPrice: record.originalPrice || undefined,
    discount: record.discount || undefined,
    category: record.category || '', // Category is already a string
    needs: needs,
    image: record.image || '',
    hoverImage: record.hoverImage || '',
    description: record.description || undefined,
    benefits: benefits.length > 0 ? benefits : undefined,
    ingredients: ingredients.length > 0 ? ingredients : undefined,
    howToUse: record.howToUse || undefined,
  }
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

        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        const productRecords = data.data || []

        // Transform ProductRecord to Product interface
        const transformedProducts = productRecords.map(transformProduct)
        setProducts(transformedProducts)
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

        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        const productRecords = data.data || []

        // Transform ProductRecord to Product interface
        const transformedProducts = productRecords.map(transformProduct)

        // Find product by ID
        const foundProduct = transformedProducts.find((p: Product) => p.id === productId)
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
