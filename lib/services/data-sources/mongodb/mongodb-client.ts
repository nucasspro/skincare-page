/**
 * MongoDB Client with Prisma
 * Optional Prisma client for MongoDB - only used if needed
 * Note: We use native MongoDB driver by default, Prisma is optional
 */

import { PrismaClient } from '@prisma/client'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not set. MongoDB data source may not work properly.')
}

const globalForMongoPrisma = globalThis as unknown as {
  mongoPrisma: PrismaClient | undefined
}

// Prisma client for MongoDB (optional, mainly for Prisma Studio)
export const mongoPrisma =
  globalForMongoPrisma.mongoPrisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: MONGODB_URI,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  globalForMongoPrisma.mongoPrisma = mongoPrisma
}
