export default () => {
  /** @type {import('next').NextConfig} */

  return {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
      removeConsole: process.env.NODE_ENV === "production",
    },
    webpack: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      return config;
    },
  };
};
