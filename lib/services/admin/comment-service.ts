export interface Comment {
  id: string
  productId: string
  productName?: string
  userId: string
  userName?: string
  userEmail?: string
  content: string
  rating: number
  status: string
  createdAt: number
  updatedAt: number
}

interface CommentData {
  content?: string
  rating?: number
  status?: string
}

class AdminCommentService {
  /**
   * Get all comments
   */
  async getAllComments(): Promise<Comment[]> {
    const response = await fetch('/api/admin/comments')
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    const data = await response.json()
    return data.data || []
  }

  /**
   * Get a single comment
   */
  async getComment(id: string): Promise<Comment> {
    const response = await fetch(`/api/admin/comments/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch comment')
    }
    const data = await response.json()
    return data.data
  }

  /**
   * Update an existing comment
   */
  async updateComment(id: string, commentData: CommentData): Promise<Comment> {
    const response = await fetch(`/api/admin/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update comment' }))
      throw new Error(error.error || 'Failed to update comment')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Delete a comment
   */
  async deleteComment(id: string): Promise<void> {
    const response = await fetch(`/api/admin/comments/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete comment' }))
      throw new Error(error.error || 'Failed to delete comment')
    }
  }
}

export const adminCommentService = new AdminCommentService()
