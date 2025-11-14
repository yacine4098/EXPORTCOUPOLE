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
}

export default nextConfig
