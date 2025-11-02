import { commentDataService } from '@/lib/services/comment-data-service'
import { NextResponse } from 'next/server'

// GET all comments
export async function GET() {
  try {
    const comments = await commentDataService.getAllComments()
    return NextResponse.json({
      data: comments.map(c => ({ ...c, id: String(c.id || '') }))
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST create new comment
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, userId, userName, userEmail, content, rating, status } = body

    if (!productId || !content) {
      return NextResponse.json(
        { error: 'Product ID and content are required' },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const comment = await commentDataService.createComment({
      productId,
      userId,
      userName: userName || null,
      userEmail: userEmail || null,
      content,
      rating: rating || 5,
      status: status || 'pending',
    })

    return NextResponse.json(
      { message: 'Comment created successfully', data: { ...comment, id: String(comment.id || '') } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create comment' },
      { status: 500 }
    )
  }
}
