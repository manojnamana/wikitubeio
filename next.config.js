// // next.config.js
// module.exports = {
//     async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'https://wikitubeio.vercel.app/api/:path*',
//         },
//       ]
//     },
//   }
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://wikitubeio.vercel.app/api/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: false,
      },
    ];
  },
};
