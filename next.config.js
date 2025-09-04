/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['github.com', 'raw.githubusercontent.com', 'picsum.photos', 'via.placeholder.com'],
  },
}

module.exports = nextConfig