"use client"

import { useState } from "react"
import { Play, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

interface VideoItem {
  id: string
  videoUrl: string
  thumbnail: string
  title: string
  socialUrl: string
}

const videos: VideoItem[] = [
  {
    id: "1",
    videoUrl: "/videos/videohero.mp4",
    thumbnail: "/social-video-1.jpg",
    title: "Quy trình chăm sóc da buổi sáng",
    socialUrl: "https://www.instagram.com/lumiere_skincare",
  },
  {
    id: "2",
    videoUrl: "/videos/videohero.mp4",
    thumbnail: "/social-video-2.jpg",
    title: "Tips làm đẹp với serum Vitamin C",
    socialUrl: "https://www.tiktok.com/@lumiere_skincare",
  },
  {
    id: "3",
    videoUrl: "/videos/videohero.mp4",
    thumbnail: "/social-video-3.jpg",
    title: "Đánh giá sản phẩm từ khách hàng",
    socialUrl: "https://www.youtube.com/@lumiere_skincare",
  },
  {
    id: "4",
    videoUrl: "/videos/videohero.mp4",
    thumbnail: "/social-video-4.jpg",
    title: "Khoa học đằng sau làn da khỏe mạnh",
    socialUrl: "https://www.facebook.com/lumiere_skincare",
  },
]

export function SocialMediaShowcase() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const { t } = useI18n()

  const handlePlay = (videoId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPlayingVideo(videoId)
  }

  const handleVideoClick = (socialUrl: string, e: React.MouseEvent) => {
    if (playingVideo) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    window.open(socialUrl, '_blank', 'noopener,noreferrer')
  }

  const handleVideoEnd = () => {
    setPlayingVideo(null)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Theo dõi hành trình làm đẹp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tham gia cộng đồng của chúng tôi
          </p>
        </div>

        {/* Video Grid - 4 videos large and centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl cursor-pointer"
              onClick={(e) => handleVideoClick(video.socialUrl, e)}
            >
              {/* Video player - only show when playing */}
              {playingVideo === video.id ? (
                <video
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <>
                  {/* Thumbnail */}
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Button */}
                  <button
                    onClick={(e) => handlePlay(video.id, e)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </button>

                  {/* External Link Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <ExternalLink className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-medium text-sm">{video.title}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}