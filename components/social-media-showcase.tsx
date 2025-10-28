"use client"

import { useState } from "react"
import { X, Instagram, Facebook, Youtube } from "lucide-react"
import Image from "next/image"

// TikTok icon component (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

interface VideoItem {
  id: string
  platform: "instagram" | "tiktok" | "youtube"
  thumbnail: string
  videoUrl: string
  title: string
}

const videos: VideoItem[] = [
  {
    id: "1",
    platform: "instagram",
    thumbnail: "/social-video-1.jpg",
    videoUrl: "https://www.instagram.com/reel/example",
    title: "Morning Skincare Routine",
  },
  {
    id: "2",
    platform: "tiktok",
    thumbnail: "/social-video-2.jpg",
    videoUrl: "https://www.tiktok.com/@example/video/123",
    title: "Glow Up Tips",
  },
  {
    id: "3",
    platform: "youtube",
    thumbnail: "/social-video-3.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example",
    title: "Product Review",
  },
  {
    id: "4",
    platform: "instagram",
    thumbnail: "/social-video-4.jpg",
    videoUrl: "https://www.instagram.com/reel/example2",
    title: "Skincare Science",
  },
]

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/yourbrand",
    color: "hover:text-pink-600",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    url: "https://tiktok.com/@yourbrand",
    color: "hover:text-black",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@yourbrand",
    color: "hover:text-red-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/yourbrand",
    color: "hover:text-blue-600",
  },
]

export function SocialMediaShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "tiktok":
        return <TikTokIcon className="w-5 h-5" />
      case "youtube":
        return <Youtube className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">Join Our Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow us for skincare tips, tutorials, and behind-the-scenes content
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Video Thumbnail */}
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Platform Icon */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-900">
                {getPlatformIcon(video.platform)}
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[16px] border-l-gray-900 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-medium text-sm">{video.title}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-8">
          <p className="text-sm text-gray-600 font-medium">Follow us:</p>
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 transition-colors duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-900 hover:bg-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center space-y-6">
              <div className="aspect-[9/16] max-h-[70vh] mx-auto relative rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={selectedVideo.thumbnail || "/placeholder.svg"}
                  alt={selectedVideo.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-gray-900">{selectedVideo.title}</h3>
                <p className="text-gray-600">Watch this video on {selectedVideo.platform}</p>
                <a
                  href={selectedVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  {getPlatformIcon(selectedVideo.platform)}
                  <span>Watch on {selectedVideo.platform}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
