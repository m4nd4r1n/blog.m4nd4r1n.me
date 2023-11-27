/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: 'gravatar.com'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          }
        ]
      }
    ]
  },
  transpilePackages: ['dayjs']
}
