/**
 * Typography utility classes
 * Common typography styles for consistent text styling across components
 */

/**
 * Hero headline style - Large, bold, uppercase text
 * Used for main headlines in hero sections and brand story
 * Uses Quicksand bold (same as product titles)
 */
export const heroHeadlineClass =
  "font-quicksand font-bold tracking-tight uppercase leading-[1.2] sm:leading-[1.3] text-2xl sm:text-3xl md:text-5xl lg:text-6xl"

/**
 * Get hero headline classes with custom text color
 * @param textColor - Tailwind text color class (e.g., "text-white", "text-gray-900")
 */
export function getHeroHeadlineClass(textColor: string = "text-gray-900"): string {
  return `${heroHeadlineClass} ${textColor}`
}
