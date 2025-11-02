import { commentDataService } from '@/lib/services/comment-data-service'
import { NextResponse } from 'next/server'

// GET single comment
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const comment = await commentDataService.getCommentById(id)

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: { ...comment, id: String(comment.id || '') } })
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

    const updateData: any = { id }
    if (content !== undefined) updateData.content = content
    if (rating !== undefined) updateData.rating = rating
    if (status !== undefined) updateData.status = status

    const comment = await commentDataService.updateComment(updateData)

    return NextResponse.json({
      message: 'Comment updated successfully',
      data: { ...comment, id: String(comment.id || '') }
    })
  } catch (error: any) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update comment' },
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
    const success = await commentDataService.deleteComment(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
