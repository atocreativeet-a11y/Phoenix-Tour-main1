// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Add other image hosts you might use
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  // Your other configurations...
}

module.exports = nextConfig