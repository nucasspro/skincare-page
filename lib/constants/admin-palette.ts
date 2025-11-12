/**
 * Admin Palette Colors
 * Soft, neutral colors for admin interface
 * Only used in admin pages, does not affect client web
 */

export const ADMIN_PALETTE = {
  taupe: '#C9C6BF',
  beige: '#D7CEC9',
  coolGray: '#D4D5D0',
  neutralGray: '#D3D3D3',
  lavender: '#D9DCE3',
} as const

export const ADMIN_PALETTE_ARRAY = [
  ADMIN_PALETTE.taupe,
  ADMIN_PALETTE.beige,
  ADMIN_PALETTE.coolGray,
  ADMIN_PALETTE.neutralGray,
  ADMIN_PALETTE.lavender,
] as const

// Utility function to get color by index
export const getAdminPaletteColor = (index: number): string => {
  return ADMIN_PALETTE_ARRAY[index % ADMIN_PALETTE_ARRAY.length]
}
