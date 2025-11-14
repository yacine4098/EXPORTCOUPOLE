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
  // For Vercel deployment
  output: 'standalone',
}

export default nextConfig
