/**
 * Session Validation Utilities
 * Shared utilities for session token validation and decoding
 */

export interface DecodedSessionToken {
  userId: string
  expiresAt: number
}

/**
 * Decode session token safely
 * Returns decoded token data or null if invalid
 */
export function decodeSessionToken(token: string | undefined): DecodedSessionToken | null {
  if (!token) {
    return null
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [userId, expiresAtStr] = decoded.split(':')

    if (!userId || !expiresAtStr) {
      return null
    }

    const expiresAt = parseInt(expiresAtStr, 10)
    if (isNaN(expiresAt)) {
      return null
    }

    return {
      userId,
      expiresAt,
    }
  } catch (error) {
    // Invalid token format
    return null
  }
}

/**
 * Check if session has expired
 */
export function isSessionExpired(expiresAt: number): boolean {
  return Date.now() > expiresAt
}

/**
 * Validate session token
 * Checks if token is valid and not expired
 */
export function validateSessionToken(token: string | undefined): boolean {
  const decoded = decodeSessionToken(token)
  if (!decoded) {
    return false
  }

  return !isSessionExpired(decoded.expiresAt)
}
