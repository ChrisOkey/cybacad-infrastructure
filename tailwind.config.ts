import type { Config } from "tailwindcss";

const config: Config = {
  // This content path is now correct for a root-level config file
  content: [
    "./apps/cybacad-frontend/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
