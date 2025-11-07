import type { Product } from '@/lib/product-service'
import { productDataService } from '@/lib/services/product-data-service'

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

/**
 * Fetch product by slug from database
 * Server-side function for use in server components
 */
export async function getProductBySlugFromDB(slug: string): Promise<Product | null> {
  try {
    // Fetch all products
    const products = await productDataService.getAllProducts()

    console.log(`[getProductBySlugFromDB] Looking for slug: "${slug}"`)
    console.log(`[getProductBySlugFromDB] Found ${products.length} products in DB`)

    // Transform products and find by slug
    const transformedProducts = products.map((record: any) => {
      const transformed = transformProduct(record)
      console.log(`[getProductBySlugFromDB] Product: "${transformed.name}" -> slug: "${transformed.slug}"`)
      return transformed
    })

    // Find product by slug
    const product = transformedProducts.find(p => p.slug === slug)

    if (product) {
      console.log(`[getProductBySlugFromDB] ✅ Found product: "${product.name}"`)
    } else {
      console.log(`[getProductBySlugFromDB] ❌ Product not found. Available slugs:`, transformedProducts.map(p => p.slug))
    }

    return product || null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}
