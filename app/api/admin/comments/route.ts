import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET all comments
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        product: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform to match expected format
    const formattedComments = comments.map((comment) => ({
      ...comment,
      productName: comment.product?.name || null,
      userName: comment.user?.name || comment.userName || null,
      userEmail: comment.user?.email || comment.userEmail || null,
    }))

    return NextResponse.json({ data: formattedComments })
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

    const now = Math.floor(Date.now() / 1000)

    // userId is required in schema, so we need to handle it properly
    // If no userId provided, we might need to create a guest user or handle differently
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const comment = await prisma.comment.create({
      data: {
        productId,
        userId,
        userName: userName || null,
        userEmail: userEmail || null,
        content,
        rating: rating || 5,
        status: status || 'pending',
        createdAt: now,
        updatedAt: now,
      },
    })

    return NextResponse.json(
      { message: 'Comment created successfully', id: comment.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
