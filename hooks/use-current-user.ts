import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface CurrentUser {
  id: string
  email: string
  name: string
  role: string
}

interface UseCurrentUserReturn {
  currentUser: CurrentUser | null
  loading: boolean
  error: string | null
  isAdmin: boolean
  canDelete: boolean
  canCreate: boolean
  refresh: () => Promise<void>
}

export function useCurrentUser(): UseCurrentUserReturn {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCurrentUser = async (showErrorToast = false) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/auth/me')
      if (response.ok) {
        const data = await response.json()
        setCurrentUser(data.user)
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || 'Không thể lấy thông tin người dùng'
        setError(errorMessage)
        if (showErrorToast) {
          toast.error(errorMessage)
        }
      }
    } catch (err) {
      const errorMessage = 'Không thể lấy thông tin người dùng'
      setError(errorMessage)
      console.error('Error fetching current user:', err)
      if (showErrorToast) {
        toast.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const isAdmin = currentUser?.role === 'admin'
  const canDelete = isAdmin
  const canCreate = isAdmin

  const refresh = async () => {
    await fetchCurrentUser(true)
  }

  return {
    currentUser,
    loading,
    error,
    isAdmin,
    canDelete,
    canCreate,
    refresh,
  }
}
