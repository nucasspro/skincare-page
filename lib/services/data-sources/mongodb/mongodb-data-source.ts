/**
 * MongoDB Data Source Implementation
 * MongoDB-only with composite types, DateTime, and enum support
 */

import type {
  Address,
  ArticleQueryOptions,
  ArticleRecord,
  Benefit,
  CategoryRecord,
  CreateArticleData,
  CreateCategoryData,
  CreateOrderData,
  CreateProductData,
  CreateReviewData,
  CreateUserData,
  IDataSource,
  Ingredient,
  NeedTag,
  OrderItemRecord,
  OrderRecord,
  ProductRecord,
  ReviewRecord,
  UpdateArticleData,
  UpdateCategoryData,
  UpdateOrderData,
  UpdateProductData,
  UpdateReviewData,
  UpdateUserData,
  UserRecord
} from '@/lib/services/data-source.interface'
import bcrypt from 'bcryptjs'
import { Collection, Db, MongoClient, ObjectId } from 'mongodb'

// Global MongoDB client để reuse connection
const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined
  mongoDb: Db | undefined
  mongoUri: string | undefined
  mongoDbName: string | undefined
}

/**
 * Get MongoDB client (singleton)
 */
function getMongoClient(): MongoClient {
  const MONGODB_URI = process.env.MONGODB_URI || globalForMongo.mongoUri || ''

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in environment variables')
  }

  if (globalForMongo.mongoClient && globalForMongo.mongoUri === MONGODB_URI) {
    return globalForMongo.mongoClient
  }

  const client = new MongoClient(MONGODB_URI)
  globalForMongo.mongoClient = client
  globalForMongo.mongoUri = MONGODB_URI

  return client
}

/**
 * Get MongoDB database instance
 */
export async function getDb(): Promise<Db> {
  const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || globalForMongo.mongoDbName || 'cellic_vn'

  if (globalForMongo.mongoDb && globalForMongo.mongoDbName === MONGODB_DB_NAME) {
    return globalForMongo.mongoDb
  }

  const client = getMongoClient()
  await client.connect()
  const db = client.db(MONGODB_DB_NAME)
  globalForMongo.mongoDb = db
  globalForMongo.mongoDbName = MONGODB_DB_NAME

  return db
}

/**
 * Get collection helper
 */
async function getCollection<T extends Record<string, any> = any>(
  name: string
): Promise<Collection<T>> {
  const db = await getDb()
  return db.collection<T>(name)
}

/**
 * Convert DateTime to Unix timestamp (for backward compatibility with client)
 */
function dateTimeToUnix(dateTime: Date | string | number | undefined | null): number {
  if (!dateTime) return 0
  if (typeof dateTime === 'number') return dateTime
  if (typeof dateTime === 'string') return Math.floor(new Date(dateTime).getTime() / 1000)
  return Math.floor(dateTime.getTime() / 1000)
}

function unixToDate(value: number | string | Date | null | undefined): Date | null {
  if (value === undefined || value === null) return null
  if (value instanceof Date) return value
  if (typeof value === 'number') {
    return value > 1_000_000_000_000 ? new Date(value) : new Date(value * 1000)
  }
  if (typeof value === 'string') {
    const numeric = Number(value)
    if (!Number.isNaN(numeric)) {
      return numeric > 1_000_000_000_000 ? new Date(numeric) : new Date(numeric * 1000)
    }
    const parsed = Date.parse(value)
    return Number.isNaN(parsed) ? null : new Date(parsed)
  }
  return null
}

/**
 * Convert composite types array to string/array format (for backward compatibility)
 */
function needsToClientFormat(needs: any): string | string[] {
  if (!needs) return []
  if (typeof needs === 'string') return needs
  if (Array.isArray(needs)) {
    // Check if it's an array of NeedTag objects
    if (needs.length > 0 && typeof needs[0] === 'object' && 'name' in needs[0]) {
      return needs.map((n: NeedTag) => n.name)
    }
    // It's already an array of strings
    return needs
  }
  return []
}

function benefitsToClientFormat(benefits: any): string | string[] | null {
  if (!benefits) return null
  if (typeof benefits === 'string') return benefits
  if (Array.isArray(benefits)) {
    // Check if it's an array of Benefit objects
    if (benefits.length > 0 && typeof benefits[0] === 'object' && 'title' in benefits[0]) {
      return benefits.map((b: Benefit) => b.title)
    }
    return benefits
  }
  return null
}

function ingredientsToClientFormat(ingredients: any): string | string[] | null {
  if (!ingredients) return null
  if (typeof ingredients === 'string') return ingredients
  if (Array.isArray(ingredients)) {
    // Check if it's an array of Ingredient objects
    if (ingredients.length > 0 && typeof ingredients[0] === 'object' && 'name' in ingredients[0]) {
      return ingredients.map((i: Ingredient) => i.name)
    }
    return ingredients
  }
  return null
}

export class MongoDataSource implements IDataSource {
  // ==================== Private Helper Methods ====================

  /**
   * Build MongoDB filter for ID queries, handling ObjectId conversion
   * Tries ObjectId first, then falls back to string _id and id field
   */
  private buildIdFilter(id: string): any {
    try {
      if (ObjectId.isValid(id)) {
        return { _id: new ObjectId(id) }
      }
    } catch (error) {
      // Ignore error and try other methods
    }
    return { $or: [{ _id: id }, { id }] }
  }

  /**
   * Update entity and fetch updated document
   * Handles ObjectId conversion and ensures document is found
   */
  private async updateAndFetch<T>(
    collection: Collection<any>,
    id: string,
    updateData: any,
    transformFn: (doc: any) => T,
    entityName: string
  ): Promise<T> {
    const filter = this.buildIdFilter(id)

    // Check if entity exists before updating
    const existing = await collection.findOne(filter)
    if (!existing) {
      throw new Error(`${entityName} with id ${id} not found`)
    }

    // Update the document
    const updateResult = await collection.updateOne(filter, { $set: updateData })

    if (updateResult.matchedCount === 0) {
      throw new Error(`${entityName} with id ${id} not found`)
    }

    // Fetch updated document
    const updated = await collection.findOne(filter)
    if (!updated) {
      throw new Error(`${entityName} with id ${id} not found after update`)
    }

    return transformFn(updated)
  }

  private buildArticleFilter(options: ArticleQueryOptions = {}): Record<string, any> {
    const filter: Record<string, any> = {
      isDeleted: { $ne: true },
    }

    if (!options.includeUnpublished) {
      filter.isPublished = true
    }

    if (options.category) {
      filter.category = options.category
    }

    if (typeof options.isFeatured === 'boolean') {
      filter.isFeatured = options.isFeatured
    }

    if (options.excludeSlug) {
      filter.slug = { $ne: options.excludeSlug }
    }

    if (options.search) {
      const regex = new RegExp(options.search, 'i')
      filter.$or = [
        { title: regex },
        { excerpt: regex },
        { content: regex },
      ]
    }

    return filter
  }

  // ==================== Articles ====================
  async getAllArticles(options: ArticleQueryOptions = {}): Promise<ArticleRecord[]> {
    const collection = await getCollection<any>('articles')
    const filter = this.buildArticleFilter(options)
    const cursor = collection
      .find(filter)
      .sort({ isFeatured: -1, publishedAt: -1, createdAt: -1 })

    if (options.skip) {
      cursor.skip(options.skip)
    }

    if (options.limit) {
      cursor.limit(options.limit)
    }

    const articles = await cursor.toArray()
    return articles.map((article: any) => this.transformArticle(article))
  }

  async countArticles(options: ArticleQueryOptions = {}): Promise<number> {
    const collection = await getCollection<any>('articles')
    const filter = this.buildArticleFilter(options)
    return collection.countDocuments(filter)
  }

  async getArticleById(id: string): Promise<ArticleRecord | null> {
    const collection = await getCollection<any>('articles')
    const filter = this.buildIdFilter(id)
    const article = await collection.findOne(filter)
    return article ? this.transformArticle(article) : null
  }

  async getArticleBySlug(slug: string): Promise<ArticleRecord | null> {
    const collection = await getCollection<any>('articles')
    const article = await collection.findOne({ slug, isDeleted: { $ne: true } })
    return article ? this.transformArticle(article) : null
  }

  async createArticle(data: CreateArticleData): Promise<ArticleRecord> {
    const now = new Date()
    const article: any = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt ?? null,
      featuredImage: data.featuredImage ?? null,
      category: data.category,
      isFeatured: Boolean(data.isFeatured),
      author: data.author ?? null,
      publishedAt: unixToDate(data.publishedAt),
      isPublished: Boolean(data.isPublished),
      createdBy: data.createdBy || null,
      updatedBy: data.updatedBy || null,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
      deletedAt: null,
    }

    const collection = await getCollection<any>('articles')
    const result = await collection.insertOne(article)
    const inserted = await collection.findOne({ _id: result.insertedId })
    return this.transformArticle(inserted!)
  }

  async updateArticle(data: UpdateArticleData): Promise<ArticleRecord> {
    const updateData: any = { updatedAt: new Date() }

    if (data.title !== undefined) updateData.title = data.title
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.content !== undefined) updateData.content = data.content
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt ?? null
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage ?? null
    if (data.category !== undefined) updateData.category = data.category
    if (typeof data.isFeatured === 'boolean') updateData.isFeatured = data.isFeatured
    if (data.author !== undefined) updateData.author = data.author ?? null
    if ('publishedAt' in data) updateData.publishedAt = unixToDate(data.publishedAt)
    if (typeof data.isPublished === 'boolean') updateData.isPublished = data.isPublished
    if (data.updatedBy !== undefined) updateData.updatedBy = data.updatedBy ?? null

    const collection = await getCollection<any>('articles')
    return this.updateAndFetch(collection, data.id, updateData, (doc) => this.transformArticle(doc), 'Article')
  }

  async deleteArticle(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<any>('articles')
      const filter = this.buildIdFilter(id)
      const updateData = {
        isDeleted: true,
        deletedAt: Math.floor(Date.now() / 1000),
        updatedAt: new Date(),
      }
      const result = await collection.updateOne(filter, { $set: updateData })
      return result.matchedCount > 0
    } catch (error) {
      console.error('Error deleting article:', error)
      return false
    }
  }

  private transformArticle(article: any): ArticleRecord {
    return {
      id: article._id ? String(article._id) : article.id,
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt ?? null,
      featuredImage: article.featuredImage ?? null,
      category: article.category,
      isFeatured: Boolean(article.isFeatured),
      author: article.author ?? null,
      publishedAt: dateTimeToUnix(article.publishedAt),
      isPublished: Boolean(article.isPublished),
      createdBy: article.createdBy ? String(article.createdBy) : null,
      updatedBy: article.updatedBy ? String(article.updatedBy) : null,
      createdAt: dateTimeToUnix(article.createdAt),
      updatedAt: dateTimeToUnix(article.updatedAt),
    }
  }

  // ==================== Products ====================
  async getAllProducts(): Promise<ProductRecord[]> {
    const collection = await getCollection<any>('products')
    const products = await collection.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).toArray()
    return products.map(this.transformProduct)
  }

  async getProductById(id: string): Promise<ProductRecord | null> {
    const collection = await getCollection<any>('products')
    let product = await collection.findOne({ _id: id })
    if (!product) {
      product = await collection.findOne({ id })
    }
    return product ? this.transformProduct(product) : null
  }

  async createProduct(data: CreateProductData): Promise<ProductRecord> {
    // Store composite types as arrays in MongoDB
    const needsArray = Array.isArray(data.needs)
      ? data.needs.map((n: any) =>
          typeof n === 'string' ? { id: n, name: n } : { id: n.id || '', name: n.name || n }
        )
      : typeof data.needs === 'string'
        ? JSON.parse(data.needs || '[]').map((n: any) =>
            typeof n === 'string' ? { id: n, name: n } : n
          )
        : []

    const benefitsArray = Array.isArray(data.benefits)
      ? data.benefits.map((b: any) =>
          typeof b === 'string' ? { title: b, description: null } : b
        )
      : typeof data.benefits === 'string'
        ? JSON.parse(data.benefits || '[]').map((b: any) =>
            typeof b === 'string' ? { title: b, description: null } : b
          )
        : []

    const ingredientsArray = Array.isArray(data.ingredients)
      ? data.ingredients.map((i: any) =>
          typeof i === 'string' ? { name: i, percentage: null } : i
        )
      : typeof data.ingredients === 'string'
        ? JSON.parse(data.ingredients || '[]').map((i: any) =>
            typeof i === 'string' ? { name: i, percentage: null } : i
          )
        : []

    const product: any = {
      name: data.name,
      tagline: data.tagline,
      price: data.price,
      originalPrice: data.originalPrice || null,
      discount: data.discount || null,
      category: data.category, // Store category as string
      needs: needsArray,
      benefits: benefitsArray,
      ingredients: ingredientsArray,
      image: data.image,
      hoverImage: data.hoverImage,
      description: data.description || null,
      howToUse: data.howToUse || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collection = await getCollection<any>('products')
    const result = await collection.insertOne(product)
    const inserted = await collection.findOne({ _id: result.insertedId })
    return this.transformProduct(inserted!)
  }

  async updateProduct(data: UpdateProductData): Promise<ProductRecord> {
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (data.name !== undefined) updateData.name = data.name
    if (data.tagline !== undefined) updateData.tagline = data.tagline
    if (data.price !== undefined) updateData.price = data.price
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice
    if (data.discount !== undefined) updateData.discount = data.discount
    if (data.category !== undefined) {
      updateData.category = data.category // Category is a string
    }
    if (data.needs !== undefined) {
      const needsArray = Array.isArray(data.needs)
        ? data.needs.map((n: any) =>
            typeof n === 'string' ? { id: n, name: n } : { id: n.id || '', name: n.name || n }
          )
        : typeof data.needs === 'string'
          ? JSON.parse(data.needs || '[]').map((n: any) =>
              typeof n === 'string' ? { id: n, name: n } : n
            )
          : []
      updateData.needs = needsArray
    }
    if (data.benefits !== undefined) {
      const benefitsArray = Array.isArray(data.benefits)
        ? data.benefits.map((b: any) =>
            typeof b === 'string' ? { title: b, description: null } : b
          )
        : typeof data.benefits === 'string'
          ? JSON.parse(data.benefits || '[]').map((b: any) =>
              typeof b === 'string' ? { title: b, description: null } : b
            )
          : []
      updateData.benefits = benefitsArray
    }
    if (data.ingredients !== undefined) {
      const ingredientsArray = Array.isArray(data.ingredients)
        ? data.ingredients.map((i: any) =>
            typeof i === 'string' ? { name: i, percentage: null } : i
          )
        : typeof data.ingredients === 'string'
          ? JSON.parse(data.ingredients || '[]').map((i: any) =>
              typeof i === 'string' ? { name: i, percentage: null } : i
            )
          : []
      updateData.ingredients = ingredientsArray
    }
    if (data.image !== undefined) updateData.image = data.image
    if (data.hoverImage !== undefined) updateData.hoverImage = data.hoverImage
    if (data.description !== undefined) updateData.description = data.description
    if (data.howToUse !== undefined) updateData.howToUse = data.howToUse

    const collection = await getCollection<any>('products')
    return this.updateAndFetch(collection, data.id, updateData, (doc) => this.transformProduct(doc), 'Product')
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<any>('products')
      const filter = this.buildIdFilter(id)
      const updateData = {
        isDeleted: true,
        deletedAt: Math.floor(Date.now() / 1000),
        updatedAt: new Date(),
      }
      const result = await collection.updateOne(filter, { $set: updateData })
      return result.matchedCount > 0
    } catch (error) {
      console.error('Error deleting product:', error)
      return false
    }
  }

  private transformProduct(product: any): ProductRecord {
    return {
      id: product._id ? String(product._id) : product.id,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      category: product.category || '', // Category is a string
      needs: needsToClientFormat(product.needs),
      image: product.image,
      hoverImage: product.hoverImage,
      description: product.description,
      benefits: benefitsToClientFormat(product.benefits),
      ingredients: ingredientsToClientFormat(product.ingredients),
      howToUse: product.howToUse,
      createdAt: dateTimeToUnix(product.createdAt),
      updatedAt: dateTimeToUnix(product.updatedAt),
    }
  }

  // ==================== Categories ====================
  async getAllCategories(): Promise<CategoryRecord[]> {
    const collection = await getCollection<any>('categories')
    const categories = await collection.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).toArray()
    return categories.map(this.transformCategory)
  }

  async getCategoryById(id: string): Promise<CategoryRecord | null> {
    const collection = await getCollection<any>('categories')
    let category = await collection.findOne({ _id: id })
    if (!category) {
      category = await collection.findOne({ id })
    }
    return category ? this.transformCategory(category) : null
  }

  async createCategory(data: CreateCategoryData): Promise<CategoryRecord> {
    const category: any = {
      name: data.name,
      slug: data.slug || null,
      description: data.description || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collection = await getCollection<any>('categories')
    const result = await collection.insertOne(category)
    const inserted = await collection.findOne({ _id: result.insertedId })
    return this.transformCategory(inserted!)
  }

  async updateCategory(data: UpdateCategoryData): Promise<CategoryRecord> {
    const updateData: any = { updatedAt: new Date() }

    if (data.name !== undefined) updateData.name = data.name
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.description !== undefined) updateData.description = data.description

    const collection = await getCollection<any>('categories')
    return this.updateAndFetch(collection, data.id, updateData, (doc) => this.transformCategory(doc), 'Category')
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<any>('categories')
      const filter = this.buildIdFilter(id)
      const updateData = {
        isDeleted: true,
        deletedAt: Math.floor(Date.now() / 1000),
        updatedAt: new Date(),
      }
      const result = await collection.updateOne(filter, { $set: updateData })
      return result.matchedCount > 0
    } catch (error) {
      console.error('Error deleting category:', error)
      return false
    }
  }

  private transformCategory(category: any): CategoryRecord {
    return {
      // Prioritize custom id field, then _id, then id field
      id: category._id ? String(category._id) : category.id || '',
      name: category.name,
      slug: category.slug || null,
      description: category.description,
      createdAt: dateTimeToUnix(category.createdAt),
      updatedAt: dateTimeToUnix(category.updatedAt),
    }
  }

  // ==================== Users ====================
  async getAllUsers(): Promise<UserRecord[]> {
    const collection = await getCollection<any>('users')
    const users = await collection.find({}).sort({ createdAt: -1 }).toArray()
    return users.map(this.transformUser)
  }

  async getUserById(id: string): Promise<UserRecord | null> {
    const collection = await getCollection<any>('users')

    // Try to convert string ID to ObjectId
    let user = null
    try {
      // Try with ObjectId first
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null
      if (objectId) {
        user = await collection.findOne({ _id: objectId })
      }
    } catch (error) {
      // Ignore error and try other methods
    }

    // If not found, try with string _id
    if (!user) {
      user = await collection.findOne({ _id: id })
    }

    // If still not found, try with id field
    if (!user) {
      user = await collection.findOne({ id })
    }

    return user ? this.transformUser(user) : null
  }

  async getUserByEmail(email: string): Promise<UserRecord | null> {
    const collection = await getCollection<any>('users')
    const user = await collection.findOne({ email })
    return user ? this.transformUser(user) : null
  }

  async getUserByEmailWithPassword(email: string): Promise<(UserRecord & { password?: string | null }) | null> {
    const collection = await getCollection<any>('users')
    // Trim email
    const trimmedEmail = email.trim()

    // Try exact match first
    let user = await collection.findOne({ email: trimmedEmail })

    // If not found, try case-insensitive search
    if (!user) {
      user = await collection.findOne({
        email: { $regex: new RegExp(`^${trimmedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      })
    }

    if (!user) return null
    return {
      ...this.transformUser(user),
      password: user.password || null,
    }
  }

  async createUser(data: CreateUserData): Promise<UserRecord> {
    // Hash password if provided
    let hashedPassword: string | null = null
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10)
    }

    const user: any = {
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      address: data.address || null,
      password: hashedPassword,
      role: data.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collection = await getCollection<any>('users')
    const result = await collection.insertOne(user)
    const inserted = await collection.findOne({ _id: result.insertedId })
    return this.transformUser(inserted!)
  }

  async updateUser(data: UpdateUserData): Promise<UserRecord> {
    const updateData: any = { updatedAt: new Date() }

    if (data.email !== undefined) updateData.email = data.email
    if (data.name !== undefined) updateData.name = data.name
    if (data.phone !== undefined) updateData.phone = data.phone
    if (data.address !== undefined) updateData.address = data.address
    if (data.role !== undefined) updateData.role = data.role

    // Hash password if provided
    if (data.password !== undefined) {
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10)
      } else {
        updateData.password = null
      }
    }

    const collection = await getCollection<any>('users')

    // Try to convert string ID to ObjectId
    let filter: any = null
    try {
      // Try with ObjectId first
      if (ObjectId.isValid(data.id)) {
        filter = { _id: new ObjectId(data.id) }
        console.log(`[MongoDB] Updating user with ObjectId filter: ${data.id}`)
      }
    } catch (error) {
      console.log(`[MongoDB] ObjectId conversion failed for ${data.id}:`, error)
    }

    // If ObjectId conversion failed, try with string _id
    if (!filter) {
      filter = { $or: [{ _id: data.id }, { id: data.id }] }
      console.log(`[MongoDB] Updating user with string filter: ${data.id}`)
    }

    // Check if user exists before updating
    const existingUser = await collection.findOne(filter)
    if (!existingUser) {
      console.log(`[MongoDB] User not found with filter:`, filter)
      throw new Error(`User with id ${data.id} not found`)
    }

    console.log(`[MongoDB] Found user, updating:`, existingUser._id)

    // Use updateOne instead of findOneAndUpdate for better compatibility
    const updateResult = await collection.updateOne(
      filter,
      { $set: updateData }
    )

    if (updateResult.matchedCount === 0) {
      console.log(`[MongoDB] Update failed, no user matched for id: ${data.id}`)
      throw new Error(`User with id ${data.id} not found`)
    }

    if (updateResult.modifiedCount === 0) {
      console.log(`[MongoDB] No changes made to user: ${data.id}`)
    }

    console.log(`[MongoDB] User updated successfully: ${data.id}`)

    // Fetch updated user
    const updatedUser = await collection.findOne(filter)
    if (!updatedUser) {
      console.log(`[MongoDB] Failed to fetch updated user: ${data.id}`)
      throw new Error(`User with id ${data.id} not found after update`)
    }

    return this.transformUser(updatedUser)
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<any>('users')

      // Try to convert string ID to ObjectId
      let filter: any = null
      try {
        // Try with ObjectId first
        if (ObjectId.isValid(id)) {
          filter = { _id: new ObjectId(id) }
        }
      } catch (error) {
        // Ignore error and try other methods
      }

      // If ObjectId conversion failed, try with string _id
      if (!filter) {
        filter = { $or: [{ _id: id }, { id }] }
      }

      const result = await collection.deleteOne(filter)
      return result.deletedCount > 0
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  private transformUser(user: any): UserRecord {
    return {
      id: user._id ? String(user._id) : user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      role: user.role,
      createdAt: dateTimeToUnix(user.createdAt),
      updatedAt: dateTimeToUnix(user.updatedAt),
    }
  }

  // ==================== Orders ====================
  async getAllOrders(): Promise<OrderRecord[]> {
    const collection = await getCollection<any>('orders')
    const orders = await collection.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).toArray()
    return orders.map(this.transformOrder)
  }

  async getOrderById(id: string): Promise<OrderRecord | null> {
    const collection = await getCollection<any>('orders')

    // Try to convert string ID to ObjectId
    let order = null
    try {
      // Try with ObjectId first
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null
      if (objectId) {
        order = await collection.findOne({ _id: objectId })
      }
    } catch (error) {
      // Ignore error and try other methods
    }

    // If not found, try with string _id
    if (!order) {
      order = await collection.findOne({ _id: id })
    }

    // If still not found, try with id field
    if (!order) {
      order = await collection.findOne({ id })
    }

    return order ? this.transformOrder(order) : null
  }

  async createOrder(data: CreateOrderData): Promise<OrderRecord> {
    // Handle Address - support both embedded and flat formats
    let addressObj: Address | null = null
    if (data.address) {
      addressObj = data.address
    } else if (data.streetAddress) {
      addressObj = {
        street: data.streetAddress,
        ward: data.wardName || null,
        district: data.districtName || null,
        province: data.provinceName || null,
      }
    }

    // Handle Items - support multiple formats
    let itemsArray: OrderItemRecord[] = []
    if (Array.isArray(data.items)) {
      itemsArray = data.items.map((item: any) => {
        // OrderItemRecord format
        if ('productId' in item && 'productName' in item) {
          return {
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          }
        }
        // OrderItem format (backward compatibility)
        return {
          productId: item.id || '',
          productName: item.name || '',
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        }
      })
    } else if (typeof data.items === 'string') {
      try {
        const parsed = JSON.parse(data.items)
        itemsArray = Array.isArray(parsed)
          ? parsed.map((item: any) => ({
              productId: item.productId || item.id || '',
              productName: item.productName || item.name || '',
              quantity: item.quantity,
              price: item.price,
              total: item.total || item.price * item.quantity,
            }))
          : []
      } catch {
        itemsArray = []
      }
    }

    const order: any = {
      orderNumber: data.orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail || null,
      customerPhone: data.customerPhone,
      userId: data.userId || null,
      address: addressObj,
      status: data.status || 'pending',
      paymentMethod: data.paymentMethod,
      items: itemsArray,
      total: data.total,
      notes: data.notes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collection = await getCollection<any>('orders')
    const result = await collection.insertOne(order)
    const inserted = await collection.findOne({ _id: result.insertedId })
    return this.transformOrder(inserted!)
  }

  async updateOrder(data: UpdateOrderData): Promise<OrderRecord> {
    const updateData: any = { updatedAt: new Date() }

    if (data.orderNumber !== undefined) updateData.orderNumber = data.orderNumber
    if (data.customerName !== undefined) updateData.customerName = data.customerName
    if (data.customerEmail !== undefined) updateData.customerEmail = data.customerEmail
    if (data.customerPhone !== undefined) updateData.customerPhone = data.customerPhone
    if (data.userId !== undefined) updateData.userId = data.userId
    if (data.address !== undefined) {
      updateData.address = data.address
    } else if (
      data.streetAddress !== undefined ||
      data.wardName !== undefined ||
      data.districtName !== undefined ||
      data.provinceName !== undefined
    ) {
      updateData.address = {
        street: data.streetAddress || '',
        ward: data.wardName || null,
        district: data.districtName || null,
        province: data.provinceName || null,
      }
    }
    if (data.status !== undefined) updateData.status = data.status
    if (data.paymentMethod !== undefined) updateData.paymentMethod = data.paymentMethod
    if (data.items !== undefined) {
      if (Array.isArray(data.items)) {
        updateData.items = data.items.map((item: any) => {
          if ('productId' in item && 'productName' in item) {
            return {
              productId: item.productId,
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
              total: item.total,
            }
          }
          return {
            productId: item.id || '',
            productName: item.name || '',
            quantity: item.quantity,
            price: item.price,
            total: item.total || item.price * item.quantity,
          }
        })
      } else if (typeof data.items === 'string') {
        try {
          const parsed = JSON.parse(data.items)
          updateData.items = Array.isArray(parsed)
            ? parsed.map((item: any) => ({
                productId: item.productId || item.id || '',
                productName: item.productName || item.name || '',
                quantity: item.quantity,
                price: item.price,
                total: item.total || item.price * item.quantity,
              }))
            : []
        } catch {
          updateData.items = []
        }
      }
    }
    if (data.total !== undefined) updateData.total = data.total
    if (data.notes !== undefined) updateData.notes = data.notes

    const collection = await getCollection<any>('orders')
    return this.updateAndFetch(collection, data.id, updateData, (doc) => this.transformOrder(doc), 'Order')
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<any>('orders')
      const filter = this.buildIdFilter(id)
      const updateData = {
        isDeleted: true,
        deletedAt: Math.floor(Date.now() / 1000),
        updatedAt: new Date(),
      }
      const result = await collection.updateOne(filter, { $set: updateData })
      return result.matchedCount > 0
    } catch (error) {
      console.error('Error deleting order:', error)
      return false
    }
  }

  private transformOrder(order: any): OrderRecord {
    // Transform embedded Address to flat fields for backward compatibility
    const address = order.address || {}
    const itemsString =
      order.items && Array.isArray(order.items)
        ? JSON.stringify(
            order.items.map((item: any) => ({
              id: item.productId || item.id || '',
              name: item.productName || item.name || '',
              price: item.price,
              quantity: item.quantity,
              image: item.image || '',
            }))
          )
        : typeof order.items === 'string'
          ? order.items
          : JSON.stringify([])

    return {
      id: order._id ? String(order._id) : order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      userId: order.userId,
      address: order.address || null,
      streetAddress: address.street || order.streetAddress || '',
      wardName: address.ward || order.wardName || null,
      districtName: address.district || order.districtName || null,
      provinceName: address.province || order.provinceName || null,
      status: order.status || 'pending',
      paymentMethod: order.paymentMethod,
      items: itemsString,
      total: order.total,
      notes: order.notes,
      createdAt: dateTimeToUnix(order.createdAt),
      updatedAt: dateTimeToUnix(order.updatedAt),
    }
  }

  // ==================== Reviews ====================
  async getAllReviews(): Promise<ReviewRecord[]> {
    const collection = await getCollection<any>('reviews')
    const reviews = await collection.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).toArray()
    return reviews.map(this.transformReview)
  }

  async getReviewById(id: string): Promise<ReviewRecord | null> {
    const collection = await getCollection<any>('reviews')
    let review = await collection.findOne({ _id: id })
    if (!review) {
      review = await collection.findOne({ id })
    }
    return review ? this.transformReview(review) : null
  }

  async createReview(data: CreateReviewData): Promise<ReviewRecord> {
    const review: any = {
      productId: data.productId,
      reviewerName: data.reviewerName,
      rating: data.rating,
      review: data.review,
      reviewDate: data.reviewDate, // Required field
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collection = await getCollection<any>('reviews')
    const result = await collection.insertOne(review)
    const inserted = await collection.findOne({ _id: result.insertedId })
    return this.transformReview(inserted!)
  }

  async updateReview(data: UpdateReviewData): Promise<ReviewRecord> {
    const updateData: any = { updatedAt: new Date() }

    if (data.productId !== undefined) updateData.productId = data.productId
    if (data.reviewerName !== undefined) updateData.reviewerName = data.reviewerName
    if (data.rating !== undefined) updateData.rating = data.rating
    if (data.review !== undefined) updateData.review = data.review
    if (data.reviewDate !== undefined) updateData.reviewDate = data.reviewDate

    const collection = await getCollection<any>('reviews')
    return this.updateAndFetch(collection, data.id, updateData, (doc) => this.transformReview(doc), 'Review')
  }

  async deleteReview(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<any>('reviews')
      const filter = this.buildIdFilter(id)
      const updateData = {
        isDeleted: true,
        deletedAt: Math.floor(Date.now() / 1000),
        updatedAt: new Date(),
      }
      const result = await collection.updateOne(filter, { $set: updateData })
      return result.matchedCount > 0
    } catch (error) {
      console.error('Error deleting review:', error)
      return false
    }
  }

  private transformReview(review: any): ReviewRecord {
    return {
      id: review._id ? String(review._id) : review.id,
      productId: review.productId,
      reviewerName: review.reviewerName,
      rating: review.rating,
      review: review.review,
      reviewDate: review.reviewDate || '', // Required field, fallback to empty string for backward compatibility
      createdAt: dateTimeToUnix(review.createdAt),
      updatedAt: dateTimeToUnix(review.updatedAt),
    }
  }
}
