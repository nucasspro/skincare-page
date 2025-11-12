/**
 * Migration Script: Add soft delete fields (isDeleted, deletedAt) to all collections
 * Run this script to update existing database records
 *
 * Usage: npx tsx scripts/migrations/add-soft-delete-fields.ts
 */

import 'dotenv/config'
import { MongoClient } from 'mongodb'

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

    // Collections to migrate
    const collections = [
      { name: 'products', description: 'Products' },
      { name: 'categories', description: 'Categories' },
      { name: 'orders', description: 'Orders' },
      { name: 'reviews', description: 'Reviews' },
    ]

    for (const { name, description } of collections) {
      try {
        const collection = db.collection(name)

        // Count documents without isDeleted field
        const countWithoutIsDeleted = await collection.countDocuments({
          $or: [
            { isDeleted: { $exists: false } },
            { isDeleted: null }
          ]
        })

        if (countWithoutIsDeleted === 0) {
          console.log(`✓ ${description}: All records already have isDeleted field`)
          continue
        }

        // Update all documents to add isDeleted: false and deletedAt: null
        const result = await collection.updateMany(
          {
            $or: [
              { isDeleted: { $exists: false } },
              { isDeleted: null }
            ]
          },
          {
            $set: {
              isDeleted: false,
              deletedAt: null,
              updatedAt: new Date()
            }
          }
        )

        console.log(`✓ ${description}: Updated ${result.modifiedCount} records`)
      } catch (error) {
        console.error(`✗ Error migrating ${description}:`, error)
      }
    }

    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('Disconnected from MongoDB')
  }
}

migrate()
