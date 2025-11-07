/**
 * Seed Categories for MongoDB
 * Usage: npx tsx scripts/seeds/seed-mongodb-categories.ts
 *
 * Note: Categories are created with slug field to match filter logic in product-service.ts
 */

import { MongoDataSource } from '@/lib/services/data-sources/mongodb'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Categories data with slug field matching filter logic
const CATEGORIES = [
  { name: "Da mụn nhạy cảm", slug: "da-mun-nhay-cam" },
  { name: "Da dầu", slug: "da-dau" },
  { name: "Da khô", slug: "da-kho" },
  { name: "Ngăn ngừa lão hoá", slug: "ngan-ngua-lao-hoa" },
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
        slug: category.slug,
        description: null,
      })
      console.log(`✅ Created category: ${category.name} (slug: ${category.slug})`)
      created++
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate') || error.message?.includes('unique') || error.code === 11000) {
        console.log(`⚠️  Category already exists: ${category.name} (slug: ${category.slug})`)
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
