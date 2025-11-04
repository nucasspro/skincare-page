/**
 * Authentication and Authorization Utilities
 */

import type { UserRecord } from '@/lib/services/data-source.interface'
import { dataSource } from '@/lib/services/data-sources'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: string
}

/**
 * Get current user from session
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      console.log('[Auth] No session token found')
      return null
    }

    // Decode session token to get user info
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8')
    const [userId, expiresAtStr] = decoded.split(':')

    if (!userId || !expiresAtStr) {
      console.log('[Auth] Invalid session token format')
      return null
    }

    // Check if session has expired
    const expiresAt = parseInt(expiresAtStr, 10)
    if (Date.now() > expiresAt) {
      console.log('[Auth] Session expired')
      return null
    }

    // Get user from database
    const user = await dataSource.getUserById(userId)
    if (!user) {
      console.log(`[Auth] User not found with ID: ${userId}`)
      return null
    }

    console.log(`[Auth] Current user found: ${user.email} (${user.role})`)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  } catch (error) {
    console.error('[Auth] Error getting current user:', error)
    return null
  }
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

/**
 * Verify password
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<(UserRecord & { password?: string | null }) | null> {
  try {
    // Trim email to remove any whitespace
    const trimmedEmail = email.trim().toLowerCase()

    // Get user with password from MongoDB
    const mongoDataSource = dataSource as any
    if (typeof mongoDataSource.getUserByEmailWithPassword === 'function') {
      const user = await mongoDataSource.getUserByEmailWithPassword(trimmedEmail)

      if (!user) {
        console.log(`[Auth] User not found with email: ${trimmedEmail}`)
        return null
      }

      // Check if user has password
      if (!user.password) {
        console.log(`[Auth] User ${trimmedEmail} has no password`)
        return null
      }

      // Verify password
      const isValid = await verifyPassword(password, user.password)
      if (!isValid) {
        console.log(`[Auth] Invalid password for user: ${trimmedEmail}`)
        return null
      }

      console.log(`[Auth] User authenticated successfully: ${trimmedEmail}`)
      return user
    }

    console.log('[Auth] getUserByEmailWithPassword function not available')
    return null
  } catch (error) {
    console.error('Error authenticating user:', error)
    return null
  }
}

/**
 * Create session token
 */
export function createSessionToken(userId: string, expiresInHours: number = 2): string {
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000
  return Buffer.from(`${userId}:${expiresAt}`).toString('base64')
}
