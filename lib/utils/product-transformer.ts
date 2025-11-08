/**
 * Product Transformation Utilities
 * Shared utilities for transforming product records
 */

import type { Product } from '@/lib/product-service'
import { generateSlug } from '@/lib/utils/slug-util'

/**
 * Parse needs field from various formats
 * Handles: string (JSON), array of strings, array of objects with id/name
 */
export function parseNeedsField(needs: unknown): string[] {
  if (!needs) return []

  if (typeof needs === 'string') {
    try {
      const parsed = JSON.parse(needs || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  if (Array.isArray(needs)) {
    return needs.map((n: any) => {
      if (typeof n === 'string') return n
      if (typeof n === 'object' && n !== null) {
        return n.id || n.name || String(n)
      }
      return String(n)
    })
  }

  return []
}

/**
 * Parse benefits field from various formats
 * Handles: string (JSON), array of strings, array of objects with title/description
 */
export function parseBenefitsField(benefits: unknown): string[] {
  if (!benefits) return []

  if (typeof benefits === 'string') {
    try {
      const parsed = JSON.parse(benefits || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  if (Array.isArray(benefits)) {
    return benefits.map((b: any) => {
      if (typeof b === 'string') return b
      if (typeof b === 'object' && b !== null) {
        return b.title || b.description || String(b)
      }
      return String(b)
    })
  }

  return []
}

/**
 * Parse ingredients field from various formats
 * Handles: string (JSON), array of strings, array of objects with name
 */
export function parseIngredientsField(ingredients: unknown): string[] {
  if (!ingredients) return []

  if (typeof ingredients === 'string') {
    try {
      const parsed = JSON.parse(ingredients || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  if (Array.isArray(ingredients)) {
    return ingredients.map((i: any) => {
      if (typeof i === 'string') return i
      if (typeof i === 'object' && i !== null) {
        return i.name || String(i)
      }
      return String(i)
    })
  }

  return []
}

/**
 * Transform ProductRecord to Product interface
 * This is the main transformation function used across the codebase
 *
 * @param record - ProductRecord from database or API
 * @param options - Optional transformation options
 */
export function transformProductRecord(
  record: any,
  options?: {
    /** Use existing slug if available, otherwise generate from name */
    useExistingSlug?: boolean
    /** Include createdAt field (for admin services) */
    includeCreatedAt?: boolean
  }
): Product {
  const { useExistingSlug = false, includeCreatedAt = false } = options || {}

  const needs = parseNeedsField(record.needs)
  const benefits = parseBenefitsField(record.benefits)
  const ingredients = parseIngredientsField(record.ingredients)

  const product: Product & { createdAt?: number } = {
    id: String(record.id || ''),
    slug: useExistingSlug && record.slug
      ? record.slug
      : generateSlug(record.name),
    name: record.name || '',
    tagline: record.tagline || '',
    price: record.price || 0,
    originalPrice: record.originalPrice !== null && record.originalPrice !== undefined
      ? record.originalPrice
      : undefined,
    discount: record.discount !== null && record.discount !== undefined
      ? record.discount
      : undefined,
    category: record.category || '',
    needs: needs,
    image: record.image || '',
    hoverImage: record.hoverImage || '',
    description: record.description || undefined,
    benefits: benefits.length > 0 ? benefits : undefined,
    ingredients: ingredients.length > 0 ? ingredients : undefined,
    howToUse: record.howToUse || undefined,
  }

  if (includeCreatedAt && record.createdAt !== undefined) {
    (product as Product & { createdAt: number }).createdAt = record.createdAt
  }

  return product
}

/**
 * Transform product for API response
 * Similar to transformProductRecord but optimized for API responses
 * This is used in API routes
 */
export function transformProductForAPI(product: any): any {
  return transformProductRecord(product, { useExistingSlug: true })
}
