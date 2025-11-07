/**
 * Generate URL-friendly slug from text
 * Converts Vietnamese text with diacritics to URL-safe slug
 *
 * @param text - Text to convert to slug
 * @returns URL-friendly slug string
 *
 * @example
 * generateSlug("Sản phẩm đẹp") // "san-pham-dep"
 * generateSlug("Cellic Bright Matte Sunscreen") // "cellic-bright-matte-sunscreen"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}
