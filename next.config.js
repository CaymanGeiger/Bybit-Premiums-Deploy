/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "s2.coinmarketcap.com",
      "bybit-premiums-deployment.vercel.app",
    ],
  },
  env: {
    BACKEND_URL:
      process.env.BACKEND_URL ||
      "https://bybit-premiums-back-end-dd9a566bba8e.herokuapp.com",
  },
  async rewrites() {
    return [
      {
        source: "/:path*/admin",
        destination: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
