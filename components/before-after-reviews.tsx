"use client"

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    rating: 5,
    date: "2 tuần trước",
    review: "Kem chống nắng tốt nhất mình từng dùng! Da mình vừa được bảo vệ vừa sáng lên trông thấy, không hề bết dính.",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
  },
  {
    id: 2,
    name: "Trần Thanh Hương",
    rating: 5,
    date: "1 tháng trước",
    review: "Da mình khô và dễ bị sạm sau khi ra nắng, nhưng từ khi dùng Cellic thì da đều màu và mịn hơn hẳn. Giá hợp lý cho chất lượng!",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
  },
  {
    id: 3,
    name: "Phạm Thu Trang",
    rating: 5,
    date: "3 tuần trước",
    review: "Ban đầu mình cũng nghi ngờ, nhưng sau 2 tuần dùng thì thấy da mịn màng hơn rõ rệt. Texture nhẹ tênh, thấm nhanh!",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
  },
  {
    id: 4,
    name: "Lê Hoàng Mai",
    rating: 5,
    date: "5 ngày trước",
    review: "Mình hay bị nám và tàn nhang, dùng Cellic được 3 tuần thấy vết nám mờ đi nhiều. Quan trọng là không gây mụn nữa!",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
  },
  {
    id: 5,
    name: "Võ Thị Lan",
    rating: 5,
    date: "2 tháng trước",
    review: "Da mình nhạy cảm dễ đỏ, nhưng dùng em này không bị kích ứng gì cả. Lại còn kiềm dầu tốt, makeup lên cũng đẹp hơn.",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
  },
  {
    id: 6,
    name: "Đặng Khánh Linh",
    rating: 5,
    date: "1 tuần trước",
    review: "Texture mịn lắm, bôi lên không thấy trắng bệch hay vón cục. Da mình tone up tự nhiên, mọi người cứ hỏi mình dùng kem gì!",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
  },
  {
    id: 7,
    name: "Hoàng Bảo Ngọc",
    rating: 5,
    date: "10 ngày trước",
    review: "Mình làm việc ngoài trời nhiều, da hay bị cháy nắng. Từ khi dùng Cellic thì da khỏe hơn hẳn, không còn bị rát đỏ như trước.",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
  },
  {
    id: 8,
    name: "Bùi Thùy Dương",
    rating: 5,
    date: "3 tuần trước",
    review: "SPF 50+ mà không hề nặng mặt! Mình dùng cả ngày vẫn thấy thoải mái, da không bị bóng nhờn. Repurchase chắc chắn!",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
  },
  {
    id: 9,
    name: "Phan Quỳnh Anh",
    rating: 5,
    date: "1 tháng trước",
    review: "Đắng nhất là mình mua muộn quá! Da mình từ xỉn màu giờ sáng đều tự nhiên, lỗ chân lông cũng nhỏ lại. Yêu Cellic quá đi!",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
  },
];

export function BeforeAfterReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Items to show per page
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const goToNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentReviews = () => {
    const start = currentIndex * itemsPerPage;
    return reviews.slice(start, start + itemsPerPage);
  };

  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-light text-gray-900">Đánh giá từ khách hàng</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Xem kết quả thực tế mà khách hàng đã trải nghiệm
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => { goToPrev(); setIsAutoPlaying(false); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={() => { goToNext(); setIsAutoPlaying(false); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Reviews Grid with Animation */}
          <div className="overflow-hidden">
            <div
              className="grid md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {getCurrentReviews().map((review) => (
                <div key={review.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm ${direction === 'next' ? 'animate-slideFromRight' : 'animate-slideFromLeft'}`}>
              {/* Before/After Images */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image src={review.beforeImage || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Trước
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image src={review.afterImage || "/placeholder.svg"} alt="After" fill className="object-cover" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Sau
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-700 leading-relaxed">{review.review}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <span className="text-stone-500">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gray-900'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Video Testimonials */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-8">Video Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="relative aspect-video bg-stone-100 rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image src={`/social-video-${i}.jpg`} alt={`Video testimonial ${i}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[16px] border-l-gray-900 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideFromRight {
          from {
            opacity: 0.3;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideFromLeft {
          from {
            opacity: 0.3;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideFromRight {
          animation: slideFromRight 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slideFromLeft {
          animation: slideFromLeft 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  )
}
