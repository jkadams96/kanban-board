import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@utils": path.resolve(__dirname, "utils"),
      "@components": path.resolve(__dirname, "components"),
      "@app": path.resolve(__dirname, "app"),
      "@lib": path.resolve(__dirname, "lib"),
      "@hooks": path.resolve(__dirname, "hooks"),
    };
    return config;
  },
};

export default nextConfig;
