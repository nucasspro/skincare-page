"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

type Banner = {
  title: string
  subtitle?: string
  imagePath: string
  cta?: { label: string; href: string }
}

export function PromoSlider() {
  const banners: Banner[] = useMemo(
    () => [
      {
        title: "Thừa kế thành quả 16 năm đầu tư và nghiên cứu khoa học y sinh bài bản",
        subtitle: "Mỗi công thức được đội ngũ chuyên gia Cellic đưa vào sản phẩm đều trải qua quy trình thử nghiệm lâm sàng nghiêm ngặt, và đảm bảo an toàn.",
        imagePath: "/banner/1.png",
        cta: { label: "Mua ngay", href: "/products" },
      },
      {
        title: "Minh bạch toàn bộ quy trình kiểm nghiệm",
        subtitle: "Mọi công bố về hiệu quả đều được đối chiếu bằng dữ liệu và chứng nhận từ đối tác kiểm nghiệm uy tín từ trong nước và quốc tế.",
        imagePath: "/banner/2.png",
        cta: { label: "Khám phá", href: "/brand-story" },
      },
      {
        title: "Nguồn nguyên liệu tinh khiết và đối tác kiểm nghiệm uy tín",
        subtitle: "Cellic sử dụng thành phần được kiểm định và chọn lọc từ các nhà cung cấp uy tín. Chúng tôi hợp tác cùng các bệnh viện Đại học y Dược, Bệnh viện 108 đảm bảo tiêu chuẩn khoa học cao nhất cho làn da Việt.",
        imagePath: "/banner/3.png",
        cta: { label: "Xem chi tiết", href: "/" },
      },
      {
        title: "Chất lượng được chứng nhận",
        subtitle: "Sản phẩm của Cellic được kiểm định và chứng nhận bởi các tổ chức uy tín, đảm bảo an toàn và hiệu quả cho làn da Việt.",
        imagePath: "/banner/4.png",
        cta: { label: "Tìm hiểu thêm", href: "/products" },
      },
      {
        title: "Đổi mới và phát triển liên tục",
        subtitle: "Cellic không ngừng nghiên cứu và phát triển để mang đến những sản phẩm chăm sóc da tốt nhất với công nghệ tiên tiến nhất.",
        imagePath: "/banner/5.png",
        cta: { label: "Khám phá", href: "/brand-story" },
      },
    ],
    []
  )

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % banners.length), 5000)
    return () => clearInterval(id)
  }, [banners.length])

  return (
    <section className="relative w-full">
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Slider track */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {banners.map((b, i) => (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              {/* Background image - Next.js Image tự động optimize sang webp */}
              <Image
                src={b.imagePath}
                alt={b.title}
                fill
                className="object-cover"
                quality={100}
                priority={i === 0 || i === 1}
                sizes="100vw"
                unoptimized={false}
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/40" />
              {/* Bỏ backdrop-blur để ảnh sắc nét hơn */}
              {/* Content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
                <div className="transition-opacity duration-500">
                  <h3 className="h-heading text-2xl md:text-3xl text-white drop-shadow-sm">{b.title}</h3>
                  {b.subtitle ? (
                    <p className="p-desc mt-2 text-sm md:text-base text-white/90">{b.subtitle}</p>
                  ) : null}
                  {b.cta ? (
                    <a
                      href={b.cta.href}
                      className="inline-flex items-center mt-4 px-4 py-2 rounded-md bg-white/95 text-gray-900 text-sm hover:bg-white transition-colors"
                    >
                      {b.cta.label}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              aria-label={`banner-${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoSlider


