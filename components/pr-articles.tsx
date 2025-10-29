"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Review {
  id: string
  image: string
  title: string
  author: string
  role: string
  quote: string
  url: string
}

const reviews: Review[] = [
  {
    id: "1",
    image: "/social-video-1.jpg",
    title: "Review Serum Vitamin C - CELLIC",
    author: "Nguyễn Thị Linh",
    role: "Beauty Blogger @linh_belle",
    quote: "Serum này thực sự làm mình bất ngờ! Da sáng lên rõ rệt sau 1 tuần sử dụng. Texture nhẹ, không sticky, thấm nhanh. Giá hơi cao nhưng xứng đáng!",
    url: "https://www.instagram.com/linh_belle/review",
  },
  {
    id: "2",
    image: "/social-video-2.jpg",
    title: "Trải nghiệm Chăm sóc da với CELLIC",
    author: "Trần Minh Anh",
    role: "Content Creator @minhanh.skincare",
    quote: "Full routine 1 tháng với dòng sản phẩm này. Da mình từ khô, sạm màu giờ đã căng mịn, có ánh sáng tự nhiên. Recommend 100%!",
    url: "https://www.youtube.com/@minhanh.skincare/review",
  },
  {
    id: "3",
    image: "/social-video-3.jpg",
    title: "KOC Review: Kem dưỡng ẩm Ceramide",
    author: "Lê Thùy Dương",
    role: "Dermatology Expert @drthuylinh",
    quote: "Là bác sĩ da liễu, mình rất kỹ trong việc chọn skincare. CELLIC là một trong những brand hiếm kết hợp được khoa học và thiên nhiên thành công.",
    url: "https://www.facebook.com/drthuylinh/review",
  },
  {
    id: "4",
    image: "/social-video-4.jpg",
    title: "Đánh giá chi tiết Essence CELLIC",
    author: "Phạm Quỳnh Anh",
    role: "Influencer @quynhanh.beauty",
    quote: "Essence này đã thay đổi làn da mình hoàn toàn! Cấu trúc da cải thiện rõ, lỗ chân lông nhỏ lại. Nếu bạn đang tìm essence chất lượng thì đây là lựa chọn tốt!",
    url: "https://www.tiktok.com/@quynhanh.beauty/review",
  },
  {
    id: "5",
    image: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    title: "Before & After Review: Combo Sản phẩm",
    author: "Hoàng Thị Mai",
    role: "Beauty Enthusiast @maithibeauty",
    quote: "Dùng combo serum + cream + essence trong 2 tháng. Da mình giờ đẹp hơn rất nhiều! Đàn ông em gái mình còn hỏi em dùng gì mà da đẹp thế!",
    url: "https://www.instagram.com/maithibeauty/review",
  },
  {
    id: "6",
    image: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    title: "Review: Quy trình 5 bước CELLIC",
    author: "Đỗ Thị Hương",
    role: "Skincare Addict @huongcareskin",
    quote: "Quy trình này phù hợp cho da nhạy cảm như mình. Không gây kích ứng, dịu nhẹ, đặc biệt là bước essence - thấm siêu nhanh và không để lại cảm giác nhờn!",
    url: "https://www.youtube.com/@huongcareskin/review",
  },
]

export function PRArticles() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Người dùng nói gì về sản phẩm
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reviews từ KOLs & KOCs đã trải nghiệm
          </p>
        </div>

        {/* Grid Layout: Card 1 (tall) | Card 2,3 | Card 4 (tall) | Card 5,6 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {/* Card 1 - TALL LEFT (spans 2 rows) */}
          <a
            href={reviews[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 md:row-span-2"
            onMouseEnter={() => setHoveredId(reviews[0].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full min-h-[500px] md:min-h-[700px] overflow-hidden bg-stone-100">
              <Image
                src={reviews[0].image}
                alt={reviews[0].title}
                fill
                className={`object-cover transition-all duration-700 ${hoveredId === reviews[0].id ? "scale-110 brightness-75" : "scale-100"}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Hover Content Overlay */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-between text-white transition-all duration-500 ${hoveredId === reviews[0].id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-lg">{reviews[0].author}</p>
                      <p className="text-sm text-white/90">{reviews[0].role}</p>
                    </div>
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white line-clamp-2">
                    {reviews[0].title}
                  </h3>
                  <p className="text-base text-white/95 leading-relaxed line-clamp-4">
                    "{reviews[0].quote}"
                  </p>
                </div>
              </div>

              {/* Default Content - Visible when NOT hovering */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${hoveredId === reviews[0].id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                  {reviews[0].title}
                </h3>
              </div>
            </div>
          </a>

          {/* Card 2 - Small Top */}
          <a
            href={reviews[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setHoveredId(reviews[1].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full min-h-[340px] overflow-hidden bg-stone-100">
              <Image
                src={reviews[1].image}
                alt={reviews[1].title}
                fill
                className={`object-cover transition-all duration-700 ${hoveredId === reviews[1].id ? "scale-110 brightness-75" : "scale-100"}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Hover Content Overlay */}
              <div className={`absolute inset-0 p-6 flex flex-col justify-between text-white transition-all duration-500 ${hoveredId === reviews[1].id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{reviews[1].author}</p>
                      <p className="text-sm text-white/90">{reviews[1].role}</p>
                    </div>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {reviews[1].title}
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed line-clamp-3">
                    "{reviews[1].quote}"
                  </p>
                </div>
              </div>

              {/* Default Content - Visible when NOT hovering */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hoveredId === reviews[1].id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {reviews[1].title}
                </h3>
              </div>
            </div>
          </a>

          {/* Card 3 - Small Bottom */}
          <a
            href={reviews[2].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setHoveredId(reviews[2].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full min-h-[340px] overflow-hidden bg-stone-100">
              <Image
                src={reviews[2].image}
                alt={reviews[2].title}
                fill
                className={`object-cover transition-all duration-700 ${hoveredId === reviews[2].id ? "scale-110 brightness-75" : "scale-100"}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Hover Content Overlay */}
              <div className={`absolute inset-0 p-6 flex flex-col justify-between text-white transition-all duration-500 ${hoveredId === reviews[2].id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{reviews[2].author}</p>
                      <p className="text-sm text-white/90">{reviews[2].role}</p>
                    </div>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {reviews[2].title}
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed line-clamp-3">
                    "{reviews[2].quote}"
                  </p>
                </div>
              </div>

              {/* Default Content - Visible when NOT hovering */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hoveredId === reviews[2].id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {reviews[2].title}
                </h3>
              </div>
            </div>
          </a>

          {/* Card 4 - TALL CENTER (spans 2 rows) */}
          <a
            href={reviews[3].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 md:row-span-2"
            onMouseEnter={() => setHoveredId(reviews[3].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full min-h-[500px] md:min-h-[700px] overflow-hidden bg-stone-100">
              <Image
                src={reviews[3].image}
                alt={reviews[3].title}
                fill
                className={`object-cover transition-all duration-700 ${hoveredId === reviews[3].id ? "scale-110 brightness-75" : "scale-100"}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Hover Content Overlay */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-between text-white transition-all duration-500 ${hoveredId === reviews[3].id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-lg">{reviews[3].author}</p>
                      <p className="text-sm text-white/90">{reviews[3].role}</p>
                    </div>
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white line-clamp-2">
                    {reviews[3].title}
                  </h3>
                  <p className="text-base text-white/95 leading-relaxed line-clamp-4">
                    "{reviews[3].quote}"
                  </p>
                </div>
              </div>

              {/* Default Content - Visible when NOT hovering */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${hoveredId === reviews[3].id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                  {reviews[3].title}
                </h3>
              </div>
            </div>
          </a>

          {/* Card 5 - Small Top */}
          <a
            href={reviews[4].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setHoveredId(reviews[4].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full min-h-[340px] overflow-hidden bg-stone-100">
              <Image
                src={reviews[4].image}
                alt={reviews[4].title}
                fill
                className={`object-cover transition-all duration-700 ${hoveredId === reviews[4].id ? "scale-110 brightness-75" : "scale-100"}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Hover Content Overlay */}
              <div className={`absolute inset-0 p-6 flex flex-col justify-between text-white transition-all duration-500 ${hoveredId === reviews[4].id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{reviews[4].author}</p>
                      <p className="text-sm text-white/90">{reviews[4].role}</p>
                    </div>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {reviews[4].title}
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed line-clamp-3">
                    "{reviews[4].quote}"
                  </p>
                </div>
              </div>

              {/* Default Content - Visible when NOT hovering */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hoveredId === reviews[4].id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {reviews[4].title}
                </h3>
              </div>
            </div>
          </a>

          {/* Card 6 - Small Bottom */}
          <a
            href={reviews[5].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setHoveredId(reviews[5].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full min-h-[340px] overflow-hidden bg-stone-100">
              <Image
                src={reviews[5].image}
                alt={reviews[5].title}
                fill
                className={`object-cover transition-all duration-700 ${hoveredId === reviews[5].id ? "scale-110 brightness-75" : "scale-100"}`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Hover Content Overlay */}
              <div className={`absolute inset-0 p-6 flex flex-col justify-between text-white transition-all duration-500 ${hoveredId === reviews[5].id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{reviews[5].author}</p>
                      <p className="text-sm text-white/90">{reviews[5].role}</p>
                    </div>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {reviews[5].title}
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed line-clamp-3">
                    "{reviews[5].quote}"
                  </p>
                </div>
              </div>

              {/* Default Content - Visible when NOT hovering */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hoveredId === reviews[5].id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {reviews[5].title}
                </h3>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}