// Product types
export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  needs: string[]
  image: string
  hoverImage: string
  images?: string[] // Array of additional product images
  description?: string
  benefits?: string[]
  ingredients?: string[]
  howToUse?: string
}

/**
 * Generate URL-friendly slug from product name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
}

/**
 * Transform ProductRecord from database to Product interface
 * @param record - ProductRecord from database
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
 * Fetch all products from database
 * Server-side: fetches directly from DB
 * Client-side: fetches from API endpoint
 */
async function fetchAllProductsFromDB(): Promise<Product[]> {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Client-side: fetch from API
    const response = await fetch('/api/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    const productRecords = data.data || []
    return productRecords.map(transformProduct)
  } else {
    // Server-side: fetch directly from DB
    const { productDataService } = await import('@/lib/services/product-data-service')
    const products = await productDataService.getAllProducts()
    return products.map(transformProduct)
  }
}

// Product Service
export class ProductService {
  /**
   * Get all products from database
   */
  static async getAllProducts(): Promise<Product[]> {
    return await fetchAllProductsFromDB()
  }

  /**
   * Get product by ID from database
   */
  static async getProductById(id: string): Promise<Product | null> {
    const products = await fetchAllProductsFromDB()
    return products.find(product => product.id === id) || null
  }

  /**
   * Get product by slug from database
   */
  static async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await fetchAllProductsFromDB()
    return products.find(product => product.slug === slug) || null
  }

  /**
   * Get products by category from database
   */
  static async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await fetchAllProductsFromDB()
    if (category === "all") return products
    return products.filter(product => product.category === category)
  }

  /**
   * Get products by needs from database
   */
  static async getProductsByNeeds(needs: string[]): Promise<Product[]> {
    const products = await fetchAllProductsFromDB()
    if (needs.length === 0) return products
    return products.filter(product =>
      needs.some(need => product.needs.includes(need))
    )
  }

  /**
   * Get products by price range from database
   */
  static async getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
    const products = await fetchAllProductsFromDB()
    return products.filter(product =>
      product.price >= min && product.price <= max
    )
  }

  /**
   * Category filter mapping
   * Maps category slug to filter logic
   */
  static readonly CATEGORY_FILTER_MAP: Record<
    string,
    (product: Product) => boolean
  > = {
    "da-mun-nhay-cam": (p) =>
      // Filter for products suitable for sensitive/acne skin
      p.needs.includes("sensitive") ||
      p.needs.includes("acne") ||
      p.tagline.toLowerCase().includes("mụn") ||
      (p.description?.toLowerCase().includes("mụn") ?? false) ||
      (p.description?.toLowerCase().includes("nhạy cảm") ?? false),

    "ngan-ngua-lao-hoa": (p) =>
      // Filter for anti-aging products
      p.needs.includes("antiAging") ||
      p.tagline.toLowerCase().includes("lão") ||
      (p.description?.toLowerCase().includes("lão") ?? false),

    "da-dau": (p) =>
      // Filter for oily skin products
      p.category === "oily" || p.needs.includes("oily"),

    "da-kho": (p) =>
      // Filter for dry skin products
      p.category === "dry" || p.needs.includes("dry"),
  }

  /**
   * Filter products with multiple criteria
   * @param filters - Filter criteria
   * @param products - Optional products array to filter. If not provided, fetches from database
   */
  static async filterProducts(
    filters: {
      category?: string
      needs?: string[]
      priceRange?: [number, number]
    },
    products?: Product[]
  ): Promise<Product[]> {
    let filtered = products || await fetchAllProductsFromDB()

    // Filter by category
    if (filters.category && filters.category !== "all") {
      const categoryFilter = this.CATEGORY_FILTER_MAP[filters.category]

      if (categoryFilter) {
        // Use mapped filter logic for known category slugs
        filtered = filtered.filter(categoryFilter)
      } else {
        // Standard category filter for other categories
        filtered = filtered.filter((p) => p.category === filters.category)
      }
    }

    // Filter by needs
    if (filters.needs && filters.needs.length > 0) {
      filtered = filtered.filter((p) =>
        filters.needs!.some((need) => p.needs.includes(need))
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter((p) => p.price >= min && p.price <= max)
    }

    return filtered
  }

  /**
   * Sort products
   */
  static sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products]

    switch (sortBy) {
      case "priceLowHigh":
        return sorted.sort((a, b) => a.price - b.price)
      case "priceHighLow":
        return sorted.sort((a, b) => b.price - a.price)
      case "newest":
        return sorted.sort((a, b) => Number(b.id) - Number(a.id))
      case "nameAZ":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }

  /**
   * Search products by name or tagline from database
   */
  static async searchProducts(query: string): Promise<Product[]> {
    const products = await fetchAllProductsFromDB()
    const lowerQuery = query.toLowerCase()
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.tagline.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get featured/best-selling products from database
   */
  static async getFeaturedProducts(limit: number = 3): Promise<Product[]> {
    const products = await fetchAllProductsFromDB()
    return products.slice(0, limit)
  }

  /**
   * Get related products with smart matching algorithm
   * Priority: 1) Same category + same needs, 2) Same category, 3) Same needs, 4) Other products
   * @param productId - ID of the product to find related products for
   * @param limit - Maximum number of related products to return
   * @param products - Optional products array to search in. If not provided, fetches from database
   * @param product - Optional product object. If not provided, will look up by productId
   */
  static async getRelatedProducts(
    productId: string,
    limit: number = 4,
    products?: Product[],
    product?: Product | null
  ): Promise<Product[]> {
    // Use provided product or look it up
    const targetProduct = product || await this.getProductById(productId)
    if (!targetProduct) return []

    // Use provided products array or fetch from database
    const allProducts = products || await fetchAllProductsFromDB()
    const otherProducts = allProducts.filter(p => p.id !== productId)

    if (otherProducts.length === 0) return []

    // Helper function to calculate similarity score
    const calculateScore = (p: Product): number => {
      let score = 0

      // Priority 1: Same category and shared needs (highest priority)
      if (p.category === targetProduct.category) {
        score += 100
        const sharedNeeds = p.needs.filter(need => targetProduct.needs.includes(need))
        score += sharedNeeds.length * 20 // Each shared need adds 20 points
      }

      // Priority 3: Different category but shared needs
      if (p.category !== targetProduct.category) {
        const sharedNeeds = p.needs.filter(need => targetProduct.needs.includes(need))
        score += sharedNeeds.length * 10 // Each shared need adds 10 points
      }

      return score
    }

    // Sort by score (highest first) and take limit
    const sortedProducts = otherProducts
      .map(p => ({ product: p, score: calculateScore(p) }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, limit)

    // If we don't have enough products, fill with any remaining products
    if (sortedProducts.length < limit) {
      const remaining = otherProducts.filter(
        p => !sortedProducts.some(sp => sp.id === p.id)
      )
      sortedProducts.push(...remaining.slice(0, limit - sortedProducts.length))
    }

    return sortedProducts
  }
}

// Export convenience functions (bind to maintain 'this' context)
export const getAllProducts = ProductService.getAllProducts.bind(ProductService)
export const getProductById = ProductService.getProductById.bind(ProductService)
export const getProductBySlug = ProductService.getProductBySlug.bind(ProductService)
export const getProductsByCategory = ProductService.getProductsByCategory.bind(ProductService)
export const getProductsByNeeds = ProductService.getProductsByNeeds.bind(ProductService)
export const getProductsByPriceRange = ProductService.getProductsByPriceRange.bind(ProductService)
export const filterProducts = ProductService.filterProducts.bind(ProductService)
export const sortProducts = ProductService.sortProducts.bind(ProductService)
export const searchProducts = ProductService.searchProducts.bind(ProductService)
export const getFeaturedProducts = ProductService.getFeaturedProducts.bind(ProductService)
export const getRelatedProducts = ProductService.getRelatedProducts.bind(ProductService)
