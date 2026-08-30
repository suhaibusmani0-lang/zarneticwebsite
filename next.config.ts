import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mojli.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/#portfolio', destination: '/portfolio', permanent: true },
      { source: '/#about', destination: '/about', permanent: true },
      { source: '/#services', destination: '/services', permanent: true },
      { source: '/#team', destination: '/team', permanent: true },
      { source: '/#contact', destination: '/contact', permanent: true },
    ]
  },
}

export default nextConfig

