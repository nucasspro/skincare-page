/**
 * Migration Script: Setup articles collection with required indexes
 * Usage: pnpm migrate:articles
 */

import 'dotenv/config'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB_NAME =
  process.env.MONGODB_DB_NAME ||
  process.env.MONGODB_URI?.split('/').pop() ||
  ''

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
    const articlesCollection = db.collection('articles')

    console.log('Creating indexes on articles collection...')
    await Promise.all([
      articlesCollection.createIndex({ slug: 1 }, { unique: true }),
      articlesCollection.createIndex({ category: 1 }),
      articlesCollection.createIndex({ isFeatured: 1 }),
      articlesCollection.createIndex({ isPublished: 1 }),
      articlesCollection.createIndex({ createdAt: -1 }),
      articlesCollection.createIndex({ publishedAt: -1 }),
    ])
    console.log('✅ Indexes created successfully')

    console.log('✅ Articles collection is ready!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('Disconnected from MongoDB')
  }
}

migrate()
