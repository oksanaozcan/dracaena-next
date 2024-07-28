/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
    ],
    domains: [
      'localhost',
    ],
  },
  experimental: {},
};

module.exports = nextConfig;

