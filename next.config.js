/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com'], // Update this to allow loading images from specific domains
  },
  // Additional configuration options can go here
}

module.exports = nextConfig

