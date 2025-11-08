import { apiClient } from '@/lib/utils/api-client'

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
    return apiClient.get<Comment[]>('/api/admin/comments', {
      defaultErrorMessage: 'Failed to fetch comments',
    })
  }

  /**
   * Get a single comment
   */
  async getComment(id: string): Promise<Comment> {
    return apiClient.get<Comment>(`/api/admin/comments/${id}`, {
      defaultErrorMessage: 'Failed to fetch comment',
    })
  }

  /**
   * Update an existing comment
   */
  async updateComment(id: string, commentData: CommentData): Promise<Comment> {
    return apiClient.put<Comment>(`/api/admin/comments/${id}`, commentData, {
      defaultErrorMessage: 'Failed to update comment',
    })
  }

  /**
   * Delete a comment
   */
  async deleteComment(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/comments/${id}`, {
      defaultErrorMessage: 'Failed to delete comment',
    })
  }
}

export const adminCommentService = new AdminCommentService()
