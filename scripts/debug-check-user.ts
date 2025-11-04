/**
 * Debug script to check user in database
 * Usage: npx tsx scripts/debug-check-user.ts
 */

import 'dotenv/config'
import { getDb } from '@/lib/services/data-sources/mongodb/mongodb-data-source'
import bcrypt from 'bcryptjs'

async function checkUser() {
  try {
    console.log('🔍 Checking users in database...\n')

    const db = await getDb()
    const collection = db.collection('users')

    // Find all admin users
    const adminUsers = await collection.find({ role: 'admin' }).toArray()

    console.log(`Found ${adminUsers.length} admin user(s):\n`)

    adminUsers.forEach((user, index) => {
      console.log(`User ${index + 1}:`)
      console.log(`  Email: ${user.email}`)
      console.log(`  Name: ${user.name}`)
      console.log(`  Role: ${user.role}`)
      console.log(`  Has password: ${!!user.password}`)
      if (user.password) {
        // Test password verification
        bcrypt.compare('admin123', user.password).then(isValid => {
          console.log(`  Password 'admin123' is valid: ${isValid}`)
        })
      }
      console.log(`  ID: ${user._id}`)
      console.log('')
    })

    // Test specific email
    const testEmail = 'admin@gmail.com'
    console.log(`\n🔍 Looking for user with email: ${testEmail}`)
    const userByEmail = await collection.findOne({ email: testEmail })

    if (userByEmail) {
      console.log('✅ User found!')
      console.log(`  Email: ${userByEmail.email}`)
      console.log(`  Name: ${userByEmail.name}`)
      console.log(`  Role: ${userByEmail.role}`)
      console.log(`  Has password: ${!!userByEmail.password}`)

      if (userByEmail.password) {
        const isValid = await bcrypt.compare('admin123', userByEmail.password)
        console.log(`  Password 'admin123' is valid: ${isValid}`)
      }
      console.log(`  ID: ${userByEmail._id}`)
    } else {
      console.log('❌ User not found!')
    }

  } catch (error) {
    console.error('❌ Error checking user:', error)
    process.exit(1)
  }
}

checkUser()
  .then(() => {
    console.log('\n✨ Check completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Check failed:', error)
    process.exit(1)
  })
