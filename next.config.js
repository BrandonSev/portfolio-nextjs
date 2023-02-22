const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.brandon-seveste.fr", "localhost"],
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://api.brandon-seveste.fr",
  },
};

module.exports = nextConfig;
