/**
 * Data Source - MongoDB Only
 * Chỉ sử dụng MongoDB, không còn Prisma hay Google Sheets
 */

import type { IDataSource } from '@/lib/services/data-source.interface'
import { MongoDataSource } from './mongodb'

/**
 * Get data source instance - MongoDB only
 */
export function getDataSource(): IDataSource {
  return new MongoDataSource()
}

// Export for direct use
export const dataSource = getDataSource()

// Export types
export type {
    Address, ArticleQueryOptions,
    ArticleRecord, Benefit,
    CategoryRecord, CreateArticleData, CreateCategoryData, CreateOrderData,
    CreateProductData,
    CreateReviewData,
    CreateUserData,
    IDataSource,
    Ingredient,
    NeedTag,
    OrderItem,
    OrderItemRecord,
    OrderRecord,
    OrderStatus,
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

// Export MongoDB data source for direct use
export { MongoDataSource } from './mongodb'
