/**
 * Seed Categories for MongoDB
 * Based on CATEGORIES from category-service.ts
 * Usage: npx tsx scripts/seeds/seed-mongodb-categories.ts
 */

import { MongoDataSource } from '@/lib/services/data-sources/mongodb'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Categories data from category-service.ts
const CATEGORIES = [
  { id: "all", name: "Tất cả" },
  { id: "da-mun-nhay-cam", name: "Da mụn nhạy cảm" },
  { id: "da-dau", name: "Da dầu" },
  { id: "da-kho", name: "Da khô" },
  { id: "ngan-ngua-lao-hoa", name: "Ngăn ngừa lão hoá" },
]

async function main() {
  console.log('🌱 Seeding categories to MongoDB...\n')

  const mongoDataSource = new MongoDataSource()
  let created = 0
  let skipped = 0

  for (const category of CATEGORIES) {
    try {
      await mongoDataSource.createCategory({
        name: category.name,
        description: null,
      })
      console.log(`✅ Created category: ${category.name}`)
      created++
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate') || error.message?.includes('unique')) {
        console.log(`⚠️  Category already exists: ${category.name}`)
        skipped++
      } else {
        console.error(`❌ Error creating category ${category.name}:`, error.message)
      }
    }
  }

  console.log(`\n✅ Category seeding completed!`)
  console.log(`   Created: ${created}, Skipped: ${skipped}, Total: ${CATEGORIES.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
