"use client"

import { CONTACT_SETTING_KEYS, SETTING_GROUPS, SOCIAL_SETTING_KEYS } from '@/lib/constants/setting-keys'
import type { Setting } from '@/lib/types/setting'
import { useEffect, useState } from 'react'

// Request deduplication: if multiple components call useSettings() at the same time,
// only one API request will be made and all will wait for the same result
let settingsCachePromise: Promise<Setting[]> | null = null
let settingsCache: Setting[] | null = null
let settingsCacheTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache

async function fetchSettingsWithDeduplication(group?: string): Promise<Setting[]> {
  // Check cache first
  if (settingsCache && Date.now() - settingsCacheTime < CACHE_DURATION) {
    let filtered = settingsCache
    if (group) {
      filtered = filtered.filter((s) => s.group === group)
    }
    return filtered
  }

  // If there's already a fetch in progress, wait for it (deduplication)
  if (settingsCachePromise) {
    return settingsCachePromise
  }

  // Start new fetch
  settingsCachePromise = (async () => {
    try {
      const url = '/api/settings'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }
      const data = await response.json()
      const settings = (data.data || []) as Setting[]

      // Update cache
      settingsCache = settings
      settingsCacheTime = Date.now()

      return settings
    } finally {
      // Clear promise so next call can start a new fetch
      settingsCachePromise = null
    }
  })()

  return settingsCachePromise
}

/**
 * Hook to fetch public settings from database
 * Use this in client components to get public settings
 */
export function useSettings(group?: string) {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true)
        setError(null)

        const fetchedSettings = await fetchSettingsWithDeduplication(group)
        setSettings(fetchedSettings)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch settings'))
        console.error('Error fetching settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [group])

  return { settings, loading, error }
}

/**
 * Hook to get a single setting value by key
 */
export function useSetting(key: string) {
  const [value, setValue] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSetting() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/settings?key=${encodeURIComponent(key)}`)
        if (!response.ok) {
          if (response.status === 404) {
            setValue(null)
            return
          }
          throw new Error('Failed to fetch setting')
        }
        const data = await response.json()
        setValue(data.data?.value || null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch setting'))
        console.error('Error fetching setting:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSetting()
  }, [key])

  return { value, loading, error }
}

/**
 * Hook to get contact settings (zalo, hotline, messenger)
 */
export function useContactSettings() {
  // Get settings from both 'contact' and 'social' groups
  const { settings: contactSettings, loading: contactLoading } = useSettings(SETTING_GROUPS.CONTACT)
  const { settings: socialSettings, loading: socialLoading } = useSettings(SETTING_GROUPS.SOCIAL)

  const allSettings = [...contactSettings, ...socialSettings]
  const loading = contactLoading || socialLoading

  const contactInfo = {
    zalo: allSettings.find(s => s.key === SOCIAL_SETTING_KEYS.ZALO)?.value || '',
    hotline: allSettings.find(s => s.key === CONTACT_SETTING_KEYS.PHONE)?.value || '',
    messenger: allSettings.find(s => s.key === SOCIAL_SETTING_KEYS.FACEBOOK)?.value || '',
  }

  return { contactInfo, loading }
}
