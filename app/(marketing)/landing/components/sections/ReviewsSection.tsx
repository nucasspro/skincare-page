"use client";

import { useEffect, useRef, useState } from 'react';
import ReviewCard from '../ui/ReviewCard';
import StatsGraph from '../ui/StatsGraph';

const reviews = [
  {
    rating: 5,
    review: "Tone lên nhẹ, hợp dùng buổi sáng đi làm. Da mình hơi xỉn nên rất thích kiểu nâng tone nhẹ như em này. Không bị trắng bệch như mấy dòng Hàn, mà sáng kiểu tự nhiên, kiểu healthy skin. Mình hay makeup nhẹ sau đó, lớp nền bám khá ổn. Nếu Cellic có thêm phiên bản chống nước thì chắc mình chấm 5 sao luôn.",
    author: "Kiều Oanh",
    date: "1 tuần trước"
  },
  {
    rating: 4.5,
    review: "Tốt nhưng nên cải thiện tốc độ thấm. Chống nắng ổn, không bị rát da khi ra nắng gắt, mà da cũng đỡ đổ dầu hơn. Tuy nhiên lúc mới bôi thì hơi dính nhẹ tầm 1-2 phút đầu mới set hẳn. Dù vậy, tổng thể rất đáng tiền, đặc biệt là vì cảm giác dịu nhẹ không gây kích ứng.",
    author: "Thảo Trang",
    date: "1 tháng trước"
  },
  {
    rating: 5,
    review: "Finish đẹp, mịn lì mà vẫn ẩm nhẹ. Ấn tượng đầu tiên là chất kem mịn, tán ra mượt, không để lại vệt trắng. Da mình dầu vùng T nhưng dùng cả buổi vẫn thấy kiềm dầu tốt, không bị loang như mấy loại trước. Mùi dễ chịu, kiểu rất nhẹ. Mình chỉ mong hãng ra thêm bản lớn để xài được lâu hơn.",
    author: "Diệu Linh",
    date: "3 tuần trước"
  }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setIsTransitioning(true);
        return (prev + 1) % reviews.length;
      });
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset transition state after animation
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next
      setCurrentIndex((prev) => {
        setIsTransitioning(true);
        return (prev + 1) % reviews.length;
      });
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous
      setCurrentIndex((prev) => {
        setIsTransitioning(true);
        return (prev - 1 + reviews.length) % reviews.length;
      });
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsTransitioning(true);
  };

  return (
    <section className="landing__reviews w-full py-[60px] md:py-[120px] px-10">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
        <h2 className="text-heading-2 text-center">ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>

        <div className="bg-gray-50 rounded-[40px] p-4 md:p-8 shadow-md">
          {/* Desktop: Show all cards in a row */}
          <div className="hidden md:flex flex-row gap-8">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                rating={review.rating}
                review={review.review}
                author={review.author}
                date={review.date}
              />
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {reviews.map((review, index) => (
                <div key={index} className="min-w-full flex-shrink-0 w-full">
                  <ReviewCard
                    rating={review.rating}
                    review={review.review}
                    author={review.author}
                    date={review.date}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#3a76a5] w-6'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Graph */}
        <StatsGraph
          items={[
            { label: "Hiệu Quả", percentage: 92.3, color: "#a7c1d3", value1: 12, percentage1: 92.3, value2: 1, percentage2: 7.7 },
            { label: "Dưỡng ẩm", percentage: 88.9, color: "#a7c1d3", value1: 8, percentage1: 88.9, value2: 1, percentage2: 11.1 },
            { label: "Kích ứng", percentage: 4, color: "#a7c1d3", value1: 1, percentage1: 4, value2: 12, percentage2: 96 },
          ]}
        />
      </div>
    </section>
  );
}
