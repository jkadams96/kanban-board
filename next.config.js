const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      "@utils": path.resolve(__dirname, "utils"),
      "@components": path.resolve(__dirname, "components"),
      "@app": path.resolve(__dirname, "app"),
    }
    return config
  },
}

module.exports = nextConfig