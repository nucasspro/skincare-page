/**
 * Migration Script: Create settings collection and migrate existing settings
 * This script:
 * 1. Creates indexes on the settings collection
 * 2. Migrates existing settings from old format to new key-value format
 *
 * Usage: npx tsx scripts/migrations/create-settings-table.ts
 */

import { SETTING_GROUPS, SETTING_KEYS } from '@/lib/constants/setting-keys'
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
    const settingsCollection = db.collection('settings')

    // Create indexes
    console.log('Creating indexes on settings collection...')
    try {
      await settingsCollection.createIndex({ key: 1 }, { unique: true })
      await settingsCollection.createIndex({ group: 1 })
      await settingsCollection.createIndex({ type: 1 })
      console.log('✅ Indexes created successfully')
    } catch (error: any) {
      if (error.code === 85) {
        console.log('⚠️  Indexes already exist, skipping...')
      } else {
        throw error
      }
    }

    // Check if old format settings exist (single document with siteTitle, siteDescription, etc.)
    const oldSettings = await settingsCollection.findOne({
      siteTitle: { $exists: true },
    })

    if (oldSettings) {
      console.log('\n📦 Migrating old settings format to new key-value format...')

      const now = Math.floor(Date.now() / 1000)
      const newSettings = [
        {
          _id: new ObjectId(),
          key: SETTING_KEYS.SITE_TITLE,
          value: oldSettings.siteTitle || 'Cellic - Mỹ phẩm chăm sóc da',
          type: 'string',
          description: 'Tiêu đề website',
          group: SETTING_GROUPS.SEO,
          isPublic: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          _id: new ObjectId(),
          key: SETTING_KEYS.SITE_DESCRIPTION,
          value: oldSettings.siteDescription || 'Mỹ phẩm chăm sóc da chất lượng cao',
          type: 'string',
          description: 'Mô tả website cho SEO',
          group: SETTING_GROUPS.SEO,
          isPublic: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          _id: new ObjectId(),
          key: SETTING_KEYS.OG_IMAGE,
          value: oldSettings.ogImage || '',
          type: 'image',
          description: 'Hình ảnh chia sẻ mạng xã hội (OG Image)',
          group: SETTING_GROUPS.SEO,
          isPublic: true,
          createdAt: now,
          updatedAt: now,
        },
      ]

      // Insert new settings (skip if key already exists)
      let created = 0
      let skipped = 0

      for (const setting of newSettings) {
        try {
          await settingsCollection.insertOne(setting)
          console.log(`✅ Created setting: ${setting.key}`)
          created++
        } catch (error: any) {
          if (error.code === 11000) {
            console.log(`⚠️  Setting already exists: ${setting.key}`)
            skipped++
          } else {
            console.error(`❌ Error creating setting ${setting.key}:`, error.message)
          }
        }
      }

      // Delete old format document
      await settingsCollection.deleteOne({ _id: oldSettings._id })
      console.log('✅ Deleted old settings format document')

      console.log(`\n✅ Migration completed! Created: ${created}, Skipped: ${skipped}`)
    } else {
      console.log('✅ No old settings format found, skipping migration')
    }

    console.log('\n✅ Settings collection setup completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('Disconnected from MongoDB')
  }
}

migrate()
