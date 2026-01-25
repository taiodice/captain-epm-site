/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/admin.html',
        destination: 'https://api.captain-epm.com/admin.html',
      },
      {
        source: '/api/Admin/:path*',
        destination: 'https://api.captain-epm.com/api/Admin/:path*',
      },
    ]
  },
}

module.exports = nextConfig
