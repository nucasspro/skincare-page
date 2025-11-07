/**
 * Prisma Data Source Implementation
 */

import { prisma } from '@/lib/prisma'
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

export class PrismaDataSource implements IDataSource {
  async getAllProducts(): Promise<ProductRecord[]> {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map(this.transformProduct)
  }

  async getProductById(id: string): Promise<ProductRecord | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    return product ? this.transformProduct(product) : null
  }

  async createProduct(data: CreateProductData): Promise<ProductRecord> {
    const now = Math.floor(Date.now() / 1000)

    const product = await prisma.product.create({
      data: {
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
      },
    })

    return this.transformProduct(product)
  }

  async updateProduct(data: UpdateProductData): Promise<ProductRecord> {
    const now = Math.floor(Date.now() / 1000)

    const updateData: any = {
      updatedAt: now,
    }

    if (data.name !== undefined) updateData.name = data.name
    if (data.tagline !== undefined) updateData.tagline = data.tagline
    if (data.price !== undefined) updateData.price = data.price
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice
    if (data.discount !== undefined) updateData.discount = data.discount
    if (data.category !== undefined) updateData.category = data.category
    if (data.needs !== undefined) {
      updateData.needs = typeof data.needs === 'string' ? data.needs : JSON.stringify(data.needs)
    }
    if (data.image !== undefined) updateData.image = data.image
    if (data.hoverImage !== undefined) updateData.hoverImage = data.hoverImage
    if (data.description !== undefined) updateData.description = data.description
    if (data.benefits !== undefined) {
      updateData.benefits = typeof data.benefits === 'string' ? data.benefits : JSON.stringify(data.benefits)
    }
    if (data.ingredients !== undefined) {
      updateData.ingredients = typeof data.ingredients === 'string' ? data.ingredients : JSON.stringify(data.ingredients)
    }
    if (data.howToUse !== undefined) updateData.howToUse = data.howToUse

    const product = await prisma.product.update({
      where: { id: data.id },
      data: updateData,
    })

    return this.transformProduct(product)
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({
        where: { id },
      })
      return true
    } catch (error) {
      console.error('Error deleting product:', error)
      return false
    }
  }

  /**
   * Transform Prisma product to ProductRecord
   */
  private transformProduct(product: any): ProductRecord {
    return {
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      category: product.category,
      needs: product.needs, // Already string from Prisma
      image: product.image,
      hoverImage: product.hoverImage,
      description: product.description,
      benefits: product.benefits, // Already string from Prisma
      ingredients: product.ingredients, // Already string from Prisma
      howToUse: product.howToUse,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }

  // ==================== Categories ====================
  async getAllCategories(): Promise<CategoryRecord[]> {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return categories.map(this.transformCategory)
  }

  async getCategoryById(id: string): Promise<CategoryRecord | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    })
    return category ? this.transformCategory(category) : null
  }

  async createCategory(data: CreateCategoryData): Promise<CategoryRecord> {
    const now = Math.floor(Date.now() / 1000)
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug || null,
        description: data.description || null,
        createdAt: now,
        updatedAt: now,
      },
    })
    return this.transformCategory(category)
  }

  async updateCategory(data: UpdateCategoryData): Promise<CategoryRecord> {
    const now = Math.floor(Date.now() / 1000)
    const updateData: any = { updatedAt: now }
    if (data.name !== undefined) updateData.name = data.name
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.description !== undefined) updateData.description = data.description
    const category = await prisma.category.update({
      where: { id: data.id },
      data: updateData,
    })
    return this.transformCategory(category)
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      await prisma.category.delete({ where: { id } })
      return true
    } catch (error) {
      console.error('Error deleting category:', error)
      return false
    }
  }

  private transformCategory(category: any): CategoryRecord {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug || null,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }

  // ==================== Users ====================
  async getAllUsers(): Promise<UserRecord[]> {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return users.map(this.transformUser)
  }

  async getUserById(id: string): Promise<UserRecord | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user ? this.transformUser(user) : null
  }

  async createUser(data: CreateUserData): Promise<UserRecord> {
    const now = Math.floor(Date.now() / 1000)
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        role: data.role || 'user',
        createdAt: now,
        updatedAt: now,
      },
    })
    return this.transformUser(user)
  }

  async updateUser(data: UpdateUserData): Promise<UserRecord> {
    const now = Math.floor(Date.now() / 1000)
    const updateData: any = { updatedAt: now }
    if (data.email !== undefined) updateData.email = data.email
    if (data.name !== undefined) updateData.name = data.name
    if (data.phone !== undefined) updateData.phone = data.phone
    if (data.address !== undefined) updateData.address = data.address
    if (data.role !== undefined) updateData.role = data.role
    const user = await prisma.user.update({
      where: { id: data.id },
      data: updateData,
    })
    return this.transformUser(user)
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id } })
      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  private transformUser(user: any): UserRecord {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  // ==================== Orders ====================
  async getAllOrders(): Promise<OrderRecord[]> {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return orders.map(this.transformOrder)
  }

  async getOrderById(id: string): Promise<OrderRecord | null> {
    const order = await prisma.order.findUnique({
      where: { id },
    })
    return order ? this.transformOrder(order) : null
  }

  async createOrder(data: CreateOrderData): Promise<OrderRecord> {
    const now = Math.floor(Date.now() / 1000)
    const order = await prisma.order.create({
      data: {
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
      },
    })
    return this.transformOrder(order)
  }

  async updateOrder(data: UpdateOrderData): Promise<OrderRecord> {
    const now = Math.floor(Date.now() / 1000)
    const updateData: any = { updatedAt: now }
    if (data.orderNumber !== undefined) updateData.orderNumber = data.orderNumber
    if (data.customerName !== undefined) updateData.customerName = data.customerName
    if (data.customerEmail !== undefined) updateData.customerEmail = data.customerEmail
    if (data.customerPhone !== undefined) updateData.customerPhone = data.customerPhone
    if (data.userId !== undefined) updateData.userId = data.userId
    if (data.streetAddress !== undefined) updateData.streetAddress = data.streetAddress
    if (data.wardName !== undefined) updateData.wardName = data.wardName
    if (data.districtName !== undefined) updateData.districtName = data.districtName
    if (data.provinceName !== undefined) updateData.provinceName = data.provinceName
    if (data.status !== undefined) updateData.status = data.status
    if (data.paymentMethod !== undefined) updateData.paymentMethod = data.paymentMethod
    if (data.items !== undefined) {
      updateData.items = typeof data.items === 'string' ? data.items : JSON.stringify(data.items)
    }
    if (data.total !== undefined) updateData.total = data.total
    if (data.notes !== undefined) updateData.notes = data.notes
    const order = await prisma.order.update({
      where: { id: data.id },
      data: updateData,
    })
    return this.transformOrder(order)
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      await prisma.order.delete({ where: { id } })
      return true
    } catch (error) {
      console.error('Error deleting order:', error)
      return false
    }
  }

  private transformOrder(order: any): OrderRecord {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      userId: order.userId,
      streetAddress: order.streetAddress,
      wardName: order.wardName,
      districtName: order.districtName,
      provinceName: order.provinceName,
      status: order.status,
      paymentMethod: order.paymentMethod,
      items: order.items, // Already string from Prisma
      total: order.total,
      notes: order.notes,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }

  // ==================== Reviews ====================
  async getAllReviews(): Promise<ReviewRecord[]> {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return reviews.map(this.transformReview)
  }

  async getReviewById(id: string): Promise<ReviewRecord | null> {
    const review = await prisma.review.findUnique({
      where: { id },
    })
    return review ? this.transformReview(review) : null
  }

  async createReview(data: CreateReviewData): Promise<ReviewRecord> {
    const now = Math.floor(Date.now() / 1000)
    const review = await prisma.review.create({
      data: {
        productId: data.productId,
        reviewerName: data.reviewerName,
        rating: data.rating,
        review: data.review,
        createdAt: now,
        updatedAt: now,
      },
    })
    return this.transformReview(review)
  }

  async updateReview(data: UpdateReviewData): Promise<ReviewRecord> {
    const now = Math.floor(Date.now() / 1000)
    const updateData: any = { updatedAt: now }
    if (data.productId !== undefined) updateData.productId = data.productId
    if (data.reviewerName !== undefined) updateData.reviewerName = data.reviewerName
    if (data.rating !== undefined) updateData.rating = data.rating
    if (data.review !== undefined) updateData.review = data.review
    const review = await prisma.review.update({
      where: { id: data.id },
      data: updateData,
    })
    return this.transformReview(review)
  }

  async deleteReview(id: string): Promise<boolean> {
    try {
      await prisma.review.delete({ where: { id } })
      return true
    } catch (error) {
      console.error('Error deleting review:', error)
      return false
    }
  }

  private transformReview(review: any): ReviewRecord {
    return {
      id: review.id,
      productId: review.productId,
      reviewerName: review.reviewerName,
      rating: review.rating,
      review: review.review,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }
  }

  // ==================== Comments ====================
  async getAllComments(): Promise<CommentRecord[]> {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return comments.map(this.transformComment)
  }

  async getCommentById(id: string): Promise<CommentRecord | null> {
    const comment = await prisma.comment.findUnique({
      where: { id },
    })
    return comment ? this.transformComment(comment) : null
  }

  async createComment(data: CreateCommentData): Promise<CommentRecord> {
    const now = Math.floor(Date.now() / 1000)
    const comment = await prisma.comment.create({
      data: {
        productId: data.productId,
        userId: data.userId,
        userName: data.userName || null,
        userEmail: data.userEmail || null,
        content: data.content,
        rating: data.rating || 5,
        status: data.status || 'pending',
        createdAt: now,
        updatedAt: now,
      },
    })
    return this.transformComment(comment)
  }

  async updateComment(data: UpdateCommentData): Promise<CommentRecord> {
    const now = Math.floor(Date.now() / 1000)
    const updateData: any = { updatedAt: now }
    if (data.productId !== undefined) updateData.productId = data.productId
    if (data.userId !== undefined) updateData.userId = data.userId
    if (data.userName !== undefined) updateData.userName = data.userName
    if (data.userEmail !== undefined) updateData.userEmail = data.userEmail
    if (data.content !== undefined) updateData.content = data.content
    if (data.rating !== undefined) updateData.rating = data.rating
    if (data.status !== undefined) updateData.status = data.status
    const comment = await prisma.comment.update({
      where: { id: data.id },
      data: updateData,
    })
    return this.transformComment(comment)
  }

  async deleteComment(id: string): Promise<boolean> {
    try {
      await prisma.comment.delete({ where: { id } })
      return true
    } catch (error) {
      console.error('Error deleting comment:', error)
      return false
    }
  }

  private transformComment(comment: any): CommentRecord {
    return {
      id: comment.id,
      productId: comment.productId,
      userId: comment.userId,
      userName: comment.userName,
      userEmail: comment.userEmail,
      content: comment.content,
      rating: comment.rating,
      status: comment.status,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
  }
}
