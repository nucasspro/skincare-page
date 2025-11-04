/**
 * Seed default admin user
 * Usage: npx tsx scripts/seeds/seed-admin-user.ts
 */

import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

async function seedAdminUser() {
  try {
    console.log('🌱 Seeding admin user...')

    const adminEmail = 'admin@gmail.com'
    const adminPassword = 'admin123'

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Get MongoDB collection directly
    const db = await getDb()
    const collection = db.collection('users')

    // Check if admin user already exists
    const existingAdmin = await collection.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists! Updating...')

      // Update existing admin user
      await collection.updateOne(
        { _id: existingAdmin._id },
        {
          $set: {
            email: adminEmail,
            name: 'Administrator',
            password: hashedPassword,
            role: 'admin',
            updatedAt: new Date(),
          },
        }
      )

      const updatedAdmin = await collection.findOne({ _id: existingAdmin._id })
      console.log('✅ Admin user updated successfully!')
      console.log('   Email:', adminEmail)
      console.log('   Password:', adminPassword)
      console.log('   Role: admin')
      console.log('   User ID:', updatedAdmin?._id.toString())
    } else {
      // Create new admin user
      const result = await collection.insertOne({
        email: adminEmail,
        name: 'Administrator',
        password: hashedPassword,
        role: 'admin',
        phone: null,
        address: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const adminUser = await collection.findOne({ _id: result.insertedId })
      console.log('✅ Admin user created successfully!')
      console.log('   Email:', adminEmail)
      console.log('   Password:', adminPassword)
      console.log('   Role: admin')
      console.log('   User ID:', adminUser?._id.toString())
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error)
    process.exit(1)
  }
}

// Run seed
seedAdminUser()
  .then(() => {
    console.log('✨ Seed completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  })
