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
    <section className="py-16 md:py-24 bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Text Content - Left */}
          <div className="space-y-6 p-8 md:p-16 pr-12 md:pr-24 flex flex-col justify-start pt-12 md:pt-20 bg-stone-50">
            {label && (
              <span className="text-sm font-medium text-stone-600 uppercase tracking-wider">
                {label}
              </span>
            )}
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight uppercase">
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
            {secondaryDescription && (
              <p className="text-gray-600 leading-relaxed">
                {secondaryDescription}
              </p>
            )}
            <Link
              href={readMoreLink}
              className="inline-block text-stone-900 font-medium hover:text-stone-700 transition-colors group w-fit"
            >
              <span className="flex items-center gap-2">
                {readMoreText}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>

          {/* Image - Right */}
          <div className="relative w-full h-[800px] mt-60">
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
