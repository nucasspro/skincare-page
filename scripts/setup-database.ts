/**
 * Database Setup Script
 * Complete setup for a new MongoDB database
 *
 * This script will:
 * 1. Generate Prisma Client
 * 2. Push Prisma schema to MongoDB (create collections and indexes)
 * 3. Run migrations to add required fields (soft delete)
 * 4. Seed initial data in correct order:
 *    - Categories (no dependencies)
 *    - Products (no dependencies - category is string)
 *    - Reviews (depends on Products - auto-maps productId)
 *    - Orders (depends on Products - auto-maps productId in items)
 *    - Admin User (no dependencies)
 *
 * Foreign Key References:
 * - reviews.productId → products._id (auto-mapped by seed script)
 * - orders.items[].productId → products._id (auto-mapped by seed script)
 * - orders.userId → users._id (optional, can be null)
 *
 * Usage: npx tsx scripts/setup-database.ts
 * Or: pnpm setup:db
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

async function runCommand(command: string, description: string, allowFailure = false) {
  console.log(`📦 ${description}...`)
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() })
    console.log(`✅ ${description} completed\n`)
  } catch (error: any) {
    if (allowFailure) {
      console.log(`⚠️  ${description} failed but continuing (this is OK if Prisma client already exists)\n`)
      return
    }
    console.error(`❌ ${description} failed:`, error)
    throw error
  }
}

async function setupDatabase() {
  try {
    // Step 1: Generate Prisma Client
    // Note: On Windows, this may fail with EPERM if Prisma client is in use
    // This is OK - we'll continue if it fails (client might already be generated)
    await runCommand('pnpm db:generate', 'Generating Prisma Client', true)

    // Step 2: Push schema to MongoDB (create collections and indexes)
    await runCommand('pnpm db:push', 'Pushing Prisma schema to MongoDB')

    // Step 3: Run migrations
    console.log('📦 Running migrations...')
    await runCommand('pnpm migrate:soft-delete', 'Adding soft delete fields (isDeleted, deletedAt)')
    // Note: migrate:review-date is not needed for new database as reviews will be seeded with reviewDate
    console.log('✅ Migrations completed\n')

    // Step 4: Seed data (IMPORTANT: Must follow this order due to foreign key dependencies)
    console.log('🌱 Seeding data...')
    console.log('   Note: Reviews and Orders will auto-map productId to ensure foreign keys are correct\n')

    await runCommand('pnpm seed:categories', 'Seeding categories (no dependencies)')
    await runCommand('pnpm seed:products', 'Seeding products (no dependencies - category is string)')
    await runCommand('pnpm seed:reviews', 'Seeding reviews (auto-maps productId → products._id)')
    await runCommand('pnpm seed:orders', 'Seeding orders (auto-maps productId in items → products._id)')
    await runCommand('pnpm seed:admin', 'Seeding admin user (no dependencies)')
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
