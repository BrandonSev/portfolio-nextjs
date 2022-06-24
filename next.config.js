const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.cr.brandon-seveste.fr", "localhost"],
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
