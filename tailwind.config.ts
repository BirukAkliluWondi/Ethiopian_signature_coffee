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
        "surface-cream": "#fdfbf7",
        "surface-warm": "#f7f3ec",
        "surface-subtle": "#faf7f2",
        "surface-muted": "#f2ede4",
        "border-subtle": "#ebe3d7",
        "border-warm": "#e4dacb",
        "text-main": "#1c1815",
        "text-muted": "#5c544d"
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "EB Garamond", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        "cozy-sm": "0 2px 8px -1px rgba(36, 20, 10, 0.04), 0 1px 3px 0 rgba(36, 20, 10, 0.02)",
        "cozy": "0 10px 30px -4px rgba(36, 20, 10, 0.06), 0 4px 12px -2px rgba(36, 20, 10, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
        "cozy-lg": "0 20px 48px -8px rgba(36, 20, 10, 0.08), 0 8px 20px -4px rgba(36, 20, 10, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        "cozy-float": "0 24px 60px -12px rgba(36, 20, 10, 0.12), 0 10px 24px -4px rgba(36, 20, 10, 0.04)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
