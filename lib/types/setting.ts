/**
 * Setting Types and Interfaces
 */

export enum SettingType {
  STRING = 'string',
  NUMBER = 'number',
  IMAGE = 'image',
  BOOLEAN = 'boolean',
  JSON = 'json',
}

export interface Setting {
  id: string
  key: string
  value: string
  type: SettingType
  description?: string | null
  group?: string | null
  isPublic: boolean
  createdAt: number
  updatedAt: number
}

export interface CreateSettingData {
  key: string
  value: string
  type: SettingType
  description?: string
  group?: string
  isPublic?: boolean
}

export interface UpdateSettingData {
  value?: string
  type?: SettingType
  description?: string
  group?: string
  isPublic?: boolean
}

export interface SettingRecord {
  _id: string
  key: string
  value: string
  type: SettingType
  description?: string | null
  group?: string | null
  isPublic: boolean
  createdAt: number
  updatedAt: number
}
