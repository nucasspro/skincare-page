/**
 * Migration Script: Add reviewDate field to existing reviews
 * This script calculates reviewDate from createdAt for existing reviews
 *
 * Usage: npx tsx scripts/migrations/add-review-date-field.ts
 */

import 'dotenv/config'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || process.env.MONGODB_URI?.split('/').pop() || ''

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment variables')
  process.exit(1)
}

/**
 * Convert createdAt timestamp to relative date string
 * Examples: "2 tuần trước", "1 tháng trước", "3 tuần trước"
 */
function calculateReviewDate(createdAt: Date): string {
  const now = Date.now()
  const created = createdAt.getTime()
  const diffMs = now - created
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffDays < 7) {
    if (diffDays === 0) return 'Hôm nay'
    if (diffDays === 1) return '1 ngày trước'
    return `${diffDays} ngày trước`
  } else if (diffWeeks < 4) {
    if (diffWeeks === 1) return '1 tuần trước'
    return `${diffWeeks} tuần trước`
  } else if (diffMonths < 12) {
    if (diffMonths === 1) return '1 tháng trước'
    return `${diffMonths} tháng trước`
  } else {
    const diffYears = Math.floor(diffMonths / 12)
    if (diffYears === 1) return '1 năm trước'
    return `${diffYears} năm trước`
  }
}

async function migrate() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('Connected to MongoDB\n')

    const db = client.db(MONGODB_DB_NAME)
    const reviewsCollection = db.collection('reviews')

    // Find all reviews without reviewDate field
    const reviewsWithoutDate = await reviewsCollection
      .find({
        $or: [
          { reviewDate: { $exists: false } },
          { reviewDate: null },
          { reviewDate: '' }
        ]
      })
      .toArray()

    if (reviewsWithoutDate.length === 0) {
      console.log('✓ All reviews already have reviewDate field')
      return
    }

    console.log(`Found ${reviewsWithoutDate.length} reviews without reviewDate\n`)

    let updatedCount = 0
    let errorCount = 0

    for (const review of reviewsWithoutDate) {
      try {
        const createdAt = review.createdAt instanceof Date
          ? review.createdAt
          : new Date(review.createdAt || Date.now())

        const reviewDate = calculateReviewDate(createdAt)

        await reviewsCollection.updateOne(
          { _id: review._id },
          {
            $set: {
              reviewDate: reviewDate,
              updatedAt: new Date()
            }
          }
        )

        updatedCount++
        console.log(`✓ Updated review ${review._id}: "${reviewDate}"`)
      } catch (error) {
        errorCount++
        console.error(`✗ Error updating review ${review._id}:`, error)
      }
    }

    console.log(`\n✅ Migration completed!`)
    console.log(`   Updated: ${updatedCount}`)
    if (errorCount > 0) {
      console.log(`   Errors: ${errorCount}`)
    }
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('\nDisconnected from MongoDB')
  }
}

migrate()
