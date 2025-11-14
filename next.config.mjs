/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['1000coupoleexport.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1000coupoleexport.com',
      },
    ],
  },
  // Standalone output for deployment
  output: 'standalone',
  // Enable experimental features
  experimental: {
    serverActions: true,
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://1000coupoleexport.com',
  },
}

export default nextConfig
