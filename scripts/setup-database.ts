/**
 * Database Setup Script
 * Complete setup for a new MongoDB database
 *
 * This script will:
 * 1. Push Prisma schema to create collections and indexes
 * 2. Run migrations to add required fields
 * 3. Seed initial data (categories, products, reviews, orders, admin user)
 *
 * Usage: npx tsx scripts/setup-database.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { execSync } from 'child_process'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment variables')
  console.error('   Please set MONGODB_URI in .env or .env.local')
  process.exit(1)
}

console.log('🚀 Starting database setup...\n')

async function runCommand(command: string, description: string) {
  console.log(`📦 ${description}...`)
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() })
    console.log(`✅ ${description} completed\n`)
  } catch (error) {
    console.error(`❌ ${description} failed:`, error)
    throw error
  }
}

async function setupDatabase() {
  try {
    // Step 1: Generate Prisma Client
    await runCommand('pnpm db:generate', 'Generating Prisma Client')

    // Step 2: Push schema to MongoDB (create collections and indexes)
    await runCommand('pnpm db:push', 'Pushing Prisma schema to MongoDB')

    // Step 3: Run migrations
    console.log('📦 Running migrations...')
    await runCommand('pnpm migrate:soft-delete', 'Adding soft delete fields')
    console.log('✅ Migrations completed\n')

    // Step 4: Seed data
    console.log('🌱 Seeding data...')
    await runCommand('pnpm seed:categories', 'Seeding categories')
    await runCommand('pnpm seed:products', 'Seeding products')
    await runCommand('pnpm seed:reviews', 'Seeding reviews')
    await runCommand('pnpm seed:orders', 'Seeding orders')
    await runCommand('pnpm seed:admin', 'Seeding admin user')
    console.log('✅ Data seeding completed\n')

    console.log('🎉 Database setup completed successfully!')
    console.log('\n📊 Next steps:')
    console.log('   - View data: pnpm db:studio')
    console.log('   - Start dev server: pnpm dev')
  } catch (error) {
    console.error('\n❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()
