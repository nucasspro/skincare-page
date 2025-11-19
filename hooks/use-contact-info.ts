"use client"

import { CONTACT_SETTING_KEYS } from '@/lib/constants/setting-keys'
import { useEffect, useState } from 'react'

const CONTACT_INFO_STORAGE_KEY = 'cellic_contact_info'
const CONTACT_INFO_CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface ContactInfo {
  phone: string
  email: string
  address: string
  timestamp: number
}

/**
 * Hook to get contact information (phone, email, address) with local storage caching
 * Loads from local storage first, fetches from API if not available or expired
 */
export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<{
    phone: string
    email: string
    address: string
  }>({
    phone: '-',
    email: '-',
    address: '-',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContactInfo() {
      try {
        setLoading(true)

        // Try to load from local storage first
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(CONTACT_INFO_STORAGE_KEY)
          if (stored) {
            try {
              const parsed: ContactInfo = JSON.parse(stored)
              const now = Date.now()

              // Check if cache is still valid (within 24 hours)
              if (parsed.timestamp && now - parsed.timestamp < CONTACT_INFO_CACHE_DURATION) {
                setContactInfo({
                  phone: parsed.phone || '-',
                  email: parsed.email || '-',
                  address: parsed.address || '-',
                })
                setLoading(false)
                return // Use cached data
              }
            } catch (e) {
              // Invalid stored data, continue to fetch from API
              console.warn('Failed to parse stored contact info:', e)
            }
          }
        }

        // Fetch from API if no valid cache
        const response = await fetch('/api/settings?group=contact')
        if (!response.ok) {
          throw new Error('Failed to fetch contact settings')
        }

        const data = await response.json()
        const settings = (data.data || []) as Array<{ key: string; value: string }>

        const phone = settings.find((s) => s.key === CONTACT_SETTING_KEYS.PHONE)?.value || '-'
        const email = settings.find((s) => s.key === CONTACT_SETTING_KEYS.EMAIL)?.value || '-'
        const address = settings.find((s) => s.key === CONTACT_SETTING_KEYS.ADDRESS)?.value || '-'

        const info = { phone, email, address }

        // Save to local storage
        if (typeof window !== 'undefined') {
          const toStore: ContactInfo = {
            ...info,
            timestamp: Date.now(),
          }
          localStorage.setItem(CONTACT_INFO_STORAGE_KEY, JSON.stringify(toStore))
        }

        setContactInfo(info)
      } catch (error) {
        console.error('Error loading contact info:', error)
        // On error, try to use cached data even if expired
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(CONTACT_INFO_STORAGE_KEY)
          if (stored) {
            try {
              const parsed: ContactInfo = JSON.parse(stored)
              setContactInfo({
                phone: parsed.phone || '-',
                email: parsed.email || '-',
                address: parsed.address || '-',
              })
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      } finally {
        setLoading(false)
      }
    }

    loadContactInfo()
  }, [])

  return { contactInfo, loading }
}
