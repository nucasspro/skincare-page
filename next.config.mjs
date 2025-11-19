import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Turbopack config (default in Next.js 16)
  turbopack: {
    resolveAlias: {
      'react-dom': path.resolve(process.cwd(), 'lib/shims/react-dom.ts'),
      'react-dom/client': path.resolve(process.cwd(), 'lib/shims/react-dom/client.ts'),
    },
  },
  // Keep webpack config as fallback for --webpack flag
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias['react-dom'] = path.resolve(process.cwd(), 'lib/shims/react-dom.ts')
    config.resolve.alias['react-dom/client'] = path.resolve(process.cwd(), 'lib/shims/react-dom/client.ts')
    return config
  },
}

export default nextConfig
