import { categoryDataService } from '@/lib/services/category-data-service'
import { NextResponse } from 'next/server'

/**
 * Public Categories API
 * Read-only endpoint for client-side components
 * No authentication required
 */
export async function GET() {
  try {
    const categories = await categoryDataService.getAllCategories()
    return NextResponse.json({
      data: categories.map(c => ({
        ...c,
        id: String(c.id || ''), // Ensure id is always string
      }))
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
