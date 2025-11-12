/**
 * Migration Script: Migrate category field to categoryId for Products
 * This script converts existing category (string) to categoryId (ObjectId reference)
 *
 * Usage: npx tsx scripts/migrations/migrate-category-to-categoryid.ts
 */

import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || process.env.MONGODB_URI?.split('/').pop() || ''

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment variables')
  process.exit(1)
}

async function migrate() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db(MONGODB_DB_NAME)
    const productsCollection = db.collection('products')
    const categoriesCollection = db.collection('categories')

    // Step 1: Get all categories and create a map of name -> id
    const categories = await categoriesCollection.find({}).toArray()
    const categoryMap = new Map<string, string>()

    categories.forEach(cat => {
      const id = cat._id ? String(cat._id) : cat.id
      const name = cat.name
      if (name && id) {
        categoryMap.set(name.toLowerCase(), id)
        // Also add by id if category is already an ObjectId string
        if (ObjectId.isValid(name)) {
          categoryMap.set(name, name)
        }
      }
    })

    console.log(`Found ${categoryMap.size} categories`)

    // Step 2: Get all products that need migration
    // Products that have category but no categoryId, or category is not a valid ObjectId
    const products = await productsCollection.find({
      $or: [
        { categoryId: { $exists: false } },
        { category: { $exists: true, $ne: null } }
      ]
    }).toArray()

    console.log(`Found ${products.length} products to migrate`)

    let updatedCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const product of products) {
      try {
        const productId = product._id ? String(product._id) : product.id
        const currentCategory = product.category

        if (!currentCategory) {
          console.log(`⚠ Product ${productId}: No category field, skipping`)
          skippedCount++
          continue
        }

        // Check if category is already a valid ObjectId
        let categoryId: string | null = null

        if (ObjectId.isValid(currentCategory)) {
          // Category is already an ObjectId string
          categoryId = currentCategory
        } else {
          // Try to find category by name
          const categoryIdFromMap = categoryMap.get(currentCategory.toLowerCase())
          if (categoryIdFromMap) {
            categoryId = categoryIdFromMap
          }
        }

        if (!categoryId) {
          console.log(`⚠ Product ${productId}: Category "${currentCategory}" not found in categories collection, skipping`)
          skippedCount++
          continue
        }

        // Update product with categoryId
        // Keep category field for backward compatibility during migration
        await productsCollection.updateOne(
          { _id: product._id || product.id },
          {
            $set: {
              categoryId: categoryId,
              category: currentCategory, // Keep for backward compatibility
              updatedAt: new Date()
            }
          }
        )

        updatedCount++
        console.log(`✓ Product ${productId}: Migrated category "${currentCategory}" -> categoryId "${categoryId}"`)
      } catch (error) {
        console.error(`✗ Error migrating product ${product._id || product.id}:`, error)
        errorCount++
      }
    }

    console.log('\n📊 Migration Summary:')
    console.log(`  ✓ Updated: ${updatedCount} products`)
    console.log(`  ⚠ Skipped: ${skippedCount} products`)
    console.log(`  ✗ Errors: ${errorCount} products`)
    console.log('\n✅ Migration completed!')
    console.log('Note: category field is kept for backward compatibility. You can remove it later after verifying everything works.')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('Disconnected from MongoDB')
  }
}

migrate()

