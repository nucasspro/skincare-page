import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <Navigation />

      {/* Hero Section - Demo Content */}
      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 text-balance">
              Radiant Skin, <span className="italic text-stone-600">Naturally</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              Discover our collection of premium skincare products, carefully formulated with natural ingredients to
              nourish and protect your skin.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Demo Content for Scroll Effect */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="aspect-square bg-stone-100 rounded-xl mb-6" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Product {i}</h3>
                <p className="text-gray-600 text-sm">Premium skincare solution for radiant, healthy skin.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional sections for scroll demonstration */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 bg-stone-50">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light text-gray-900">Our Commitment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in the power of nature combined with science to create effective, gentle skincare that works
              for all skin types.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
