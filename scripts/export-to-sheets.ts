/**
 * Export data from local Prisma database to Google Sheets
 * Usage: npx tsx scripts/export-to-sheets.ts
 */

import { PrismaClient } from '@prisma/client'
import { googleSheetsService } from '@/lib/services/data-sources/google-sheets'

const prisma = new PrismaClient()

async function main() {
  console.log('📤 Exporting data to Google Sheets...')

  if (!googleSheetsService.isConfigured()) {
    console.error('❌ GOOGLE_SHEETS_WEB_APP_URL is not configured!')
    console.log('Please set GOOGLE_SHEETS_WEB_APP_URL in .env.local')
    process.exit(1)
  }

  try {
    // Export Categories
    console.log('📁 Exporting categories...')
    const categories = await prisma.category.findMany()
    if (categories.length > 0) {
      await googleSheetsService.bulkCreate('Categories', categories)
      console.log(`✅ Exported ${categories.length} categories`)
    }

    // Export Products
    console.log('📦 Exporting products...')
    const products = await prisma.product.findMany()
    if (products.length > 0) {
      await googleSheetsService.bulkCreate('Products', products)
      console.log(`✅ Exported ${products.length} products`)
    }

    // Export Users
    console.log('👥 Exporting users...')
    const users = await prisma.user.findMany()
    if (users.length > 0) {
      await googleSheetsService.bulkCreate('Users', users)
      console.log(`✅ Exported ${users.length} users`)
    }

    // Export Orders
    console.log('🛒 Exporting orders...')
    const orders = await prisma.order.findMany()
    if (orders.length > 0) {
      await googleSheetsService.bulkCreate('Orders', orders)
      console.log(`✅ Exported ${orders.length} orders`)
    }

    // Export Reviews
    console.log('⭐ Exporting reviews...')
    const reviews = await prisma.review.findMany()
    if (reviews.length > 0) {
      await googleSheetsService.bulkCreate('Reviews', reviews)
      console.log(`✅ Exported ${reviews.length} reviews`)
    }

    // Export Comments
    console.log('💬 Exporting comments...')
    const comments = await prisma.comment.findMany()
    if (comments.length > 0) {
      await googleSheetsService.bulkCreate('Comments', comments)
      console.log(`✅ Exported ${comments.length} comments`)
    }

    console.log('\n✅ Export to Google Sheets completed!')
  } catch (error) {
    console.error('❌ Error exporting to Google Sheets:', error)
    process.exit(1)
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
