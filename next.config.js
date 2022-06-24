const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.cr.brandon-seveste.fr", "localhost"],
  },
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
};

module.exports = nextConfig;
