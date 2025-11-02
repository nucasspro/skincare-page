/**
 * Data Source Factory
 * Switch giữa Google Sheets và Prisma dựa trên env variable
 */

import type { IDataSource } from '@/lib/services/data-source.interface'
import { GoogleSheetsDataSource } from './google-sheets'
import { PrismaDataSource } from './prisma'

// Environment variable để switch data source
// 'prisma' hoặc 'google-sheets' hoặc undefined (default: prisma)
const DATA_SOURCE = process.env.DATA_SOURCE || 'prisma'

/**
 * Get data source instance
 */
export function getDataSource(): IDataSource {
  switch (DATA_SOURCE) {
    case 'google-sheets':
      return new GoogleSheetsDataSource()
    case 'prisma':
    default:
      return new PrismaDataSource()
  }
}

// Export for direct use
export const dataSource = getDataSource()

// Export types
export type {
    CategoryRecord, CommentRecord, CreateCategoryData, CreateCommentData, CreateOrderData, CreateProductData, CreateReviewData, CreateUserData, IDataSource, OrderItem, OrderRecord, ProductRecord, ReviewRecord, UpdateCategoryData, UpdateCommentData, UpdateOrderData, UpdateProductData, UpdateReviewData, UpdateUserData, UserRecord
} from '@/lib/services/data-source.interface'
