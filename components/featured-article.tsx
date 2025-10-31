import Image from "next/image"
import Link from "next/link"

export interface FeaturedArticleProps {
  title: string
  description: string
  secondaryDescription?: string
  readMoreLink?: string
  readMoreText?: string
  imageUrl: string
  imageAlt?: string
  label?: string
}

export function FeaturedArticle({
  title,
  description,
  secondaryDescription,
  readMoreLink = "#",
  readMoreText = "En savoir plus",
  imageUrl,
  imageAlt = "Featured article",
  label,
}: FeaturedArticleProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Text Content - Left */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center bg-stone-50 min-h-[400px] sm:min-h-[500px] md:min-h-[700px] lg:min-h-[800px]">
            {label && (
              <span className="text-xs sm:text-sm font-medium text-stone-600 uppercase tracking-wider">
                {label}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight uppercase px-4">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl px-4">
              {description}
            </p>
            {secondaryDescription && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl px-4">
                {secondaryDescription}
              </p>
            )}
            <Link
              href={readMoreLink}
              className="inline-block text-stone-900 font-medium hover:text-stone-700 transition-colors group w-fit text-sm sm:text-base"
            >
              <span className="flex items-center gap-2">
                {readMoreText}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>

          {/* Image - Right */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
