/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_ENDPOINT: "localhost",
    API_PORT: 8080,
  },
};

module.exports = nextConfig;
