const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname, "../.."), // ✅ points to cybacad-monorepo
  },
};

module.exports = nextConfig;
