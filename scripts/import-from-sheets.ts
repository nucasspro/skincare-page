/**
 * Import data from Google Sheets to local Prisma database
 * Usage: npx tsx scripts/import-from-sheets.ts
 */

import { PrismaClient } from '@prisma/client'
import { googleSheetsService } from '@/lib/services/google-sheets-service'

const prisma = new PrismaClient()

async function main() {
  console.log('📥 Importing data from Google Sheets...')

  if (!googleSheetsService.isConfigured()) {
    console.error('❌ GOOGLE_SHEETS_WEB_APP_URL is not configured!')
    console.log('Please set GOOGLE_SHEETS_WEB_APP_URL in .env.local')
    process.exit(1)
  }

  try {
    // Import Categories (first, because Products depend on them)
    console.log('📁 Importing categories...')
    const categories = await googleSheetsService.readAll('Categories')
    for (const category of categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: category,
        create: category,
      })
    }
    console.log(`✅ Imported ${categories.length} categories`)

    // Import Products
    console.log('📦 Importing products...')
    const products = await googleSheetsService.readAll('Products')
    for (const product of products) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: product,
        create: product,
      })
    }
    console.log(`✅ Imported ${products.length} products`)

    // Import Users
    console.log('👥 Importing users...')
    const users = await googleSheetsService.readAll('Users')
    for (const user of users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user,
      })
    }
    console.log(`✅ Imported ${users.length} users`)

    // Import Orders
    console.log('🛒 Importing orders...')
    const orders = await googleSheetsService.readAll('Orders')
    for (const order of orders) {
      await prisma.order.upsert({
        where: { id: order.id },
        update: order,
        create: order,
      })
    }
    console.log(`✅ Imported ${orders.length} orders`)

    // Import Reviews
    console.log('⭐ Importing reviews...')
    const reviews = await googleSheetsService.readAll('Reviews')
    for (const review of reviews) {
      await prisma.review.upsert({
        where: { id: review.id },
        update: review,
        create: review,
      })
    }
    console.log(`✅ Imported ${reviews.length} reviews`)

    // Import Comments
    console.log('💬 Importing comments...')
    const comments = await googleSheetsService.readAll('Comments')
    for (const comment of comments) {
      await prisma.comment.upsert({
        where: { id: comment.id },
        update: comment,
        create: comment,
      })
    }
    console.log(`✅ Imported ${comments.length} comments`)

    console.log('\n✅ Import from Google Sheets completed!')
  } catch (error) {
    console.error('❌ Error importing from Google Sheets:', error)
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
