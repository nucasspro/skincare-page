/**
 * Data Source Interface
 * Abstraction layer để switch giữa Google Sheets và Prisma
 */

export interface ProductRecord {
  id: string
  name: string
  tagline: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  category: string
  needs: string | string[] // String (JSON) hoặc array
  image: string
  hoverImage: string
  description?: string | null
  benefits?: string | string[] | null
  ingredients?: string | string[] | null
  howToUse?: string | null
  createdAt: number
  updatedAt: number
}

export interface CreateProductData {
  name: string
  tagline: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  category: string
  needs: string | string[]
  image: string
  hoverImage: string
  description?: string | null
  benefits?: string | string[] | null
  ingredients?: string | string[] | null
  howToUse?: string | null
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string
}

// ==================== Category ====================
export interface CategoryRecord {
  id: string
  name: string
  description?: string | null
  createdAt: number
  updatedAt: number
}

export interface CreateCategoryData {
  name: string
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
  createdAt: number
  updatedAt: number
}

export interface CreateUserData {
  email: string
  name: string
  phone?: string | null
  address?: string | null
  role?: string
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string
}

// ==================== Order ====================
export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface OrderRecord {
  id: string
  orderNumber: string
  customerName: string
  customerEmail?: string | null
  customerPhone: string
  userId?: string | null
  streetAddress: string
  wardName?: string | null
  districtName?: string | null
  provinceName?: string | null
  status: string
  paymentMethod: string
  items: string // JSON string of OrderItem[]
  total: number
  notes?: string | null
  createdAt: number
  updatedAt: number
}

export interface CreateOrderData {
  orderNumber: string
  customerName: string
  customerEmail?: string | null
  customerPhone: string
  userId?: string | null
  streetAddress: string
  wardName?: string | null
  districtName?: string | null
  provinceName?: string | null
  status?: string
  paymentMethod: string
  items: string | OrderItem[] // JSON string or array
  total: number
  notes?: string | null
}

export interface UpdateOrderData extends Partial<Omit<CreateOrderData, 'items'>> {
  id: string
  items?: string | OrderItem[]
}

// ==================== Review ====================
export interface ReviewRecord {
  id: string
  productId: string
  reviewerName: string
  rating: number
  review: string
  createdAt: number
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

// ==================== Comment ====================
export interface CommentRecord {
  id: string
  productId: string
  userId: string
  userName?: string | null
  userEmail?: string | null
  content: string
  rating: number
  status: string
  createdAt: number
  updatedAt: number
}

export interface CreateCommentData {
  productId: string
  userId: string
  userName?: string | null
  userEmail?: string | null
  content: string
  rating?: number
  status?: string
}

export interface UpdateCommentData extends Partial<CreateCommentData> {
  id: string
}

/**
 * Data Source Interface
 * Tất cả data sources phải implement interface này
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

  // Comments
  getAllComments(): Promise<CommentRecord[]>
  getCommentById(id: string): Promise<CommentRecord | null>
  createComment(data: CreateCommentData): Promise<CommentRecord>
  updateComment(data: UpdateCommentData): Promise<CommentRecord>
  deleteComment(id: string): Promise<boolean>
}
