"use client"

import { getBodyContentFont, getKeyHeadingFont } from "@/lib/utils/font-utils"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface SocialItem {
  id: string
  thumbnail: string
  title: string
  socialUrl: string
}

const socials: SocialItem[] = [
  {
    id: "1",
    thumbnail: "/images/IG1.png",
    title: "Theo dõi hành trình làm đẹp",
    socialUrl: "https://www.instagram.com/p/DQf6j_TEqE_/",
  },
  {
    id: "2",
    thumbnail: "/images/IG2.png",
    title: "Chia sẻ từ cộng đồng IG",
    socialUrl: "https://www.instagram.com/p/DQzGXGAkmwa/",
  },
  {
    id: "3",
    thumbnail: "/images/IG3.png",
    title: "Ảnh feedback khách hàng",
    socialUrl: "https://www.instagram.com/p/DQqLyhMjs1q/?img_index=1",
  },
  {
    id: "4",
    thumbnail: "/images/IG4.png",
    title: "Cập nhật mới nhất trên Instagram",
    socialUrl: "https://www.instagram.com/p/DQ_T1D1kv5q/",
  },
]

export function SocialMediaShowcase() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2
            className={getKeyHeadingFont(
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 uppercase"
            )}
          >
            Theo dõi hành trình làm đẹp
          </h2>
          <p className={getBodyContentFont("text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4")}>
            Tham gia cộng đồng của chúng tôi
          </p>
        </div>

        {/* Video Grid - 4 videos large and centered */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-[1600px] mx-auto">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl"
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={item.id === "1"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* External Link Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <ExternalLink className="w-5 h-5 text-gray-900" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className={getBodyContentFont("font-medium text-sm")}>{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}