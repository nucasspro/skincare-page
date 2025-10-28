"use client"

import Image from "next/image"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    review: "My skin has never looked better! The hydration is incredible and my fine lines are visibly reduced.",
    beforeImage: "/luxury-skincare-essence-bottle-minimal-white-backg.jpg",
    afterImage: "/luxury-skincare-essence-bottle-product-shot-cream-.jpg",
  },
  {
    id: 2,
    name: "Jessica L.",
    rating: 5,
    date: "1 month ago",
    review: "This serum transformed my dry, dull skin into radiant, plump skin. Worth every penny!",
    beforeImage: "/luxury-vitamin-c-serum-bottle-minimal-white-backgr.jpg",
    afterImage: "/luxury-vitamin-c-serum-bottle-product-shot-cream-b.jpg",
  },
  {
    id: 3,
    name: "Emily R.",
    rating: 5,
    date: "3 weeks ago",
    review: "I was skeptical at first, but the results speak for themselves. My skin texture is so much smoother.",
    beforeImage: "/luxury-ceramide-cream-jar-minimal-white-background.jpg",
    afterImage: "/luxury-ceramide-cream-jar-product-shot-cream-backg.jpg",
  },
]

export function BeforeAfterReviews() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-light text-gray-900">Real Results</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            See the transformative results our customers have experienced
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Before/After Images */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image src={review.beforeImage || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Before
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image src={review.afterImage || "/placeholder.svg"} alt="After" fill className="object-cover" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    After
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
    </section>
  )
}
