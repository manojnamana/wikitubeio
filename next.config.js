// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://wikitubeio.vercel.app/api/:path*',
        },
      ]
    },
  }
  