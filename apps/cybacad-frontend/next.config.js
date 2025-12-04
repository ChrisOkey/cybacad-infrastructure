/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // ✅ This tells Next.js to compile your local UI package
  transpilePackages: ["@cybacad/ui"], 
};

module.exports = nextConfig;