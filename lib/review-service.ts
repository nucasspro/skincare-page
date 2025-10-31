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
  // Reviews for product "0" - Cellic Calm Defense Sunscreen
  {
    id: "r13",
    productId: "0",
    name: "Nguyễn Thị Hoa",
    rating: 5,
    review: "Kem chống nắng này thực sự làm mình yên tâm! Da mụn dùng không bị kích ứng, không gây bít tắc lỗ chân lông. SPF 50+ bảo vệ rất tốt, da mình không bị sạm nắng.",
    date: "2 tuần trước",
    beforeImage: "/image-product/kcnxanhlacay/18.png",
    afterImage: "/image-product/kcnxanhlacay/19.png",
    verified: true,
    helpful: 32,
  },
  {
    id: "r14",
    productId: "0",
    name: "Trần Minh Anh",
    rating: 5,
    review: "Sản phẩm tuyệt vời cho da nhạy cảm và mụn! Công thức nhẹ, không nhờn rít, thấm nhanh. Da mình không còn bị kích ứng khi ra nắng nữa.",
    date: "1 tháng trước",
    beforeImage: "/image-product/kcnxanhlacay/20.png",
    afterImage: "/image-product/kcnxanhlacay/30.png",
    verified: true,
    helpful: 28,
  },
  {
    id: "r15",
    productId: "0",
    name: "Lê Thị Lan",
    rating: 5,
    review: "Cellic Calm Defense là kem chống nắng tốt nhất mình từng dùng cho da mụn! Không làm tắc lỗ chân lông, da mình còn cải thiện sau khi dùng.",
    date: "3 tuần trước",
    beforeImage: "/image-product/kcnxanhlacay/ANHWEB-5.png",
    afterImage: "/image-product/kcnxanhlacay/ANHWEB-6.png",
    verified: true,
    helpful: 41,
  },
  {
    id: "r16",
    productId: "0",
    name: "Phạm Thanh Mai",
    rating: 4,
    review: "Kem chống nắng ổn, phù hợp với da mụn. Chỉ cho 4 sao vì giá hơi cao so với các sản phẩm khác trên thị trường.",
    date: "2 tuần trước",
    beforeImage: "/image-product/kcnxanhlacay/18.png",
    afterImage: "/image-product/kcnxanhlacay/19.png",
    verified: true,
    helpful: 15,
  },
  {
    id: "r17",
    productId: "0",
    name: "Võ Thị Hương",
    rating: 5,
    review: "Đã dùng được 2 tháng, da mình không còn mụn nhiều như trước. Kem chống nắng này vừa bảo vệ da vừa làm dịu mụn. Rất hài lòng!",
    date: "1 tuần trước",
    beforeImage: "/image-product/kcnxanhlacay/20.png",
    afterImage: "/image-product/kcnxanhlacay/30.png",
    verified: true,
    helpful: 37,
  },
  // Reviews for product "00" - Cellic Dew Shield Sunscreen
  {
    id: "r18",
    productId: "00",
    name: "Nguyễn Thị Mai",
    rating: 5,
    review: "Kem chống nắng này thực sự cứu rỗi làn da khô của mình! Da không còn bong tróc hay khô ráp nữa. Cấp ẩm rất tốt, dùng cả ngày da vẫn mềm mịn.",
    date: "3 tuần trước",
    beforeImage: "/image-product/kcnmauvang/ANHWEBSTE-2.png",
    afterImage: "/image-product/kcnmauvang/14.png",
    verified: true,
    helpful: 42,
  },
  {
    id: "r19",
    productId: "00",
    name: "Trần Văn Hùng",
    rating: 5,
    review: "Sản phẩm tuyệt vời cho da khô! Công thức giàu dưỡng chất, không gây nhờn rít. Da mình giờ đây căng mọng và khỏe mạnh hơn rất nhiều.",
    date: "2 tháng trước",
    beforeImage: "/image-product/kcnmauvang/32.png",
    afterImage: "/image-product/kcnmauvang/ANHWEB-5.png",
    verified: true,
    helpful: 35,
  },
  {
    id: "r20",
    productId: "00",
    name: "Lê Thị Hương",
    rating: 5,
    review: "Cellic Dew Shield là kem chống nắng tốt nhất cho da khô mình từng dùng! Vừa chống nắng hiệu quả vừa dưỡng ẩm sâu. Da không còn thiếu ẩm nữa.",
    date: "1 tháng trước",
    beforeImage: "/image-product/kcnmauvang/ANHWEB-6.png",
    afterImage: "/image-product/kcnmauvang/ANHWEBSTE.png",
    verified: true,
    helpful: 48,
  },
  {
    id: "r21",
    productId: "00",
    name: "Phạm Thị Lan",
    rating: 4,
    review: "Kem chống nắng tốt, phù hợp cho da khô. Chỉ cho 4 sao vì cảm giác hơi nặng một chút, nhưng hiệu quả dưỡng ẩm rất đáng giá.",
    date: "2 tuần trước",
    beforeImage: "/image-product/kcnmauvang/14.png",
    afterImage: "/image-product/kcnmauvang/32.png",
    verified: true,
    helpful: 22,
  },
  {
    id: "r22",
    productId: "00",
    name: "Hoàng Thị Anh",
    rating: 5,
    review: "Đã dùng được 3 tháng, da khô của mình giờ đã cải thiện rất nhiều. Kem này vừa bảo vệ khỏi tia UV vừa cấp ẩm lâu dài. Rất recommend cho ai da khô!",
    date: "1 tuần trước",
    beforeImage: "/image-product/kcnmauvang/ANHWEB-5.png",
    afterImage: "/image-product/kcnmauvang/ANHWEB-6.png",
    verified: true,
    helpful: 39,
  },
  // Reviews for product "000" - Cellic Right Match Lumi Sunscreen
  {
    id: "r23",
    productId: "000",
    name: "Nguyễn Thị Linh",
    rating: 5,
    review: "Kem chống nắng này thực sự làm đều màu da mình! Da không còn loang lổ, sáng đều màu tự nhiên. Công nghệ hiệu chỉnh màu da rất hiệu quả.",
    date: "2 tuần trước",
    beforeImage: "/image-product/kcnmautim/16.png",
    afterImage: "/image-product/kcnmautim/15.png",
    verified: true,
    helpful: 45,
  },
  {
    id: "r24",
    productId: "000",
    name: "Trần Minh Tuấn",
    rating: 5,
    review: "Sản phẩm tuyệt vời! Da mình sáng hơn và đều màu hơn rất nhiều sau khi dùng. Vừa chống nắng vừa làm đẹp da, rất phù hợp cho mọi loại da.",
    date: "1 tháng trước",
    beforeImage: "/image-product/kcnmautim/17.png",
    afterImage: "/image-product/kcnmautim/31.png",
    verified: true,
    helpful: 38,
  },
  {
    id: "r25",
    productId: "000",
    name: "Lê Thị Hoa",
    rating: 5,
    review: "Cellic Right Match Lumi là kem chống nắng tốt nhất mình từng dùng! Da sáng đều màu tự nhiên, không bị loang lổ. Công nghệ hiệu chỉnh màu da thực sự tuyệt vời!",
    date: "3 tuần trước",
    beforeImage: "/image-product/kcnmautim/ANHWEB-5.png",
    afterImage: "/image-product/kcnmautim/ANHWEB-6.png",
    verified: true,
    helpful: 52,
  },
  {
    id: "r26",
    productId: "000",
    name: "Phạm Thị Ngọc",
    rating: 4,
    review: "Kem chống nắng tốt, hiệu quả làm đều màu da rất ấn tượng. Chỉ cho 4 sao vì giá hơi cao, nhưng chất lượng xứng đáng với giá tiền.",
    date: "2 tuần trước",
    beforeImage: "/image-product/kcnmautim/15.png",
    afterImage: "/image-product/kcnmautim/17.png",
    verified: true,
    helpful: 28,
  },
  {
    id: "r27",
    productId: "000",
    name: "Võ Thị Phương",
    rating: 5,
    review: "Đã dùng được 2 tháng, da mình giờ đã sáng đều màu và khỏe mạnh hơn. Kem này vừa bảo vệ da khỏi tia UV vừa hiệu chỉnh màu da rất tự nhiên. Rất hài lòng!",
    date: "1 tuần trước",
    beforeImage: "/image-product/kcnmautim/31.png",
    afterImage: "/image-product/kcnmautim/ANHWEB-5.png",
    verified: true,
    helpful: 41,
  },
  // Reviews for product "new" - Bright Matte Sunscreen
  {
    id: "r28",
    productId: "new",
    name: "Lan Anh",
    rating: 5,
    review: "Không chỉ chống nắng mà da mình còn giảm tình trạng bị kích ứng! Mình dùng được hơn 2 tuần rồi, da không bị kích ứng hay nóng rát luôn. Chất kem tán dễ, không bị trắng bệch mà kiểu sáng nhẹ tự nhiên. Da mình nhạy cảm mà bôi em này không hề cay mắt hay bí da.",
    date: "2 tuần trước",
    beforeImage: "/image-product/kcnxanhduong/1.png",
    afterImage: "/image-product/kcnxanhduong/8.png",
    verified: true,
    helpful: 52,
  },
  {
    id: "r29",
    productId: "new",
    name: "Diệu Linh",
    rating: 4.5,
    review: "Finish đẹp, mịn lì mà vẫn ẩm nhẹ. Ấn tượng đầu tiên là chất kem mịn, tán ra mượt, không để lại vệt trắng. Da mình dầu vùng T nhưng dùng cả buổi vẫn thấy kiềm dầu tốt, không bị loang như mấy loại trước. Mùi dễ chịu, kiểu rất nhẹ. Mình chỉ mong hãng ra thêm bản lớn để xài được lâu hơn.",
    date: "3 tuần trước",
    beforeImage: "/image-product/kcnxanhduong/6.png",
    afterImage: "/image-product/kcnxanhduong/7.png",
    verified: true,
    helpful: 47,
  },
  {
    id: "r30",
    productId: "new",
    name: "Thảo Trang",
    rating: 4,
    review: "Tốt nhưng nên cải thiện tốc độ thấm. Chống nắng ổn, không bị rát da khi ra nắng gắt, mà da cũng đỡ đổ dầu hơn. Tuy nhiên lúc mới bôi thì hơi dính nhẹ tầm 1–2 phút đầu mới set hẳn. Dù vậy, tổng thể rất đáng tiền, đặc biệt là vì cảm giác dịu nhẹ không gây kích ứng.",
    date: "1 tháng trước",
    beforeImage: "/image-product/kcnxanhduong/ANHWEB-3.png",
    afterImage: "/image-product/kcnxanhduong/ANHWEB-4.png",
    verified: true,
    helpful: 38,
  },
  {
    id: "r31",
    productId: "new",
    name: "Kiều Oanh",
    rating: 4.5,
    review: "Tone lên nhẹ, hợp dùng buổi sáng đi làm. Da mình hơi xỉn nên rất thích kiểu nâng tone nhẹ như em này. Không bị trắng bệch như mấy dòng Hàn, mà sáng kiểu tự nhiên, kiểu healthy skin. Mình hay makeup nhẹ sau đó, lớp nền bám khá ổn. Nếu Cellic có thêm phiên bản chống nước thì chắc mình chấm 5 sao luôn.",
    date: "1 tuần trước",
    beforeImage: "/image-product/kcnxanhduong/1.png",
    afterImage: "/image-product/kcnxanhduong/8.png",
    verified: true,
    helpful: 43,
  },
]

const MOCK_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "v1",
    productId: "1",
    thumbnailImage: "/placeholder.svg",
    videoUrl: "/videos/testimonial-1.mp4",
    title: "3-Week Transformation",
  },
  {
    id: "v2",
    productId: "1",
    thumbnailImage: "/placeholder.svg",
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
