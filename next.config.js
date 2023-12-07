/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "localhost",
    ]
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
