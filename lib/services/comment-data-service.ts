/**
 * Comment Data Service
 * Service layer với error handling (no caching)
 */

import type { CreateCommentData, CommentRecord, UpdateCommentData } from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

export class CommentDataService {
  async getAllComments(): Promise<CommentRecord[]> {
    try {
      console.log('📥 Fetching comments from data source...')
      const comments = await dataSource.getAllComments()
      return comments
    } catch (error) {
      console.error('Error fetching comments:', error)
      throw error
    }
  }

  async getCommentById(id: string): Promise<CommentRecord | null> {
    try {
      const comment = await dataSource.getCommentById(id)
      return comment
    } catch (error) {
      console.error(`Error fetching comment ${id}:`, error)
      throw error
    }
  }

  async createComment(data: CreateCommentData): Promise<CommentRecord> {
    try {
      const comment = await dataSource.createComment(data)
      return comment
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  }

  async updateComment(data: UpdateCommentData): Promise<CommentRecord> {
    try {
      const comment = await dataSource.updateComment(data)
      return comment
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
    }
  }

  async deleteComment(id: string): Promise<boolean> {
    try {
      const result = await dataSource.deleteComment(id)
      return result
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  }
}

export const commentDataService = new CommentDataService()
