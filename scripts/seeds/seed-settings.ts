/**
 * Seed Settings for MongoDB
 * Usage: npx tsx scripts/seeds/seed-settings.ts
 *
 * Seeds default settings for the application
 */

import {
  EMAIL_SETTING_KEYS,
  SETTING_GROUPS,
  SETTING_KEYS,
  SMTP_SETTING_KEYS,
} from '@/lib/constants/setting-keys'
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
    key: SETTING_KEYS.SITE_TITLE,
    value: 'Cellic - Mỹ phẩm chăm sóc da',
    type: 'string',
    description: 'Tiêu đề website',
    group: SETTING_GROUPS.SEO,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.SITE_DESCRIPTION,
    value: 'Mỹ phẩm chăm sóc da chất lượng cao, được bác sĩ da liễu khuyên dùng',
    type: 'string',
    description: 'Mô tả website cho SEO',
    group: SETTING_GROUPS.SEO,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.OG_IMAGE,
    value: '',
    type: 'image',
    description: 'Hình ảnh chia sẻ mạng xã hội (OG Image)',
    group: SETTING_GROUPS.SEO,
    isPublic: true,
  },
  // Contact Settings
  {
    key: SETTING_KEYS.PHONE,
    value: '0123456789',
    type: 'string',
    description: 'Số điện thoại liên hệ',
    group: SETTING_GROUPS.CONTACT,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.EMAIL,
    value: 'contact@cellic.vn',
    type: 'string',
    description: 'Email liên hệ',
    group: SETTING_GROUPS.CONTACT,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.ADDRESS,
    value: '123 Đường ABC, Quận XYZ, TP.HCM',
    type: 'string',
    description: 'Địa chỉ liên hệ',
    group: SETTING_GROUPS.CONTACT,
    isPublic: true,
  },
  // Social Media Settings
  {
    key: SETTING_KEYS.FACEBOOK,
    value: 'https://facebook.com/cellic',
    type: 'image',
    description: 'Link Facebook',
    group: SETTING_GROUPS.SOCIAL,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.INSTAGRAM,
    value: 'https://instagram.com/cellic',
    type: 'image',
    description: 'Link Instagram',
    group: SETTING_GROUPS.SOCIAL,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.ZALO,
    value: 'https://zalo.me/cellic',
    type: 'image',
    description: 'Link Zalo',
    group: SETTING_GROUPS.SOCIAL,
    isPublic: true,
  },
  // General Settings
  {
    key: SETTING_KEYS.FREE_SHIPPING_THRESHOLD,
    value: '0',
    type: 'number',
    description: 'Ngưỡng miễn phí vận chuyển (VNĐ)',
    group: SETTING_GROUPS.GENERAL,
    isPublic: false,
  },
  {
    key: SETTING_KEYS.RETURN_DAYS,
    value: '30',
    type: 'number',
    description: 'Số ngày được đổi trả',
    group: SETTING_GROUPS.GENERAL,
    isPublic: true,
  },
  {
    key: SETTING_KEYS.MAINTENANCE_MODE,
    value: 'false',
    type: 'boolean',
    description: 'Chế độ bảo trì',
    group: SETTING_GROUPS.GENERAL,
    isPublic: false,
  },
  // SMTP Settings
  {
    key: SMTP_SETTING_KEYS.HOST,
    value: '',
    type: 'string',
    description: 'SMTP host để gửi email',
    group: SETTING_GROUPS.SMTP,
    isPublic: false,
  },
  {
    key: SMTP_SETTING_KEYS.PORT,
    value: '587',
    type: 'string',
    description: 'SMTP port (ví dụ: 587 hoặc 465)',
    group: SETTING_GROUPS.SMTP,
    isPublic: false,
  },
  {
    key: SMTP_SETTING_KEYS.USER,
    value: '',
    type: 'string',
    description: 'SMTP username',
    group: SETTING_GROUPS.SMTP,
    isPublic: false,
  },
  {
    key: SMTP_SETTING_KEYS.PASSWORD,
    value: '',
    type: 'string',
    description: 'SMTP password',
    group: SETTING_GROUPS.SMTP,
    isPublic: false,
  },
  {
    key: SMTP_SETTING_KEYS.FROM,
    value: 'no-reply@cellic.vn',
    type: 'string',
    description: 'Địa chỉ email gửi đi',
    group: SETTING_GROUPS.SMTP,
    isPublic: false,
  },
  {
    key: SMTP_SETTING_KEYS.TO,
    value: 'contact@cellic.vn',
    type: 'string',
    description: 'Địa chỉ email nhận thông báo',
    group: SETTING_GROUPS.SMTP,
    isPublic: false,
  },
  // Email Template Settings
  {
    key: EMAIL_SETTING_KEYS.CONTACT_SUBJECT,
    value: 'Tin nhắn mới từ {{name}} - {{subject}}',
    type: 'string',
    description: 'Template tiêu đề email thông báo tin nhắn liên hệ',
    group: SETTING_GROUPS.EMAIL,
    isPublic: false,
  },
  {
    key: EMAIL_SETTING_KEYS.CONTACT_BODY,
    value: `<h2>Bạn có tin nhắn mới từ form liên hệ</h2>
<p><strong>Tên:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Chủ đề:</strong> {{subject}}</p>
<p><strong>Nội dung:</strong></p>
<p>{{message}}</p>
<p><strong>Thời gian:</strong> {{date}}</p>`,
    type: 'string',
    description: 'Template nội dung email thông báo tin nhắn liên hệ (HTML)',
    group: SETTING_GROUPS.EMAIL,
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
        console.log(`⚠️  Setting already exists (skipped to avoid overwriting): ${setting.key}`)
        skipped++
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
