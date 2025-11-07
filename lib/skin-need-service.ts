// Skin Needs Service
// SkinNeeds are static data, not stored in database
// Keep this separate from category service

export interface SkinNeed {
  id: string
  name: string
}

// Skin Needs data (static)
const SKIN_NEEDS: SkinNeed[] = [
  { id: "hydration", name: "Dưỡng ẩm" },
  { id: "brightening", name: "Làm sáng" },
  { id: "antiAging", name: "Chống lão hóa" },
  { id: "sensitive", name: "Da nhạy cảm" },
  { id: "acne", name: "Trị mụn" },
  { id: "pore", name: "Thu nhỏ lỗ chân lông" },
  { id: "oily", name: "Da dầu" },
  { id: "dry", name: "Da khô" },
]

export class SkinNeedService {
  /**
   * Get all skin needs
   */
  static getAllSkinNeeds(): SkinNeed[] {
    return SKIN_NEEDS
  }

  /**
   * Get skin need by ID
   */
  static getSkinNeedById(id: string): SkinNeed | undefined {
    return SKIN_NEEDS.find(need => need.id === id)
  }

  /**
   * Get skin need name
   */
  static getSkinNeedName(needId: string): string {
    const need = this.getSkinNeedById(needId)
    return need?.name || needId
  }

  /**
   * Get skin needs as object
   */
  static getSkinNeedsAsObject(): Record<string, string> {
    const result: Record<string, string> = {}
    SKIN_NEEDS.forEach(need => {
      result[need.id] = need.name
    })
    return result
  }

  /**
   * Check if skin need exists
   */
  static skinNeedExists(needId: string): boolean {
    return SKIN_NEEDS.some(need => need.id === needId)
  }
}

// Export convenience functions
export const getAllSkinNeeds = SkinNeedService.getAllSkinNeeds.bind(SkinNeedService)
export const getSkinNeedById = SkinNeedService.getSkinNeedById.bind(SkinNeedService)
export const getSkinNeedName = SkinNeedService.getSkinNeedName.bind(SkinNeedService)
export const getSkinNeedsAsObject = SkinNeedService.getSkinNeedsAsObject.bind(SkinNeedService)
export const skinNeedExists = SkinNeedService.skinNeedExists.bind(SkinNeedService)
