/**
 * Seed Settings for MongoDB
 * Usage: npx tsx scripts/seeds/seed-settings.ts
 *
 * Seeds default settings for the application
 */

import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Default settings data
const DEFAULT_SETTINGS = [
  // SEO Settings
  {
    key: 'site_title',
    value: 'Cellic - Mỹ phẩm chăm sóc da',
    type: 'string',
    description: 'Tiêu đề website',
    group: 'seo',
    isPublic: true,
  },
  {
    key: 'site_description',
    value: 'Mỹ phẩm chăm sóc da chất lượng cao, được bác sĩ da liễu khuyên dùng',
    type: 'string',
    description: 'Mô tả website cho SEO',
    group: 'seo',
    isPublic: true,
  },
  {
    key: 'og_image',
    value: '',
    type: 'image',
    description: 'Hình ảnh chia sẻ mạng xã hội (OG Image)',
    group: 'seo',
    isPublic: true,
  },
  // Contact Settings
  {
    key: 'contact_phone',
    value: '0123456789',
    type: 'string',
    description: 'Số điện thoại liên hệ',
    group: 'contact',
    isPublic: true,
  },
  {
    key: 'contact_email',
    value: 'contact@cellic.vn',
    type: 'string',
    description: 'Email liên hệ',
    group: 'contact',
    isPublic: true,
  },
  {
    key: 'contact_address',
    value: '123 Đường ABC, Quận XYZ, TP.HCM',
    type: 'string',
    description: 'Địa chỉ liên hệ',
    group: 'contact',
    isPublic: true,
  },
  // Social Media Settings
  {
    key: 'social_facebook',
    value: 'https://facebook.com/cellic',
    type: 'image',
    description: 'Link Facebook',
    group: 'social',
    isPublic: true,
  },
  {
    key: 'social_instagram',
    value: 'https://instagram.com/cellic',
    type: 'image',
    description: 'Link Instagram',
    group: 'social',
    isPublic: true,
  },
  {
    key: 'social_zalo',
    value: 'https://zalo.me/cellic',
    type: 'image',
    description: 'Link Zalo',
    group: 'social',
    isPublic: true,
  },
  // General Settings
  {
    key: 'free_shipping_threshold',
    value: '0',
    type: 'number',
    description: 'Ngưỡng miễn phí vận chuyển (VNĐ)',
    group: 'general',
    isPublic: false,
  },
  {
    key: 'return_days',
    value: '30',
    type: 'number',
    description: 'Số ngày được đổi trả',
    group: 'general',
    isPublic: true,
  },
  {
    key: 'maintenance_mode',
    value: 'false',
    type: 'boolean',
    description: 'Chế độ bảo trì',
    group: 'general',
    isPublic: false,
  },
]

async function main() {
  console.log('🌱 Seeding settings to MongoDB...\n')

  const db = await getDb()
  const settingsCollection = db.collection('settings')

  let created = 0
  let skipped = 0
  let updated = 0

  const now = Math.floor(Date.now() / 1000)

  for (const setting of DEFAULT_SETTINGS) {
    try {
      // Check if setting already exists
      const existing = await settingsCollection.findOne({ key: setting.key })

      if (existing) {
        // Update existing setting if value is different
        if (existing.value !== setting.value || existing.type !== setting.type) {
          await settingsCollection.updateOne(
            { key: setting.key },
            {
              $set: {
                value: setting.value,
                type: setting.type,
                description: setting.description,
                group: setting.group,
                isPublic: setting.isPublic,
                updatedAt: now,
              },
            }
          )
          console.log(`🔄 Updated setting: ${setting.key}`)
          updated++
        } else {
          console.log(`⚠️  Setting already exists: ${setting.key}`)
          skipped++
        }
      } else {
        // Create new setting
        await settingsCollection.insertOne({
          _id: new ObjectId(),
          key: setting.key,
          value: setting.value,
          type: setting.type,
          description: setting.description,
          group: setting.group,
          isPublic: setting.isPublic,
          createdAt: now,
          updatedAt: now,
        })
        console.log(`✅ Created setting: ${setting.key}`)
        created++
      }
    } catch (error: any) {
      if (error.code === 11000) {
        console.log(`⚠️  Setting already exists: ${setting.key}`)
        skipped++
      } else {
        console.error(`❌ Error processing setting ${setting.key}:`, error.message)
      }
    }
  }

  console.log(`\n✅ Settings seeding completed!`)
  console.log(`   Created: ${created}, Updated: ${updated}, Skipped: ${skipped}, Total: ${DEFAULT_SETTINGS.length}`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
