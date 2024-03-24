import withBundleAnalyzer from "@next/bundle-analyzer";
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const isProduction = process.env.NODE_ENV === "production";
const analyze = process.env.ANALYZE === "true";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: analyze,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: isProduction,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default withPWA({
  dest: "public",
  disable: !isProduction,
  runtimeCaching,
})(bundleAnalyzer(nextConfig));
