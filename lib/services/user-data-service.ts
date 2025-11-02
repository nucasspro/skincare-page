/**
 * User Data Service
 * Service layer với error handling (no caching)
 */

import type { CreateUserData, UserRecord, UpdateUserData } from '@/lib/services/data-sources'
import { dataSource } from '@/lib/services/data-sources'

export class UserDataService {
  async getAllUsers(): Promise<UserRecord[]> {
    try {
      console.log('📥 Fetching users from data source...')
      const users = await dataSource.getAllUsers()
      return users
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  async getUserById(id: string): Promise<UserRecord | null> {
    try {
      const user = await dataSource.getUserById(id)
      return user
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error
    }
  }

  async createUser(data: CreateUserData): Promise<UserRecord> {
    try {
      const user = await dataSource.createUser(data)
      return user
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async updateUser(data: UpdateUserData): Promise<UserRecord> {
    try {
      const user = await dataSource.updateUser(data)
      return user
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await dataSource.deleteUser(id)
      return result
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }
}

export const userDataService = new UserDataService()
