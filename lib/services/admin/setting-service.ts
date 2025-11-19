/**
 * Admin Setting Service
 * Service layer for managing settings
 */

import type { CreateSettingData, Setting, UpdateSettingData } from '@/lib/types/setting'
import { SettingType } from '@/lib/types/setting'
import { apiClient } from '@/lib/utils/api-client'

class AdminSettingService {
  /**
   * Get all settings
   * @param group Optional group filter
   */
  async getAllSettings(group?: string): Promise<Setting[]> {
    const url = group ? `/api/admin/settings?group=${encodeURIComponent(group)}` : '/api/admin/settings'
    return apiClient.get<Setting[]>(url, {
      defaultErrorMessage: 'Failed to fetch settings',
    })
  }

  /**
   * Get a single setting by key
   */
  async getSetting(key: string): Promise<Setting | null> {
    try {
      return await apiClient.get<Setting>(`/api/admin/settings/${encodeURIComponent(key)}`, {
        defaultErrorMessage: 'Failed to fetch setting',
      })
    } catch (error: any) {
      if (error.status === 404) {
        return null
      }
      throw error
    }
  }

  /**
   * Create a new setting
   */
  async createSetting(data: CreateSettingData): Promise<Setting> {
    return apiClient.post<Setting>('/api/admin/settings', data, {
      defaultErrorMessage: 'Failed to create setting',
    })
  }

  /**
   * Update an existing setting
   */
  async updateSetting(key: string, data: UpdateSettingData): Promise<Setting> {
    return apiClient.put<Setting>(`/api/admin/settings/${encodeURIComponent(key)}`, data, {
      defaultErrorMessage: 'Failed to update setting',
    })
  }

  /**
   * Delete a setting
   */
  async deleteSetting(key: string): Promise<void> {
    await apiClient.delete(`/api/admin/settings/${encodeURIComponent(key)}`, {
      defaultErrorMessage: 'Failed to delete setting',
    })
  }

  /**
   * Get setting value with type parsing
   * @param key Setting key
   * @param defaultValue Default value if setting not found
   */
  async getSettingValue<T = any>(key: string, defaultValue?: T): Promise<T | null> {
    const setting = await this.getSetting(key)
    if (!setting) {
      return defaultValue ?? null
    }

    return this.parseSettingValue<T>(setting)
  }

  /**
   * Parse setting value based on type
   */
  parseSettingValue<T = any>(setting: Setting): T {
    switch (setting.type) {
      case SettingType.NUMBER:
        const num = parseFloat(setting.value)
        return (isNaN(num) ? 0 : num) as T
      case SettingType.BOOLEAN:
        return (setting.value === 'true' || setting.value === '1') as T
      case SettingType.JSON:
        try {
          return JSON.parse(setting.value) as T
        } catch {
          return setting.value as T
        }
      case SettingType.IMAGE:
      case SettingType.STRING:
      default:
        return setting.value as T
    }
  }
}

export const adminSettingService = new AdminSettingService()
