// frontend/next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL}/:path*`,
        },
      ];
    },
  };
  