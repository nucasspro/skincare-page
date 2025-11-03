/**
 * Import data from Prisma (SQLite) to MongoDB
 * Usage: npx tsx scripts/import-to-mongodb.ts
 */

// Load environment variables FIRST before any imports
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
const envResult = config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Verify MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env.local!')
  console.log('Please check your .env.local file')
  process.exit(1)
}

console.log(`✅ MONGODB_URI loaded: ${process.env.MONGODB_URI.substring(0, 30)}...`)

import { PrismaClient } from '@prisma/client'
import { MongoDataSource } from '@/lib/services/data-sources/mongodb'

const prisma = new PrismaClient()
const mongoDataSource = new MongoDataSource()

async function main() {
  console.log('📥 Importing data from Prisma to MongoDB...\n')

  try {
    // Import Categories
    console.log('📁 Importing categories...')
    const categories = await prisma.category.findMany()
    if (categories.length > 0) {
      for (const category of categories) {
        try {
          await mongoDataSource.createCategory({
            name: category.name,
            description: category.description || null,
          })
          console.log(`  ✅ Imported category: ${category.name}`)
        } catch (error: any) {
          if (error.message?.includes('already exists')) {
            console.log(`  ⚠️  Category already exists: ${category.name}`)
          } else {
            console.error(`  ❌ Error importing category ${category.name}:`, error.message)
          }
        }
      }
      console.log(`✅ Imported ${categories.length} categories\n`)
    } else {
      console.log('⚠️  No categories found in Prisma database\n')
    }

    // Import Products
    console.log('📦 Importing products...')
    const products = await prisma.product.findMany()
    if (products.length > 0) {
      for (const product of products) {
        try {
          await mongoDataSource.createProduct({
            name: product.name,
            tagline: product.tagline,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            category: product.category,
            needs: product.needs,
            image: product.image,
            hoverImage: product.hoverImage,
            description: product.description,
            benefits: product.benefits,
            ingredients: product.ingredients,
            howToUse: product.howToUse,
          })
          console.log(`  ✅ Imported product: ${product.name}`)
        } catch (error: any) {
          console.error(`  ❌ Error importing product ${product.name}:`, error.message)
        }
      }
      console.log(`✅ Imported ${products.length} products\n`)
    } else {
      console.log('⚠️  No products found in Prisma database\n')
    }

    // Import Users
    console.log('👥 Importing users...')
    const users = await prisma.user.findMany()
    if (users.length > 0) {
      for (const user of users) {
        try {
          await mongoDataSource.createUser({
            email: user.email,
            name: user.name,
            phone: user.phone || null,
            address: user.address || null,
            role: user.role || 'user',
          })
          console.log(`  ✅ Imported user: ${user.email}`)
        } catch (error: any) {
          if (error.message?.includes('already exists') || error.message?.includes('unique')) {
            console.log(`  ⚠️  User already exists: ${user.email}`)
          } else {
            console.error(`  ❌ Error importing user ${user.email}:`, error.message)
          }
        }
      }
      console.log(`✅ Imported ${users.length} users\n`)
    } else {
      console.log('⚠️  No users found in Prisma database\n')
    }

    // Import Orders
    console.log('🛒 Importing orders...')
    const orders = await prisma.order.findMany()
    if (orders.length > 0) {
      for (const order of orders) {
        try {
          await mongoDataSource.createOrder({
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            customerEmail: order.customerEmail || null,
            customerPhone: order.customerPhone,
            userId: order.userId || null,
            streetAddress: order.streetAddress,
            wardName: order.wardName || null,
            districtName: order.districtName || null,
            provinceName: order.provinceName || null,
            status: order.status,
            paymentMethod: order.paymentMethod,
            items: order.items,
            total: order.total,
            notes: order.notes || null,
          })
          console.log(`  ✅ Imported order: ${order.orderNumber}`)
        } catch (error: any) {
          if (error.message?.includes('already exists') || error.message?.includes('unique')) {
            console.log(`  ⚠️  Order already exists: ${order.orderNumber}`)
          } else {
            console.error(`  ❌ Error importing order ${order.orderNumber}:`, error.message)
          }
        }
      }
      console.log(`✅ Imported ${orders.length} orders\n`)
    } else {
      console.log('⚠️  No orders found in Prisma database\n')
    }

    // Import Reviews
    console.log('⭐ Importing reviews...')
    const reviews = await prisma.review.findMany()
    if (reviews.length > 0) {
      // Need to map productId from Prisma to MongoDB
      const mongoProducts = await mongoDataSource.getAllProducts()
      const productIdMap = new Map<string, string>()

      // Create a simple mapping (assuming product names are unique)
      const prismaProducts = await prisma.product.findMany()
      for (const prismaProduct of prismaProducts) {
        const mongoProduct = mongoProducts.find(
          (p) => p.name === prismaProduct.name || p.id === prismaProduct.id
        )
        if (mongoProduct) {
          productIdMap.set(prismaProduct.id, mongoProduct.id)
        }
      }

      for (const review of reviews) {
        try {
          const mongoProductId = productIdMap.get(review.productId)
          if (!mongoProductId) {
            console.log(`  ⚠️  Product not found for review: ${review.id}`)
            continue
          }

          await mongoDataSource.createReview({
            productId: mongoProductId,
            reviewerName: review.reviewerName,
            rating: review.rating,
            review: review.review,
          })
          console.log(`  ✅ Imported review by ${review.reviewerName}`)
        } catch (error: any) {
          console.error(`  ❌ Error importing review:`, error.message)
        }
      }
      console.log(`✅ Imported ${reviews.length} reviews\n`)
    } else {
      console.log('⚠️  No reviews found in Prisma database\n')
    }

    // Import Comments
    console.log('💬 Importing comments...')
    const comments = await prisma.comment.findMany()
    if (comments.length > 0) {
      // Map product IDs
      const mongoProducts = await mongoDataSource.getAllProducts()
      const mongoUsers = await mongoDataSource.getAllUsers()
      const productIdMap = new Map<string, string>()
      const userIdMap = new Map<string, string>()

      const prismaProducts = await prisma.product.findMany()
      const prismaUsers = await prisma.user.findMany()

      for (const prismaProduct of prismaProducts) {
        const mongoProduct = mongoProducts.find(
          (p) => p.name === prismaProduct.name || p.id === prismaProduct.id
        )
        if (mongoProduct) {
          productIdMap.set(prismaProduct.id, mongoProduct.id)
        }
      }

      for (const prismaUser of prismaUsers) {
        const mongoUser = mongoUsers.find((u) => u.email === prismaUser.email || u.id === prismaUser.id)
        if (mongoUser) {
          userIdMap.set(prismaUser.id, mongoUser.id)
        }
      }

      for (const comment of comments) {
        try {
          const mongoProductId = productIdMap.get(comment.productId)
          const mongoUserId = userIdMap.get(comment.userId)

          if (!mongoProductId || !mongoUserId) {
            console.log(`  ⚠️  Product or User not found for comment: ${comment.id}`)
            continue
          }

          await mongoDataSource.createComment({
            productId: mongoProductId,
            userId: mongoUserId,
            userName: comment.userName || null,
            userEmail: comment.userEmail || null,
            content: comment.content,
            rating: comment.rating,
            status: comment.status,
          })
          console.log(`  ✅ Imported comment by ${comment.userName || comment.userEmail}`)
        } catch (error: any) {
          console.error(`  ❌ Error importing comment:`, error.message)
        }
      }
      console.log(`✅ Imported ${comments.length} comments\n`)
    } else {
      console.log('⚠️  No comments found in Prisma database\n')
    }

    console.log('🎉 Import completed successfully!')
  } catch (error) {
    console.error('❌ Error importing data:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('\n✅ Prisma connection closed')
  })
