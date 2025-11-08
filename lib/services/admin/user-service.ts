import { apiClient } from '@/lib/utils/api-client'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  role: string
  createdAt: number
  updatedAt: number
}

interface UserData {
  email: string
  name: string
  phone?: string
  address?: string
  role?: string
}

class AdminUserService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/api/admin/users', {
      defaultErrorMessage: 'Failed to fetch users',
    })
  }

  /**
   * Create a new user
   */
  async createUser(userData: UserData): Promise<User> {
    return apiClient.post<User>('/api/admin/users', userData, {
      defaultErrorMessage: 'Failed to create user',
    })
  }

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: UserData): Promise<User> {
    return apiClient.put<User>(`/api/admin/users/${id}`, userData, {
      defaultErrorMessage: 'Failed to update user',
    })
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/users/${id}`, {
      defaultErrorMessage: 'Failed to delete user',
    })
  }
}

export const adminUserService = new AdminUserService()
