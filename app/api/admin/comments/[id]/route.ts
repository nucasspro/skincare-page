import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET single comment
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const comment = await prisma.comment.findUnique({
      where: { id },
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
    })

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Transform to match expected format
    const formattedComment = {
      ...comment,
      productName: comment.product?.name || null,
      userName: comment.user?.name || comment.userName || null,
      userEmail: comment.user?.email || comment.userEmail || null,
    }

    return NextResponse.json({ data: formattedComment })
  } catch (error) {
    console.error('Error fetching comment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comment' },
      { status: 500 }
    )
  }
}

// PUT update comment
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { content, rating, status } = body

    const existing = await prisma.comment.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    const now = Math.floor(Date.now() / 1000)

    await prisma.comment.update({
      where: { id },
      data: {
        content,
        rating: rating || 5,
        status: status || 'pending',
        updatedAt: now,
      },
    })

    return NextResponse.json({ message: 'Comment updated successfully' })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

// DELETE comment
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    try {
      await prisma.comment.delete({
        where: { id },
      })
      return NextResponse.json({ message: 'Comment deleted successfully' })
    } catch (error: any) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Comment not found' },
          { status: 404 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
