/**
 * Comment Data Service
 * NOTE: Comments are no longer supported in MongoDB schema.
 * This service returns empty results to maintain backward compatibility with client web.
 * All comment functionality should use Reviews instead.
 */

// Legacy interfaces for backward compatibility
export interface CommentRecord {
  id: string
  productId: string
  userId: string
  userName?: string | null
  userEmail?: string | null
  content: string
  rating: number
  status: string
  createdAt: number
  updatedAt: number
}

export interface CreateCommentData {
  productId: string
  userId: string
  userName?: string | null
  userEmail?: string | null
  content: string
  rating?: number
  status?: string
}

export interface UpdateCommentData extends Partial<CreateCommentData> {
  id: string
}

export class CommentDataService {
  async getAllComments(): Promise<CommentRecord[]> {
    // Return empty array - Comments no longer supported, use Reviews instead
    console.warn('⚠️  Comments are no longer supported. Use Reviews instead.')
    return []
  }

  async getCommentById(id: string): Promise<CommentRecord | null> {
    console.warn('⚠️  Comments are no longer supported. Use Reviews instead.')
    return null
  }

  async createComment(data: CreateCommentData): Promise<CommentRecord> {
    throw new Error(
      'Comments are no longer supported in MongoDB schema. Please use Reviews instead.'
    )
  }

  async updateComment(data: UpdateCommentData): Promise<CommentRecord> {
    throw new Error(
      'Comments are no longer supported in MongoDB schema. Please use Reviews instead.'
    )
  }

  async deleteComment(id: string): Promise<boolean> {
    console.warn('⚠️  Comments are no longer supported. Use Reviews instead.')
    return false
  }
}

export const commentDataService = new CommentDataService()
