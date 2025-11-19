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
 * Uses Quicksand font (bold weight)
 * Size: text-4xl (36px) - approximately 2.25x larger than body content
 */
export const fontKeyHeading = "font-quicksand font-bold text-4xl"

/**
 * Font class for body content
 * Uses Quicksand font (regular weight)
 * Size: text-base (16px)
 */
export const fontBodyContent = "font-quicksand font-normal text-base"

/**
 * Font class for navigation buttons
 * Uses Quicksand font (semibold weight)
 * Size: text-base (16px) or text-lg (18px)
 */
export const fontNavigation = "font-quicksand font-medium text-base"

/**
 * Font class for decorative/design elements on rest pages
 * Uses Fragment font
 * Size: Variable, typically larger for decorative purposes
 */
export const fontDecorative = "font-fragment"

/**
 * Font class for category labels/filter chips
 * Uses Kodchasan font (light)
 */
export const fontCategory = "font-kodchasan font-light"

/**
 * Font class for hero headings in video section
 * Uses Aeonik Extended Pro (local font)
 */
export const fontHeroVideoHeading = "font-hero-video font-normal"

/**
 * Font class for hero slogan in video section
 * Uses Quicksand variable font
 */
export const fontHeroVideoSlogan = "font-quicksand font-light"

/**
 * Font class for product titles
 * Uses Quicksand variable font, bold weight
 */
export const fontProductTitle = "font-quicksand font-bold"

/**
 * Font class for product descriptions
 * Uses Quicksand variable font
 */
export const fontProductDescription = "font-quicksand font-normal"

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
 * Get font class for category labels
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Combined font classes
 */
export function getCategoryFont(additionalClasses: string = ""): string {
  return `${fontCategory} ${additionalClasses}`.trim()
}

/**
 * Get font class for hero video heading
 */
export function getHeroVideoHeadingFont(additionalClasses: string = ""): string {
  return `${fontHeroVideoHeading} ${additionalClasses}`.trim()
}

/**
 * Get font class for hero video slogan
 */
export function getHeroVideoSloganFont(additionalClasses: string = ""): string {
  return `${fontHeroVideoSlogan} ${additionalClasses}`.trim()
}

/**
 * Get font class for product titles
 */
export function getProductTitleFont(additionalClasses: string = ""): string {
  return `${fontProductTitle} ${additionalClasses}`.trim()
}

/**
 * Get font class for product descriptions
 */
export function getProductDescriptionFont(additionalClasses: string = ""): string {
  return `${fontProductDescription} ${additionalClasses}`.trim()
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
  mainHeading: `${fontKeyHeading} uppercase tracking-tight`,

  /**
   * Main heading style - Extra Large
   * Size: text-5xl (48px) - 2.5x larger than body
   */
  mainHeadingXL: `font-quicksand font-bold text-5xl uppercase tracking-tight`,

  /**
   * Main heading style - Medium
   * Size: text-3xl (30px) - 2x larger than body
   */
  mainHeadingMd: `font-quicksand font-bold text-3xl uppercase tracking-tight`,

  /**
   * Subheading style - Medium size
   * Size: text-2xl (24px) - 1.5x larger than body
   */
  subHeading: `font-quicksand font-semibold text-2xl`,

  /**
   * Body text style - Regular content
   * Size: text-base (16px)
   */
  bodyText: `${fontBodyContent} leading-relaxed`,

  /**
   * Body text style - Large
   * Size: text-lg (18px)
   */
  bodyTextLg: `font-quicksand text-lg leading-relaxed`,

  /**
   * Navigation link style
   * Size: text-base (16px)
   */
  navLink: `${fontNavigation}`,

  /**
   * Navigation button style
   * Size: text-base (16px)
   */
  navButton: `${fontNavigation} font-semibold`,

  /**
   * Navigation button style - Large
   * Size: text-lg (18px)
   */
  navButtonLg: `font-quicksand text-lg font-semibold`,

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
  tag: `font-quicksand text-sm uppercase tracking-wider`,

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
