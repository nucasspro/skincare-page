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
    const response = await fetch('/api/admin/users')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const data = await response.json()
    return data.data || []
  }

  /**
   * Create a new user
   */
  async createUser(userData: UserData): Promise<User> {
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to create user' }))
      throw new Error(error.error || 'Failed to create user')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: UserData): Promise<User> {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update user' }))
      throw new Error(error.error || 'Failed to update user')
    }

    const data = await response.json()
    return data.data
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete user' }))
      throw new Error(error.error || 'Failed to delete user')
    }
  }
}

export const adminUserService = new AdminUserService()
