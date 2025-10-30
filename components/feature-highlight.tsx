"use client"

export interface FeatureItem {
  title: string
  value: string
}

export interface FeatureHighlightProps {
  features?: FeatureItem[]
}

export function FeatureHighlight({
  features = []
}: FeatureHighlightProps) {
  return (
    <section className="w-full bg-gradient-to-r from-gray-400 to-gray-300">
      {/* Banner with Background Image */}
      <div
        className="relative w-full h-48 md:h-64 lg:h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1920&h=600&fit=crop")',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text Content - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-3 gap-8 md:gap-16 lg:gap-24 text-center">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider whitespace-nowrap">
                    {feature.title}
                  </h3>
                  <p className="text-3xl md:text-4xl lg:text-5xl text-white/95 font-light italic mt-2">
                    {feature.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
