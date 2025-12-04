/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Enables dark mode via class toggling
  content: [
    "./src/**/*.{ts,tsx}", // ✅ Includes all TS/TSX files in src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb", // Tailwind blue-600
          dark: "#1e40af",    // Tailwind blue-800
        },
        accent: {
          DEFAULT: "#f59e0b", // Tailwind amber-500
        },
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

