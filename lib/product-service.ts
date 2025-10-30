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
    name: "Tinh Chất Dưỡng Ẩm",
    tagline: "Cấp ẩm sâu cho làn da rạng rỡ",
    price: 48,
    originalPrice: 65,
    discount: 26,
    category: "dry",
    needs: ["hydration", "sensitive"],
    image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    hoverImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    description: "Tinh chất nhẹ nhàng cung cấp độ ẩm sâu và giúp da giữ ẩm lâu dài cho làn da căng mướt, rạng rỡ.",
    benefits: [
      "Cấp ẩm sâu",
      "Tính năng chống lão hóa",
      "Cải thiện kết cấu da",
      "Phù hợp với mọi loại da"
    ],
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Ceramides", "Peptides"],
  },
  {
    id: "2",
    name: "Serum Vitamin C",
    tagline: "Serum làm sáng da và đều màu",
    price: 89,
    category: "normal",
    needs: ["brightening", "antiAging"],
    image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    description: "Serum vitamin C mạnh mẽ giúp làm sáng da, đều màu và bảo vệ chống tác động của môi trường.",
    benefits: [
      "Làm sáng da",
      "Giảm các vệt đen",
      "Bảo vệ chống oxy hóa",
      "Kích thích sản sinh collagen"
    ],
    ingredients: ["Vitamin C (15%)", "Vitamin E", "Ferulic Acid", "Hyaluronic Acid"],
  },
  {
    id: "3",
    name: "Kem Ceramide",
    tagline: "Kem dưỡng phục hồi cho da nhạy cảm",
    price: 75,
    category: "dry",
    needs: ["hydration", "sensitive"],
    image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    hoverImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    description: "Kem giàu dưỡng chất giúp phục hồi hàng rào bảo vệ da và cung cấp độ ẩm bền vững cho da nhạy cảm.",
    benefits: [
      "Phục hồi hàng rào da",
      "Cấp ẩm bền vững",
      "Giảm sự kích ứng",
      "Tăng cường khả năng chống chịu của da"
    ],
    ingredients: ["Ceramides", "Cholesterol", "Fatty Acids", "Niacinamide"],
  },
  {
    id: "4",
    name: "Sữa Rửa Mặt Nhẹ Nhàng",
    tagline: "Sữa rửa mặt dịu nhẹ dùng hàng ngày",
    price: 42,
    category: "normal",
    needs: ["sensitive", "hydration"],
    image: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
    description: "Sữa rửa mặt cân bằng pH loại bỏ tạp chất mà không làm mất dầu tự nhiên của da.",
    benefits: [
      "Làm sạch nhẹ nhàng",
      "Cân bằng độ pH da",
      "Công thức không khô da",
      "Phù hợp với da nhạy cảm"
    ],
    ingredients: ["Glycerin", "Ceramides", "Amino Acids", "Panthenol"],
  },
  {
    id: "5",
    name: "Kem Mắt Phục Hồi",
    tagline: "Kem chăm sóc mắt chống lão hóa",
    price: 95,
    category: "scalp",
    needs: ["antiAging", "brightening"],
    image: "/luxury-eye-cream-jar-minimal-white-background.jpg",
    hoverImage: "/luxury-eye-cream-jar-product-shot-cream-background.jpg",
    description: "Kem mắt cao cấp giúp giảm nếp nhăn, vết chân chim và sưng phù cho vùng mắt trẻ trung, tươi sáng.",
    benefits: [
      "Giảm nếp nhăn",
      "Làm sáng vùng mắt",
      "Giảm sưng phù",
      "Căng chỉ và nâng vùng mắt"
    ],
    ingredients: ["Retinol", "Caffeine", "Peptides", "Vitamin K"],
  },
  {
    id: "6",
    name: "Serum Tái Tạo Rạng Rỡ",
    tagline: "Công thức tiên tiến cho làn da sáng bóng",
    price: 125,
    category: "normal",
    needs: ["brightening", "antiAging", "hydration"],
    image: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    hoverImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    description: "Serum tiên tiến nhất của chúng tôi kết hợp nhiều hoạt chất cho tái tạo da toàn diện.",
    benefits: [
      "Điều trị đa hiệu ứng",
      "Kết quả rõ rệt trong 7 ngày",
      "Được kiểm chứng lâm sàng",
      "Công thức chuyên nghiệp"
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
