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
  // Exclude old Vite files from build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: [
        /node_modules/,
        /src\/pages\//, // Exclude old pages directory
        /src\/App\.tsx/,
        /src\/main\.tsx/,
      ],
    })
    return config
  },
}

export default nextConfig
