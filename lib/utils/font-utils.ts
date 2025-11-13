/**
 * Font Utility Classes
 * Common font styles for consistent typography across the application
 *
 * Fonts:
 * - Air (normal): For main headings/key content
 * - Air (italic): For body content
 * - Navigation font: For navigation buttons
 * - Fragment: For decorative/design elements on rest pages
 *
 * Size Ratio:
 * - Key heading is 2-2.5x larger than body content
 */

/**
 * Font class for main headings/key content
 * Uses Air font (normal weight)
 * Size: text-4xl (36px) - approximately 2.25x larger than body content
 */
export const fontKeyHeading = "font-air font-normal text-4xl"

/**
 * Font class for body content
 * Uses Air font (italic style)
 * Size: text-base (16px)
 */
export const fontBodyContent = "font-air italic text-base"

/**
 * Font class for navigation buttons
 * Uses Air font (italic style)
 * Size: text-base (16px) or text-lg (18px)
 */
export const fontNavigation = "font-air italic text-base"

/**
 * Font class for decorative/design elements on rest pages
 * Uses Fragment font
 * Size: Variable, typically larger for decorative purposes
 */
export const fontDecorative = "font-fragment"

/**
 * Get font class for main headings/key content
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Combined font classes
 */
export function getKeyHeadingFont(additionalClasses: string = ""): string {
  return `${fontKeyHeading} ${additionalClasses}`.trim()
}

/**
 * Get font class for body content
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Combined font classes
 */
export function getBodyContentFont(additionalClasses: string = ""): string {
  return `${fontBodyContent} ${additionalClasses}`.trim()
}

/**
 * Get font class for navigation buttons
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Combined font classes
 */
export function getNavigationFont(additionalClasses: string = ""): string {
  return `${fontNavigation} ${additionalClasses}`.trim()
}

/**
 * Get font class for decorative/design elements
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Combined font classes
 */
export function getDecorativeFont(additionalClasses: string = ""): string {
  return `${fontDecorative} ${additionalClasses}`.trim()
}

/**
 * Font size presets
 * Key heading sizes are 2-2.5x larger than body content
 */
export const fontSizes = {
  /**
   * Key heading - Large (2.25x of body)
   * text-4xl = 36px (when body is 16px)
   */
  keyHeading: "text-4xl",

  /**
   * Key heading - Extra Large (2.5x of body)
   * text-5xl = 48px (when body is 16px)
   */
  keyHeadingXL: "text-5xl",

  /**
   * Key heading - Medium (2x of body)
   * text-3xl = 30px (when body is 16px)
   */
  keyHeadingMd: "text-3xl",

  /**
   * Body content - Base size
   * text-base = 16px
   */
  bodyContent: "text-base",

  /**
   * Body content - Large
   * text-lg = 18px
   */
  bodyContentLg: "text-lg",

  /**
   * Navigation - Base size
   * text-base = 16px
   */
  navigation: "text-base",

  /**
   * Navigation - Large
   * text-lg = 18px
   */
  navigationLg: "text-lg",
} as const

/**
 * Predefined font combinations for common use cases
 * Includes proper size ratios (key heading 2-2.5x larger than body)
 */
export const fontPresets = {
  /**
   * Main heading style - Large, bold, uppercase
   * Size: text-4xl (36px) - 2.25x larger than body
   */
  mainHeading: `${fontKeyHeading} font-bold uppercase tracking-tight`,

  /**
   * Main heading style - Extra Large
   * Size: text-5xl (48px) - 2.5x larger than body
   */
  mainHeadingXL: `font-air font-normal text-5xl font-bold uppercase tracking-tight`,

  /**
   * Main heading style - Medium
   * Size: text-3xl (30px) - 2x larger than body
   */
  mainHeadingMd: `font-air font-normal text-3xl font-bold uppercase tracking-tight`,

  /**
   * Subheading style - Medium size
   * Size: text-2xl (24px) - 1.5x larger than body
   */
  subHeading: `font-air font-normal text-2xl font-semibold`,

  /**
   * Body text style - Regular content
   * Size: text-base (16px)
   */
  bodyText: `${fontBodyContent} leading-relaxed`,

  /**
   * Body text style - Large
   * Size: text-lg (18px)
   */
  bodyTextLg: `font-air italic text-lg leading-relaxed`,

  /**
   * Navigation link style
   * Size: text-base (16px)
   */
  navLink: `${fontNavigation} font-medium`,

  /**
   * Navigation button style
   * Size: text-base (16px)
   */
  navButton: `${fontNavigation} font-semibold`,

  /**
   * Navigation button style - Large
   * Size: text-lg (18px)
   */
  navButtonLg: `font-air italic text-lg font-semibold`,

  /**
   * Decorative text style - For design elements
   * Size: Variable, typically larger
   */
  decorative: `${fontDecorative} font-normal text-2xl`,

  /**
   * Decorative text style - Large
   * Size: text-4xl (36px)
   */
  decorativeLg: `${fontDecorative} font-normal text-4xl`,

  /**
   * Tag/label style - Small decorative text
   * Size: text-sm (14px)
   */
  tag: `font-air italic text-sm uppercase tracking-wider`,

  /**
   * Slogan style - Large decorative text
   * Size: text-3xl (30px)
   */
  slogan: `${fontDecorative} font-normal text-3xl`,
} as const

/**
 * Get a font preset by name
 * @param presetName - Name of the preset
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Combined font classes
 */
export function getFontPreset(
  presetName: keyof typeof fontPresets,
  additionalClasses: string = ""
): string {
  return `${fontPresets[presetName]} ${additionalClasses}`.trim()
}
