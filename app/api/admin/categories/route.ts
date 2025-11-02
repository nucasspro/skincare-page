import { categoryDataService } from '@/lib/services/category-data-service'
import { NextResponse } from 'next/server'

// GET all categories
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

// POST create new category
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      )
    }

    const category = await categoryDataService.createCategory({
      name,
      description: description || null,
    })

    return NextResponse.json(
      { message: 'Category created successfully', data: { ...category, id: String(category.id || '') } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    )
  }
}
