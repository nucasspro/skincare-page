"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Suspense } from "react"

function ProductModel() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <cylinderGeometry args={[1, 1.2, 3, 32]} />
        <meshStandardMaterial color="#f5f5f0" metalness={0.3} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.5, 32]} />
        <meshStandardMaterial color="#d4c5b0" metalness={0.5} roughness={0.3} />
      </mesh>
    </Float>
  )
}

export function Product3DShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Product */}
          <div className="h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <ProductModel />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                <Environment preset="studio" />
              </Suspense>
            </Canvas>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-stone-600 tracking-wider uppercase">Featured Product</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">Radiance Renewal Serum</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our signature serum combines powerful antioxidants with hydrating botanicals to reveal your skin's natural
              luminosity.
            </p>
            <ul className="space-y-3">
              {["Reduces fine lines", "Brightens complexion", "Deeply hydrates", "Clinically tested"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                Shop Now - $89
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
