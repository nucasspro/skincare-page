// Product types
export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  needs: string[]
  image: string
  hoverImage: string
  description?: string
  benefits?: string[]
  ingredients?: string[]
  howToUse?: string
}

// Mock product data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hydrating Essence",
    tagline: "Deep hydration for glowing skin",
    price: 48,
    originalPrice: 65,
    discount: 26,
    category: "serums",
    needs: ["hydration", "sensitive"],
    image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    hoverImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    description: "A lightweight essence that delivers deep hydration and helps skin retain moisture for a plump, radiant complexion.",
    benefits: [
      "Deep hydration",
      "Anti-aging properties",
      "Improves skin texture",
      "Suitable for all skin types"
    ],
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Ceramides", "Peptides"],
  },
  {
    id: "2",
    name: "Vitamin C Serum",
    tagline: "Brightening serum for radiant skin",
    price: 89,
    category: "serums",
    needs: ["brightening", "antiAging"],
    image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    description: "A potent vitamin C serum that brightens, evens skin tone, and protects against environmental damage.",
    benefits: [
      "Brightens skin tone",
      "Reduces dark spots",
      "Antioxidant protection",
      "Boosts collagen production"
    ],
    ingredients: ["Vitamin C (15%)", "Vitamin E", "Ferulic Acid", "Hyaluronic Acid"],
  },
  {
    id: "3",
    name: "Ceramide Cream",
    tagline: "Restorative moisturizer for sensitive skin",
    price: 75,
    category: "moisturizers",
    needs: ["hydration", "sensitive"],
    image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    hoverImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    description: "A rich, nourishing cream that restores the skin barrier and provides long-lasting hydration for sensitive skin.",
    benefits: [
      "Restores skin barrier",
      "Long-lasting hydration",
      "Reduces redness",
      "Strengthens skin resilience"
    ],
    ingredients: ["Ceramides", "Cholesterol", "Fatty Acids", "Niacinamide"],
  },
  {
    id: "4",
    name: "Gentle Cleanser",
    tagline: "Mild cleanser for daily use",
    price: 42,
    category: "cleansers",
    needs: ["sensitive", "hydration"],
    image: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
    description: "A gentle, pH-balanced cleanser that removes impurities without stripping the skin of its natural oils.",
    benefits: [
      "Gentle cleansing",
      "Maintains skin pH",
      "Non-stripping formula",
      "Suitable for sensitive skin"
    ],
    ingredients: ["Glycerin", "Ceramides", "Amino Acids", "Panthenol"],
  },
  {
    id: "5",
    name: "Eye Renewal Cream",
    tagline: "Anti-aging treatment for delicate eye area",
    price: 95,
    category: "eyeCare",
    needs: ["antiAging", "brightening"],
    image: "/luxury-eye-cream-jar-minimal-white-background.jpg",
    hoverImage: "/luxury-eye-cream-jar-product-shot-cream-background.jpg",
    description: "A luxurious eye cream that targets fine lines, dark circles, and puffiness for a youthful, refreshed look.",
    benefits: [
      "Reduces fine lines",
      "Diminishes dark circles",
      "Reduces puffiness",
      "Firms and lifts"
    ],
    ingredients: ["Retinol", "Caffeine", "Peptides", "Vitamin K"],
  },
  {
    id: "6",
    name: "Radiance Renewal Serum",
    tagline: "Advanced formula for luminous skin",
    price: 125,
    category: "serums",
    needs: ["brightening", "antiAging", "hydration"],
    image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    description: "Our most advanced serum combining multiple active ingredients for comprehensive skin rejuvenation.",
    benefits: [
      "Multi-targeted treatment",
      "Visible results in 7 days",
      "Clinically tested",
      "Professional grade formula"
    ],
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Peptides", "Botanical Extracts"],
  },
]

// Product Service
export class ProductService {
  /**
   * Get all products
   */
  static getAllProducts(): Product[] {
    return MOCK_PRODUCTS
  }

  /**
   * Get product by ID
   */
  static getProductById(id: string): Product | undefined {
    return MOCK_PRODUCTS.find(product => product.id === id)
  }

  /**
   * Get products by category
   */
  static getProductsByCategory(category: string): Product[] {
    if (category === "all") return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter(product => product.category === category)
  }

  /**
   * Get products by needs
   */
  static getProductsByNeeds(needs: string[]): Product[] {
    if (needs.length === 0) return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter(product =>
      needs.some(need => product.needs.includes(need))
    )
  }

  /**
   * Get products by price range
   */
  static getProductsByPriceRange(min: number, max: number): Product[] {
    return MOCK_PRODUCTS.filter(product =>
      product.price >= min && product.price <= max
    )
  }

  /**
   * Filter products with multiple criteria
   */
  static filterProducts(filters: {
    category?: string
    needs?: string[]
    priceRange?: [number, number]
  }): Product[] {
    let filtered = MOCK_PRODUCTS

    // Filter by category
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Filter by needs
    if (filters.needs && filters.needs.length > 0) {
      filtered = filtered.filter(p =>
        filters.needs!.some(need => p.needs.includes(need))
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter(p => p.price >= min && p.price <= max)
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
   * Search products by name or tagline
   */
  static searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase()
    return MOCK_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.tagline.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get featured/best-selling products (first 4)
   */
  static getFeaturedProducts(limit: number = 4): Product[] {
    return MOCK_PRODUCTS.slice(0, limit)
  }

  /**
   * Get related products (same category, excluding current)
   */
  static getRelatedProducts(productId: string, limit: number = 3): Product[] {
    const product = this.getProductById(productId)
    if (!product) return []

    return MOCK_PRODUCTS
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit)
  }
}

// Export convenience functions (bind to maintain 'this' context)
export const getAllProducts = ProductService.getAllProducts.bind(ProductService)
export const getProductById = ProductService.getProductById.bind(ProductService)
export const getProductsByCategory = ProductService.getProductsByCategory.bind(ProductService)
export const getProductsByNeeds = ProductService.getProductsByNeeds.bind(ProductService)
export const getProductsByPriceRange = ProductService.getProductsByPriceRange.bind(ProductService)
export const filterProducts = ProductService.filterProducts.bind(ProductService)
export const sortProducts = ProductService.sortProducts.bind(ProductService)
export const searchProducts = ProductService.searchProducts.bind(ProductService)
export const getFeaturedProducts = ProductService.getFeaturedProducts.bind(ProductService)
export const getRelatedProducts = ProductService.getRelatedProducts.bind(ProductService)
