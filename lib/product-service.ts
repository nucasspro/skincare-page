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

// Mock product data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "new",
    slug: "bright-matte-sunscreen",
    name: "Bright Matte Sunscreen",
    tagline: "Bảo vệ và kiểm soát dầu hiệu quả",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "oily",
    needs: ["oily", "uv-protection", "pore"],
    image: "/image-product/kcnxanhduong/1.png",
    hoverImage: "/image-product/kcnxanhduong/8.png",
    images: [
      "/image-product/kcnxanhduong/1.png",
      "/image-product/kcnxanhduong/8.png",
      "/image-product/kcnxanhduong/6.png",
      "/image-product/kcnxanhduong/7.png",
      "/image-product/kcnxanhduong/ANHWEB-3.png"
    ],
    description: "Kem chống nắng kiểm soát dầu hiệu quả, mang lại làn da matte mịn màng và bảo vệ khỏi tia UV với SPF 50+ và PA++++.",
    benefits: [
      "Với công nghệ Booster kèm 4 màng lọc có kích thước hạt nhỏ thông minh tạo lớp bảo vệ bền vững, KCN Cellic Bright Matte kiểm soát và bảo vệ da khỏi tác động tia UVA, UVB và ánh sáng xanh trong suốt 8 giờ. Bổ sung thành phần PDRN cùng chiết xuất hoa kim ngân và công nghệ MicroBiome hỗ trợ cân bằng hệ vi sinh, làm dịu và giảm kích ứng khi tiếp xúc ánh nắng.",
      "Chất kem mỏng nhẹ, thấm nhanh vào da, KCN Cellic Bright Matte tạo lớp bảo vệ tự nhiên, thoáng, mịn, không gây bít tắc lỗ chân lông cho da. KCN Cellic Bright Matte phù hợp với làn da hỗn hợp và hỗn hợp thiên dầu."
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Matte Powder", "Sebum Control", "PDRN"],
  },
  {
    id: "0",
    slug: "cellic-calm-defense-sunscreen",
    name: "Cellic Calm Defense Sunscreen",
    tagline: "Bảo vệ và làm dịu cho da mụn",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "normal",
    needs: ["sensitive", "hydration", "acne"],
    image: "/image-product/kcnxanhlacay/18.png",
    hoverImage: "/image-product/kcnxanhlacay/19.png",
    images: [
      "/image-product/kcnxanhlacay/18.png",
      "/image-product/kcnxanhlacay/19.png",
      "/image-product/kcnxanhlacay/20.png",
      "/image-product/kcnxanhlacay/30.png",
      "/image-product/kcnxanhlacay/ANHWEB-5.png"
    ],
    description: "Kem chống nắng bảo vệ và làm dịu da mụn, phù hợp cho làn da nhạy cảm.",
    benefits: [
      "Bảo vệ khỏi tia UV",
      "Làm dịu da mụn",
      "Công thức không gây bít tắc",
      "Phù hợp với da nhạy cảm"
    ],
    ingredients: ["Zinc Oxide", "Niacinamide", "Calming Extracts", "Hyaluronic Acid"],
  },
  {
    id: "00",
    slug: "cellic-dew-shield-sunscreen",
    name: "Cellic Dew Shield Sunscreen",
    tagline: "Lá chắn ẩm mượt cho da khô",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "dry",
    needs: ["dry", "hydration", "uv-protection"],
    image: "/image-product/kcnmauvang/ANHWEBSTE-2.png",
    hoverImage: "/image-product/kcnmauvang/14.png",
    images: [
      "/image-product/kcnmauvang/ANHWEBSTE-2.png",
      "/image-product/kcnmauvang/14.png",
      "/image-product/kcnmauvang/32.png",
      "/image-product/kcnmauvang/ANHWEB-5.png",
      "/image-product/kcnmauvang/ANHWEB-6.png"
    ],
    description: "Kem chống nắng cấp ẩm sâu, mang lại lớp nền ẩm mượt, bảo vệ da khô khỏi tác hại của tia UV với SPF 50+ và PA++++.",
    benefits: [
      "Bảo vệ da khỏi tia UVA/UVB",
      "Cấp ẩm sâu, dưỡng ẩm lâu dài",
      "Làm mềm mịn da khô",
      "Phù hợp cho da khô và thiếu ẩm"
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Hyaluronic Acid", "Glycerin", "Ceramides", "PDRN"],
  },
  {
    id: "000",
    slug: "cellic-right-match-lumi-sunscreen",
    name: "Cellic Right Match Lumi Sunscreen",
    tagline: "Bảo vệ và hiệu chỉnh màu da tối ưu",
    price: 219000,
    originalPrice: 350000,
    discount: 37,
    category: "normal",
    needs: ["brightening", "uv-protection", "color-correction"],
    image: "/image-product/kcnmautim/16.png",
    hoverImage: "/image-product/kcnmautim/15.png",
    images: [
      "/image-product/kcnmautim/16.png",
      "/image-product/kcnmautim/15.png",
      "/image-product/kcnmautim/17.png",
      "/image-product/kcnmautim/31.png",
      "/image-product/kcnmautim/ANHWEB-5.png"
    ],
    description: "Kem chống nắng với công nghệ hiệu chỉnh màu da thông minh, mang lại làn da sáng đều màu và bảo vệ khỏi tia UV với SPF 50+ và PA++++.",
    benefits: [
      "Bảo vệ da khỏi tia UVA/UVB",
      "Hiệu chỉnh và làm đều màu da",
      "Làm sáng da tự nhiên",
      "Phù hợp cho mọi loại da"
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide", "Vitamin C", "Light Reflecting Particles", "PDRN"],
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
   * Get product by slug
   */
  static getProductBySlug(slug: string): Product | undefined {
    return MOCK_PRODUCTS.find(product => product.slug === slug)
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
      if (filters.category === "da-mun-nhay-cam") {
        // Filter for products that are suitable for sensitive/acne skin
        filtered = filtered.filter(p => 
          (p.needs.includes("sensitive") || p.needs.includes("acne")) ||
          p.tagline.toLowerCase().includes("mụn") ||
          p.description?.toLowerCase().includes("mụn") ||
          p.description?.toLowerCase().includes("nhạy cảm")
        )
      } else if (filters.category === "ngan-ngua-lao-hoa") {
        // Filter for anti-aging products
        filtered = filtered.filter(p => 
          p.needs.includes("antiAging") ||
          p.tagline.toLowerCase().includes("lão") ||
          p.description?.toLowerCase().includes("lão")
        )
      } else if (filters.category === "da-dau") {
        // Filter for oily skin products
        filtered = filtered.filter(p => 
          p.category === "oily" || p.needs.includes("oily")
        )
      } else if (filters.category === "da-kho") {
        // Filter for dry skin products
        filtered = filtered.filter(p => 
          p.category === "dry" || p.needs.includes("dry")
        )
      } else {
        // Standard category filter
        filtered = filtered.filter(p => p.category === filters.category)
      }
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
   * Get featured/best-selling products
   */
  static getFeaturedProducts(limit: number = 3): Product[] {
    return MOCK_PRODUCTS.slice(0, limit)
  }

  /**
   * Get related products with smart matching algorithm
   * Priority: 1) Same category + same needs, 2) Same category, 3) Same needs, 4) Other products
   */
  static getRelatedProducts(productId: string, limit: number = 4): Product[] {
    const product = this.getProductById(productId)
    if (!product) return []

    const otherProducts = MOCK_PRODUCTS.filter(p => p.id !== productId)
    
    if (otherProducts.length === 0) return []

    // Helper function to calculate similarity score
    const calculateScore = (p: Product): number => {
      let score = 0
      
      // Priority 1: Same category and shared needs (highest priority)
      if (p.category === product.category) {
        score += 100
        const sharedNeeds = p.needs.filter(need => product.needs.includes(need))
        score += sharedNeeds.length * 20 // Each shared need adds 20 points
      }
      
      // Priority 2: Same category but different needs
      if (p.category === product.category) {
        // Already added above, but ensure we have base score
      }
      
      // Priority 3: Different category but shared needs
      if (p.category !== product.category) {
        const sharedNeeds = p.needs.filter(need => product.needs.includes(need))
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
