/**
 * Data Source Interface
 * MongoDB-only implementation with composite types support
 */

// Composite types for MongoDB
export interface NeedTag {
  id: string
  name: string
}

export interface Benefit {
  title: string
  description?: string | null
}

export interface Ingredient {
  name: string
  percentage?: number | null
}

export interface ProductRecord {
  id: string
  name: string
  tagline: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  category: string
  needs: string | string[] | NeedTag[] // Support both formats for backward compatibility
  image: string
  hoverImage: string
  description?: string | null
  benefits?: string | string[] | Benefit[] | null
  ingredients?: string | string[] | Ingredient[] | null
  howToUse?: string | null
  createdAt: number // Keep as number for backward compatibility with client
  updatedAt: number
}

export interface CreateProductData {
  name: string
  tagline: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  category: string
  needs: string | string[] | NeedTag[]
  image: string
  hoverImage: string
  description?: string | null
  benefits?: string | string[] | Benefit[] | null
  ingredients?: string | string[] | Ingredient[] | null
  howToUse?: string | null
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string
}

// ==================== Category ====================
export interface CategoryRecord {
  id: string
  name: string
  slug?: string | null // Slug for filtering (e.g., "da-dau", "da-mun-nhay-cam")
  description?: string | null
  createdAt: number // Keep as number for backward compatibility
  updatedAt: number
}

export interface CreateCategoryData {
  name: string
  slug?: string | null // Optional slug for filtering
  description?: string | null
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string
}

// ==================== User ====================
export interface UserRecord {
  id: string
  email: string
  name: string
  phone?: string | null
  address?: string | null
  role: string
  createdAt: number // Keep as number for backward compatibility
  updatedAt: number
}

export interface CreateUserData {
  email: string
  name: string
  phone?: string | null
  address?: string | null
  password?: string | null // Plain password, will be hashed
  role?: string
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string
}

// ==================== Order ====================
export interface Address {
  street: string
  ward?: string | null
  district?: string | null
  province?: string | null
}

export interface OrderItemRecord {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

// Backward compatibility - client web expects this format
export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface OrderRecord {
  id: string
  orderNumber: string
  customerName: string
  customerEmail?: string | null
  customerPhone: string
  userId?: string | null
  // Support both formats: embedded Address or flat fields for backward compatibility
  address?: Address | null
  streetAddress?: string
  wardName?: string | null
  districtName?: string | null
  provinceName?: string | null
  status: string | OrderStatus
  paymentMethod: string
  items: string | OrderItem[] | OrderItemRecord[] // Support multiple formats
  total: number
  notes?: string | null
  createdAt: number // Keep as number for backward compatibility
  updatedAt: number
}

export interface CreateOrderData {
  orderNumber: string
  customerName: string
  customerEmail?: string | null
  customerPhone: string
  userId?: string | null
  // Support both formats
  address?: Address | null
  streetAddress?: string
  wardName?: string | null
  districtName?: string | null
  provinceName?: string | null
  status?: string | OrderStatus
  paymentMethod: string
  items: string | OrderItem[] | OrderItemRecord[]
  total: number
  notes?: string | null
}

export interface UpdateOrderData extends Partial<Omit<CreateOrderData, 'items'>> {
  id: string
  items?: string | OrderItem[] | OrderItemRecord[]
}

// ==================== Review ====================
export interface ReviewRecord {
  id: string
  productId: string
  reviewerName: string
  rating: number
  review: string
  createdAt: number // Keep as number for backward compatibility
  updatedAt: number
}

export interface CreateReviewData {
  productId: string
  reviewerName: string
  rating: number
  review: string
}

export interface UpdateReviewData extends Partial<CreateReviewData> {
  id: string
}

/**
 * Data Source Interface
 * MongoDB-only implementation
 */
export interface IDataSource {
  // Products
  getAllProducts(): Promise<ProductRecord[]>
  getProductById(id: string): Promise<ProductRecord | null>
  createProduct(data: CreateProductData): Promise<ProductRecord>
  updateProduct(data: UpdateProductData): Promise<ProductRecord>
  deleteProduct(id: string): Promise<boolean>

  // Categories
  getAllCategories(): Promise<CategoryRecord[]>
  getCategoryById(id: string): Promise<CategoryRecord | null>
  createCategory(data: CreateCategoryData): Promise<CategoryRecord>
  updateCategory(data: UpdateCategoryData): Promise<CategoryRecord>
  deleteCategory(id: string): Promise<boolean>

  // Users
  getAllUsers(): Promise<UserRecord[]>
  getUserById(id: string): Promise<UserRecord | null>
  createUser(data: CreateUserData): Promise<UserRecord>
  updateUser(data: UpdateUserData): Promise<UserRecord>
  deleteUser(id: string): Promise<boolean>

  // Orders
  getAllOrders(): Promise<OrderRecord[]>
  getOrderById(id: string): Promise<OrderRecord | null>
  createOrder(data: CreateOrderData): Promise<OrderRecord>
  updateOrder(data: UpdateOrderData): Promise<OrderRecord>
  deleteOrder(id: string): Promise<boolean>

  // Reviews
  getAllReviews(): Promise<ReviewRecord[]>
  getReviewById(id: string): Promise<ReviewRecord | null>
  createReview(data: CreateReviewData): Promise<ReviewRecord>
  updateReview(data: UpdateReviewData): Promise<ReviewRecord>
  deleteReview(id: string): Promise<boolean>
}
