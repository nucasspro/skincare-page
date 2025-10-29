// Review types
export interface Review {
  id: string
  productId: string
  name: string
  rating: number
  review: string
  date: string
  beforeImage: string
  afterImage: string
  verified?: boolean
  helpful?: number
}

export interface VideoTestimonial {
  id: string
  productId: string
  thumbnailImage: string
  videoUrl?: string
  title?: string
}

// Mock review data
const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "1",
    name: "Nguyễn Minh Anh",
    rating: 5,
    review: "Sản phẩm này đã thay đổi hoàn toàn làn da của mình! Chỉ sau 2 tuần, da đã cải thiện rõ rệt về độ ẩm và kết cấu. Da mình căng mọng và rạng rỡ hơn hẳn.",
    date: "2 tuần trước",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    verified: true,
    helpful: 24,
  },
  {
    id: "r2",
    productId: "1",
    name: "Trần Thanh Hương",
    rating: 5,
    review: "Mình đã thử nhiều essence nhưng sản phẩm này là tốt nhất! Thấm nhanh không để lại cảm giác dính rít. Các nếp nhăn li ti đã mờ đi đáng kể!",
    date: "1 tháng trước",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    verified: true,
    helpful: 18,
  },
  {
    id: "r3",
    productId: "1",
    name: "Phạm Thu Trang",
    rating: 5,
    review: "Kết quả tuyệt vời! Màu da đều hơn và lỗ chân lông nhỏ lại. Mọi người cứ khen da mình sáng đẹp. Rất recommend!",
    date: "3 tuần trước",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    verified: true,
    helpful: 31,
  },
  {
    id: "r4",
    productId: "1",
    name: "Lê Hoàng Mai",
    rating: 4,
    review: "Sản phẩm rất tốt! Da cải thiện ngay từ tuần đầu tiên. Chỉ cho 4 sao vì giá hơi cao, nhưng chất lượng xứng đáng!",
    date: "1 tuần trước",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    verified: true,
    helpful: 12,
  },
  {
    id: "r5",
    productId: "1",
    name: "Võ Thị Lan",
    rating: 5,
    review: "Đây là sản phẩm không thể thiếu của mình! Da nhạy cảm dùng không bị kích ứng gì cả. Da mịn màng và mượt mà. Chắc chắn sẽ mua lại!",
    date: "2 tháng trước",
    beforeImage: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
    verified: true,
    helpful: 45,
  },
  {
    id: "r6",
    productId: "1",
    name: "Đặng Khánh Linh",
    rating: 5,
    review: "Yêu sản phẩm này quá đi! Sự khác biệt trước và sau rất rõ ràng. Các đốm đen đã mờ đi và da sáng hơn hẳn. Đầu tư skincare đáng giá nhất!",
    date: "1 tháng trước",
    beforeImage: "/luxury-eye-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-eye-cream-jar-product-shot-cream-background.jpg",
    verified: true,
    helpful: 28,
  },
  {
    id: "r7",
    productId: "2",
    name: "Hoàng Bảo Ngọc",
    rating: 5,
    review: "Serum Vitamin C này tuyệt vời! Da sáng hơn và đều màu chỉ sau 3 tuần. Các vết thâm đang mờ dần rất tốt.",
    date: "3 tuần trước",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    verified: true,
    helpful: 22,
  },
  {
    id: "r8",
    productId: "2",
    name: "Bùi Thùy Dương",
    rating: 5,
    review: "Serum Vitamin C tốt nhất mình từng dùng! Không kích ứng, thấm nhanh, và cho làn da glowing tuyệt đẹp. Quy trình sáng không thể thiếu!",
    date: "1 tháng trước",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
    verified: true,
    helpful: 19,
  },
  {
    id: "r9",
    productId: "2",
    name: "Phan Quỳnh Anh",
    rating: 4,
    review: "Serum rất tốt! Da chắc chắn sáng hơn. Chỉ ước chai to hơn tí với mức giá này.",
    date: "2 tuần trước",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
    verified: true,
    helpful: 8,
  },
  {
    id: "r10",
    productId: "3",
    name: "Nguyễn Thu Hà",
    rating: 5,
    review: "Kem ceramide này đã cứu làn da khô và nhạy cảm của mình! Giàu dưỡng chất nhưng không nhờn, da mạnh khỏe hơn rõ rệt.",
    date: "1 tháng trước",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    verified: true,
    helpful: 35,
  },
  {
    id: "r11",
    productId: "3",
    name: "Trịnh Minh Châu",
    rating: 5,
    review: "Hoàn hảo cho mùa đông! Không còn tình trạng da khô bong tróc hay đỏ ửng. Da mình thoải mái suốt cả ngày.",
    date: "2 tuần trước",
    beforeImage: "/luxury-facial-cleanser-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-facial-cleanser-bottle-product-shot-cream-b.jpg",
    verified: true,
    helpful: 16,
  },
  {
    id: "r12",
    productId: "3",
    name: "Lương Thanh Tâm",
    rating: 5,
    review: "Kem dưỡng tuyệt vời! Giúp phục hồi hàng rào bảo vệ da bị tổn thương. Rất recommend cho ai da nhạy cảm hoặc yếu.",
    date: "3 tuần trước",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
    verified: true,
    helpful: 27,
  },
]

const MOCK_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "v1",
    productId: "1",
    thumbnailImage: "/social-video-1.jpg",
    videoUrl: "/videos/testimonial-1.mp4",
    title: "3-Week Transformation",
  },
  {
    id: "v2",
    productId: "1",
    thumbnailImage: "/social-video-2.jpg",
    videoUrl: "/videos/testimonial-2.mp4",
    title: "My Skincare Journey",
  },
]

// Review Service
export class ReviewService {
  /**
   * Get all reviews
   */
  static getAllReviews(): Review[] {
    return MOCK_REVIEWS
  }

  /**
   * Get review by ID
   */
  static getReviewById(id: string): Review | undefined {
    return MOCK_REVIEWS.find(review => review.id === id)
  }

  /**
   * Get reviews by product ID
   */
  static getReviewsByProductId(productId: string): Review[] {
    return MOCK_REVIEWS.filter(review => review.productId === productId)
  }

  /**
   * Get reviews by rating
   */
  static getReviewsByRating(rating: number): Review[] {
    return MOCK_REVIEWS.filter(review => review.rating === rating)
  }

  /**
   * Get verified reviews only
   */
  static getVerifiedReviews(): Review[] {
    return MOCK_REVIEWS.filter(review => review.verified === true)
  }

  /**
   * Get top helpful reviews
   */
  static getTopHelpfulReviews(limit: number = 5): Review[] {
    return [...MOCK_REVIEWS]
      .sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
      .slice(0, limit)
  }

  /**
   * Get recent reviews
   */
  static getRecentReviews(limit: number = 6): Review[] {
    return MOCK_REVIEWS.slice(0, limit)
  }

  /**
   * Get average rating for a product
   */
  static getAverageRating(productId: string): number {
    const reviews = this.getReviewsByProductId(productId)
    if (reviews.length === 0) return 0

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return Number((totalRating / reviews.length).toFixed(1))
  }

  /**
   * Get rating distribution for a product
   */
  static getRatingDistribution(productId: string): Record<number, number> {
    const reviews = this.getReviewsByProductId(productId)
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1
    })

    return distribution
  }

  /**
   * Get total review count for a product
   */
  static getReviewCount(productId: string): number {
    return this.getReviewsByProductId(productId).length
  }

  /**
   * Get video testimonials by product ID
   */
  static getVideoTestimonials(productId: string): VideoTestimonial[] {
    return MOCK_VIDEO_TESTIMONIALS.filter(video => video.productId === productId)
  }

  /**
   * Sort reviews
   */
  static sortReviews(reviews: Review[], sortBy: string): Review[] {
    const sorted = [...reviews]

    switch (sortBy) {
      case "helpful":
        return sorted.sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
      case "recent":
        return sorted // Already sorted by recent in mock data
      case "highestRating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "lowestRating":
        return sorted.sort((a, b) => a.rating - b.rating)
      default:
        return sorted
    }
  }

  /**
   * Filter reviews
   */
  static filterReviews(filters: {
    productId?: string
    rating?: number
    verifiedOnly?: boolean
  }): Review[] {
    let filtered = MOCK_REVIEWS

    if (filters.productId) {
      filtered = filtered.filter(r => r.productId === filters.productId)
    }

    if (filters.rating) {
      filtered = filtered.filter(r => r.rating === filters.rating)
    }

    if (filters.verifiedOnly) {
      filtered = filtered.filter(r => r.verified === true)
    }

    return filtered
  }
}

// Export convenience functions (bind to maintain 'this' context)
export const getAllReviews = ReviewService.getAllReviews.bind(ReviewService)
export const getReviewById = ReviewService.getReviewById.bind(ReviewService)
export const getReviewsByProductId = ReviewService.getReviewsByProductId.bind(ReviewService)
export const getReviewsByRating = ReviewService.getReviewsByRating.bind(ReviewService)
export const getVerifiedReviews = ReviewService.getVerifiedReviews.bind(ReviewService)
export const getTopHelpfulReviews = ReviewService.getTopHelpfulReviews.bind(ReviewService)
export const getRecentReviews = ReviewService.getRecentReviews.bind(ReviewService)
export const getAverageRating = ReviewService.getAverageRating.bind(ReviewService)
export const getRatingDistribution = ReviewService.getRatingDistribution.bind(ReviewService)
export const getReviewCount = ReviewService.getReviewCount.bind(ReviewService)
export const getVideoTestimonials = ReviewService.getVideoTestimonials.bind(ReviewService)
export const sortReviews = ReviewService.sortReviews.bind(ReviewService)
export const filterReviews = ReviewService.filterReviews.bind(ReviewService)
