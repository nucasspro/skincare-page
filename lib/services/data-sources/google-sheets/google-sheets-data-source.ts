/**
 * Google Sheets Data Source Implementation
 */

import type {
    CategoryRecord,
    CommentRecord,
    CreateCategoryData,
    CreateCommentData,
    CreateOrderData,
    CreateProductData,
    CreateReviewData,
    CreateUserData,
    IDataSource,
    OrderRecord,
    ProductRecord,
    ReviewRecord,
    UpdateCategoryData,
    UpdateCommentData,
    UpdateOrderData,
    UpdateProductData,
    UpdateReviewData,
    UpdateUserData,
    UserRecord,
} from '@/lib/services/data-source.interface'
import cuid from 'cuid'
import { googleSheetsService } from './google-sheets-service'

export class GoogleSheetsDataSource implements IDataSource {
  async getAllProducts(): Promise<ProductRecord[]> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }

    const products = await googleSheetsService.readAll('Products')

    return products.map(this.transformProduct)
  }

  async getProductById(id: string): Promise<ProductRecord | null> {
    const products = await this.getAllProducts()
    // Normalize both IDs to string for comparison
    const normalizedId = String(id || '')
    return products.find(p => String(p.id || '') === normalizedId) || null
  }

  async createProduct(data: CreateProductData): Promise<ProductRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }

    const now = Math.floor(Date.now() / 1000)
    const productData: any = {
      id: cuid(), // Generate cuid ID (Prisma format)
      name: data.name,
      tagline: data.tagline,
      price: data.price,
      originalPrice: data.originalPrice || null,
      discount: data.discount || null,
      category: data.category,
      needs: typeof data.needs === 'string' ? data.needs : JSON.stringify(data.needs || []),
      image: data.image,
      hoverImage: data.hoverImage,
      description: data.description || null,
      benefits: typeof data.benefits === 'string' ? data.benefits : JSON.stringify(data.benefits || []),
      ingredients: typeof data.ingredients === 'string' ? data.ingredients : JSON.stringify(data.ingredients || []),
      howToUse: data.howToUse || null,
      createdAt: now,
      updatedAt: now,
    }

    await googleSheetsService.create('Products', productData)
    return this.transformProduct(productData)
  }

  async updateProduct(data: UpdateProductData): Promise<ProductRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }

    const now = Math.floor(Date.now() / 1000)

    // Normalize ID to string
    const normalizedId = String(data.id || '')

    // Get existing product first
    const existing = await this.getProductById(normalizedId)
    if (!existing) {
      throw new Error(`Product not found: ${normalizedId}`)
    }

    // Merge with updates
    const updateData: any = {
      id: normalizedId,
      name: data.name ?? existing.name,
      tagline: data.tagline ?? existing.tagline,
      price: data.price ?? existing.price,
      originalPrice: data.originalPrice ?? existing.originalPrice,
      discount: data.discount ?? existing.discount,
      category: data.category ?? existing.category,
      needs: data.needs !== undefined
        ? (typeof data.needs === 'string' ? data.needs : JSON.stringify(data.needs))
        : existing.needs,
      image: data.image ?? existing.image,
      hoverImage: data.hoverImage ?? existing.hoverImage,
      description: data.description ?? existing.description,
      benefits: data.benefits !== undefined
        ? (typeof data.benefits === 'string' ? data.benefits : JSON.stringify(data.benefits))
        : existing.benefits,
      ingredients: data.ingredients !== undefined
        ? (typeof data.ingredients === 'string' ? data.ingredients : JSON.stringify(data.ingredients))
        : existing.ingredients,
      howToUse: data.howToUse ?? existing.howToUse,
      createdAt: existing.createdAt,
      updatedAt: now,
    }

    await googleSheetsService.update('Products', updateData)
    return this.transformProduct(updateData)
  }

  async deleteProduct(id: string): Promise<boolean> {
    // Google Sheets doesn't support delete in current implementation
    // You can implement soft delete or leave empty
    console.warn('Delete not implemented for Google Sheets')
    return false
  }

  /**
   * Transform Google Sheets product to ProductRecord
   */
  private transformProduct(product: any): ProductRecord {
    return {
      id: String(product.id || ''), // Ensure id is always string
      name: product.name,
      tagline: product.tagline,
      price: parseFloat(product.price) || 0,
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
      discount: product.discount ? parseFloat(product.discount) : null,
      category: product.category,
      needs: product.needs, // Keep as string (JSON)
      image: product.image,
      hoverImage: product.hoverImage,
      description: product.description || null,
      benefits: product.benefits || null, // Keep as string (JSON)
      ingredients: product.ingredients || null, // Keep as string (JSON)
      howToUse: product.howToUse || null,
      createdAt: parseInt(product.createdAt) || 0,
      updatedAt: parseInt(product.updatedAt) || 0,
    }
  }

  // ==================== Categories ====================
  async getAllCategories(): Promise<CategoryRecord[]> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const categories = await googleSheetsService.readAll('Categories')
    return categories.map(this.transformCategory)
  }

  async getCategoryById(id: string): Promise<CategoryRecord | null> {
    const categories = await this.getAllCategories()
    const normalizedId = String(id || '')
    return categories.find(c => String(c.id || '') === normalizedId) || null
  }

  async createCategory(data: CreateCategoryData): Promise<CategoryRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const categoryData: any = {
      id: cuid(),
      name: data.name,
      description: data.description || null,
      createdAt: now,
      updatedAt: now,
    }
    await googleSheetsService.create('Categories', categoryData)
    return this.transformCategory(categoryData)
  }

  async updateCategory(data: UpdateCategoryData): Promise<CategoryRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const normalizedId = String(data.id || '')
    const existing = await this.getCategoryById(normalizedId)
    if (!existing) {
      throw new Error(`Category not found: ${normalizedId}`)
    }
    const updateData: any = {
      id: normalizedId,
      name: data.name ?? existing.name,
      description: data.description ?? existing.description,
      createdAt: existing.createdAt,
      updatedAt: now,
    }
    await googleSheetsService.update('Categories', updateData)
    return this.transformCategory(updateData)
  }

  async deleteCategory(id: string): Promise<boolean> {
    console.warn('Delete not implemented for Google Sheets')
    return false
  }

  private transformCategory(category: any): CategoryRecord {
    return {
      id: String(category.id || ''),
      name: category.name,
      description: category.description || null,
      createdAt: parseInt(category.createdAt) || 0,
      updatedAt: parseInt(category.updatedAt) || 0,
    }
  }

  // ==================== Users ====================
  async getAllUsers(): Promise<UserRecord[]> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const users = await googleSheetsService.readAll('Users')
    return users.map(this.transformUser)
  }

  async getUserById(id: string): Promise<UserRecord | null> {
    const users = await this.getAllUsers()
    const normalizedId = String(id || '')
    return users.find(u => String(u.id || '') === normalizedId) || null
  }

  async createUser(data: CreateUserData): Promise<UserRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const userData: any = {
      id: cuid(),
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      address: data.address || null,
      role: data.role || 'user',
      createdAt: now,
      updatedAt: now,
    }
    await googleSheetsService.create('Users', userData)
    return this.transformUser(userData)
  }

  async updateUser(data: UpdateUserData): Promise<UserRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const normalizedId = String(data.id || '')
    const existing = await this.getUserById(normalizedId)
    if (!existing) {
      throw new Error(`User not found: ${normalizedId}`)
    }
    const updateData: any = {
      id: normalizedId,
      email: data.email ?? existing.email,
      name: data.name ?? existing.name,
      phone: data.phone ?? existing.phone,
      address: data.address ?? existing.address,
      role: data.role ?? existing.role,
      createdAt: existing.createdAt,
      updatedAt: now,
    }
    await googleSheetsService.update('Users', updateData)
    return this.transformUser(updateData)
  }

  async deleteUser(id: string): Promise<boolean> {
    console.warn('Delete not implemented for Google Sheets')
    return false
  }

  private transformUser(user: any): UserRecord {
    return {
      id: String(user.id || ''),
      email: user.email,
      name: user.name,
      phone: user.phone || null,
      address: user.address || null,
      role: user.role || 'user',
      createdAt: parseInt(user.createdAt) || 0,
      updatedAt: parseInt(user.updatedAt) || 0,
    }
  }

  // ==================== Orders ====================
  async getAllOrders(): Promise<OrderRecord[]> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const orders = await googleSheetsService.readAll('Orders')
    return orders.map(this.transformOrder)
  }

  async getOrderById(id: string): Promise<OrderRecord | null> {
    const orders = await this.getAllOrders()
    const normalizedId = String(id || '')
    return orders.find(o => String(o.id || '') === normalizedId) || null
  }

  async createOrder(data: CreateOrderData): Promise<OrderRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const orderData: any = {
      id: cuid(),
      orderNumber: data.orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail || null,
      customerPhone: data.customerPhone,
      userId: data.userId || null,
      streetAddress: data.streetAddress,
      wardName: data.wardName || null,
      districtName: data.districtName || null,
      provinceName: data.provinceName || null,
      status: data.status || 'pending',
      paymentMethod: data.paymentMethod,
      items: typeof data.items === 'string' ? data.items : JSON.stringify(data.items),
      total: data.total,
      notes: data.notes || null,
      createdAt: now,
      updatedAt: now,
    }
    await googleSheetsService.create('Orders', orderData)
    return this.transformOrder(orderData)
  }

  async updateOrder(data: UpdateOrderData): Promise<OrderRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const normalizedId = String(data.id || '')
    const existing = await this.getOrderById(normalizedId)
    if (!existing) {
      throw new Error(`Order not found: ${normalizedId}`)
    }
    const updateData: any = {
      id: normalizedId,
      orderNumber: data.orderNumber ?? existing.orderNumber,
      customerName: data.customerName ?? existing.customerName,
      customerEmail: data.customerEmail ?? existing.customerEmail,
      customerPhone: data.customerPhone ?? existing.customerPhone,
      userId: data.userId ?? existing.userId,
      streetAddress: data.streetAddress ?? existing.streetAddress,
      wardName: data.wardName ?? existing.wardName,
      districtName: data.districtName ?? existing.districtName,
      provinceName: data.provinceName ?? existing.provinceName,
      status: data.status ?? existing.status,
      paymentMethod: data.paymentMethod ?? existing.paymentMethod,
      items: data.items !== undefined
        ? (typeof data.items === 'string' ? data.items : JSON.stringify(data.items))
        : existing.items,
      total: data.total ?? existing.total,
      notes: data.notes ?? existing.notes,
      createdAt: existing.createdAt,
      updatedAt: now,
    }
    await googleSheetsService.update('Orders', updateData)
    return this.transformOrder(updateData)
  }

  async deleteOrder(id: string): Promise<boolean> {
    console.warn('Delete not implemented for Google Sheets')
    return false
  }

  private transformOrder(order: any): OrderRecord {
    return {
      id: String(order.id || ''),
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail || null,
      customerPhone: order.customerPhone,
      userId: order.userId || null,
      streetAddress: order.streetAddress,
      wardName: order.wardName || null,
      districtName: order.districtName || null,
      provinceName: order.provinceName || null,
      status: order.status || 'pending',
      paymentMethod: order.paymentMethod,
      items: order.items, // Keep as string (JSON)
      total: parseFloat(order.total) || 0,
      notes: order.notes || null,
      createdAt: parseInt(order.createdAt) || 0,
      updatedAt: parseInt(order.updatedAt) || 0,
    }
  }

  // ==================== Reviews ====================
  async getAllReviews(): Promise<ReviewRecord[]> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const reviews = await googleSheetsService.readAll('Reviews')
    return reviews.map(this.transformReview)
  }

  async getReviewById(id: string): Promise<ReviewRecord | null> {
    const reviews = await this.getAllReviews()
    const normalizedId = String(id || '')
    return reviews.find(r => String(r.id || '') === normalizedId) || null
  }

  async createReview(data: CreateReviewData): Promise<ReviewRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const reviewData: any = {
      id: cuid(),
      productId: data.productId,
      reviewerName: data.reviewerName,
      rating: data.rating,
      review: data.review,
      createdAt: now,
      updatedAt: now,
    }
    await googleSheetsService.create('Reviews', reviewData)
    return this.transformReview(reviewData)
  }

  async updateReview(data: UpdateReviewData): Promise<ReviewRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const normalizedId = String(data.id || '')
    const existing = await this.getReviewById(normalizedId)
    if (!existing) {
      throw new Error(`Review not found: ${normalizedId}`)
    }
    const updateData: any = {
      id: normalizedId,
      productId: data.productId ?? existing.productId,
      reviewerName: data.reviewerName ?? existing.reviewerName,
      rating: data.rating ?? existing.rating,
      review: data.review ?? existing.review,
      createdAt: existing.createdAt,
      updatedAt: now,
    }
    await googleSheetsService.update('Reviews', updateData)
    return this.transformReview(updateData)
  }

  async deleteReview(id: string): Promise<boolean> {
    console.warn('Delete not implemented for Google Sheets')
    return false
  }

  private transformReview(review: any): ReviewRecord {
    return {
      id: String(review.id || ''),
      productId: review.productId,
      reviewerName: review.reviewerName,
      rating: parseFloat(review.rating) || 0,
      review: review.review,
      createdAt: parseInt(review.createdAt) || 0,
      updatedAt: parseInt(review.updatedAt) || 0,
    }
  }

  // ==================== Comments ====================
  async getAllComments(): Promise<CommentRecord[]> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const comments = await googleSheetsService.readAll('Comments')
    return comments.map(this.transformComment)
  }

  async getCommentById(id: string): Promise<CommentRecord | null> {
    const comments = await this.getAllComments()
    const normalizedId = String(id || '')
    return comments.find(c => String(c.id || '') === normalizedId) || null
  }

  async createComment(data: CreateCommentData): Promise<CommentRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const commentData: any = {
      id: cuid(),
      productId: data.productId,
      userId: data.userId,
      userName: data.userName || null,
      userEmail: data.userEmail || null,
      content: data.content,
      rating: data.rating || 5,
      status: data.status || 'pending',
      createdAt: now,
      updatedAt: now,
    }
    await googleSheetsService.create('Comments', commentData)
    return this.transformComment(commentData)
  }

  async updateComment(data: UpdateCommentData): Promise<CommentRecord> {
    if (!googleSheetsService.isConfigured()) {
      throw new Error('Google Sheets is not configured')
    }
    const now = Math.floor(Date.now() / 1000)
    const normalizedId = String(data.id || '')
    const existing = await this.getCommentById(normalizedId)
    if (!existing) {
      throw new Error(`Comment not found: ${normalizedId}`)
    }
    const updateData: any = {
      id: normalizedId,
      productId: data.productId ?? existing.productId,
      userId: data.userId ?? existing.userId,
      userName: data.userName ?? existing.userName,
      userEmail: data.userEmail ?? existing.userEmail,
      content: data.content ?? existing.content,
      rating: data.rating ?? existing.rating,
      status: data.status ?? existing.status,
      createdAt: existing.createdAt,
      updatedAt: now,
    }
    await googleSheetsService.update('Comments', updateData)
    return this.transformComment(updateData)
  }

  async deleteComment(id: string): Promise<boolean> {
    console.warn('Delete not implemented for Google Sheets')
    return false
  }

  private transformComment(comment: any): CommentRecord {
    return {
      id: String(comment.id || ''),
      productId: comment.productId,
      userId: comment.userId,
      userName: comment.userName || null,
      userEmail: comment.userEmail || null,
      content: comment.content,
      rating: parseInt(comment.rating) || 5,
      status: comment.status || 'pending',
      createdAt: parseInt(comment.createdAt) || 0,
      updatedAt: parseInt(comment.updatedAt) || 0,
    }
  }
}
