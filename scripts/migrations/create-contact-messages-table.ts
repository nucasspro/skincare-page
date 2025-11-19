/**
 * Migration Script: Create contact_messages collection and indexes
 * This script:
 * 1. Creates indexes on the contact_messages collection
 *
 * Usage: npx tsx scripts/migrations/create-contact-messages-table.ts
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
    const contactMessagesCollection = db.collection('contact_messages')

    // Create indexes
    console.log('Creating indexes on contact_messages collection...')
    try {
      await contactMessagesCollection.createIndex({ status: 1 })
      console.log('✅ Index created: status')
    } catch (error: any) {
      if (error.code === 85) {
        console.log('⚠️  Index already exists: status')
      } else {
        throw error
      }
    }

    try {
      await contactMessagesCollection.createIndex({ createdAt: 1 })
      console.log('✅ Index created: createdAt')
    } catch (error: any) {
      if (error.code === 85) {
        console.log('⚠️  Index already exists: createdAt')
      } else {
        throw error
      }
    }

    try {
      await contactMessagesCollection.createIndex({ email: 1 })
      console.log('✅ Index created: email')
    } catch (error: any) {
      if (error.code === 85) {
        console.log('⚠️  Index already exists: email')
      } else {
        throw error
      }
    }

    console.log('\n✅ Contact messages collection setup completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('Disconnected from MongoDB')
  }
}

migrate()
