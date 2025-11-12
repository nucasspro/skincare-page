import Image from "next/image"

export interface ProductsHeroProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
}

export function ProductsHero({
  title = "Khám phá sản phẩm chăm sóc da",
  subtitle = "Tất cả các sản phẩm của chúng tôi được phát triển với sự kết hợp giữa khoa học và thiên nhiên",
  backgroundImage = "/luxury-skincare-brand-story-natural-ingredients-lab.jpg",
}: ProductsHeroProps) {
  return (
    <div className="relative h-96 md:h-[500px] bg-stone-900 overflow-hidden pt-32">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-stone-200">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
