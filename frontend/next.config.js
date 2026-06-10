/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "images.unsplash.com",
      "via.placeholder.com",
      "images.pexels.com",
      "randomuser.me",
      "i.pravatar.cc",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "https://3xt8kq12-8000.inc1.devtunnels.ms/api/v1",
  },
};

module.exports = nextConfig;
