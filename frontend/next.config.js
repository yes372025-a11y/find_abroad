/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
  images: {
    domains: ["localhost", "images.unsplash.com", "via.placeholder.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "https://3xt8kq12-8000.inc1.devtunnels.ms/api/v1",
  },
};

module.exports = nextConfig;
