/**
 * Setting Keys Constants
 * Centralized definition of all setting keys used throughout the application
 * This ensures consistency and makes it easier to manage settings
 */

/**
 * Contact Settings Keys
 */
export const CONTACT_SETTING_KEYS = {
  PHONE: 'contact_phone',
  EMAIL: 'contact_email',
  ADDRESS: 'contact_address',
} as const

/**
 * Social Media Settings Keys
 */
export const SOCIAL_SETTING_KEYS = {
  FACEBOOK: 'social_facebook',
  INSTAGRAM: 'social_instagram',
  ZALO: 'social_zalo',
} as const

/**
 * SEO Settings Keys
 */
export const SEO_SETTING_KEYS = {
  SITE_TITLE: 'site_title',
  SITE_DESCRIPTION: 'site_description',
  OG_IMAGE: 'og_image',
} as const

/**
 * General Settings Keys
 */
export const GENERAL_SETTING_KEYS = {
  FREE_SHIPPING_THRESHOLD: 'free_shipping_threshold',
  RETURN_DAYS: 'return_days',
  MAINTENANCE_MODE: 'maintenance_mode',
} as const

/**
 * All Setting Keys
 */
export const SETTING_KEYS = {
  ...CONTACT_SETTING_KEYS,
  ...SOCIAL_SETTING_KEYS,
  ...SEO_SETTING_KEYS,
  ...GENERAL_SETTING_KEYS,
} as const

/**
 * Setting Groups
 */
export const SETTING_GROUPS = {
  CONTACT: 'contact',
  SOCIAL: 'social',
  SEO: 'seo',
  GENERAL: 'general',
  APPEARANCE: 'appearance',
} as const

/**
 * Type for setting key values
 */
export type SettingKey = typeof SETTING_KEYS[keyof typeof SETTING_KEYS]

/**
 * Type for setting group values
 */
export type SettingGroup = typeof SETTING_GROUPS[keyof typeof SETTING_GROUPS]
