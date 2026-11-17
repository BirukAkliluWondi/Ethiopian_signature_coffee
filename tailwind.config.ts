import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#0b4627",
        "brand-green-dark": "#062b18",
        "brand-green-light": "#15653b",
        "brand-red": "#c8102e",
        "brand-red-dark": "#9e1025",
        "brand-yellow": "#d48800",
        "brand-yellow-light": "#fbbc0e",
        "surface-white": "#ffffff",
        "surface-subtle": "#fbfbfb",
        "surface-muted": "#f4f4f5",
        "border-subtle": "#e4e4e7",
        "text-main": "#18181b",
        "text-muted": "#52525b"
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "EB Garamond", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
