// Category types
export interface Category {
  id: string
  name: string
}

export interface SkinNeed {
  id: string
  name: string
}

export interface PriceRange {
  min: number
  max: number
  step?: number
}

// Categories data
const CATEGORIES: Category[] = [
  { id: "all", name: "Tất cả" },
  { id: "scalp", name: "Da đầu" },
  { id: "dry", name: "Da khô" },
  { id: "normal", name: "Da thường" },
]

// Skin Needs data
const SKIN_NEEDS: SkinNeed[] = [
  { id: "hydration", name: "Dưỡng ẩm" },
  { id: "brightening", name: "Làm sáng" },
  { id: "antiAging", name: "Chống lão hóa" },
  { id: "sensitive", name: "Da nhạy cảm" },
  { id: "acne", name: "Trị mụn" },
  { id: "pore", name: "Thu nhỏ lỗ chân lông" },
  { id: "oily", name: "Da dầu" },
  { id: "dry", name: "Da khô" },
]

// Default price range
const DEFAULT_PRICE_RANGE: PriceRange = {
  min: 0,
  max: 200,
  step: 5,
}

// Category Service
export class CategoryService {
  /**
   * Get all categories
   */
  static getAllCategories(): Category[] {
    return CATEGORIES
  }

  /**
   * Get category by ID
   */
  static getCategoryById(id: string): Category | undefined {
    return CATEGORIES.find(category => category.id === id)
  }

  /**
   * Get category name
   */
  static getCategoryName(categoryId: string): string {
    const category = this.getCategoryById(categoryId)
    return category?.name || categoryId
  }

  /**
   * Get all skin needs
   */
  static getAllSkinNeeds(): SkinNeed[] {
    return SKIN_NEEDS
  }

  /**
   * Get skin need by ID
   */
  static getSkinNeedById(id: string): SkinNeed | undefined {
    return SKIN_NEEDS.find(need => need.id === id)
  }

  /**
   * Get skin need name
   */
  static getSkinNeedName(needId: string): string {
    const need = this.getSkinNeedById(needId)
    return need?.name || needId
  }

  /**
   * Get default price range
   */
  static getDefaultPriceRange(): PriceRange {
    return DEFAULT_PRICE_RANGE
  }

  /**
   * Get price range options
   */
  static getPriceRanges(): PriceRange[] {
    return [
      { min: 0, max: 50 },
      { min: 50, max: 100 },
      { min: 100, max: 150 },
      { min: 150, max: 200 },
      { min: 200, max: 300 },
    ]
  }

  /**
   * Check if category exists
   */
  static categoryExists(categoryId: string): boolean {
    return CATEGORIES.some(cat => cat.id === categoryId)
  }

  /**
   * Check if skin need exists
   */
  static skinNeedExists(needId: string): boolean {
    return SKIN_NEEDS.some(need => need.id === needId)
  }

  /**
   * Get categories for products page (excluding "all")
   */
  static getFilterCategories(): Category[] {
    return CATEGORIES.filter(cat => cat.id !== "all")
  }

  /**
   * Get categories as object
   */
  static getCategoriesAsObject(): Record<string, string> {
    const result: Record<string, string> = {}
    CATEGORIES.forEach(cat => {
      result[cat.id] = cat.name
    })
    return result
  }

  /**
   * Get skin needs as object
   */
  static getSkinNeedsAsObject(): Record<string, string> {
    const result: Record<string, string> = {}
    SKIN_NEEDS.forEach(need => {
      result[need.id] = need.name
    })
    return result
  }
}

// Export convenience functions (bind to maintain 'this' context)
export const getAllCategories = CategoryService.getAllCategories.bind(CategoryService)
export const getCategoryById = CategoryService.getCategoryById.bind(CategoryService)
export const getCategoryName = CategoryService.getCategoryName.bind(CategoryService)
export const getAllSkinNeeds = CategoryService.getAllSkinNeeds.bind(CategoryService)
export const getSkinNeedById = CategoryService.getSkinNeedById.bind(CategoryService)
export const getSkinNeedName = CategoryService.getSkinNeedName.bind(CategoryService)
export const getDefaultPriceRange = CategoryService.getDefaultPriceRange.bind(CategoryService)
export const getPriceRanges = CategoryService.getPriceRanges.bind(CategoryService)
export const categoryExists = CategoryService.categoryExists.bind(CategoryService)
export const skinNeedExists = CategoryService.skinNeedExists.bind(CategoryService)
export const getFilterCategories = CategoryService.getFilterCategories.bind(CategoryService)
export const getCategoriesAsObject = CategoryService.getCategoriesAsObject.bind(CategoryService)
export const getSkinNeedsAsObject = CategoryService.getSkinNeedsAsObject.bind(CategoryService)
