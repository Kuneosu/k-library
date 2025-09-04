/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'raw.githubusercontent.com', 'picsum.photos', 'via.placeholder.com'],
  },
}

module.exports = nextConfig