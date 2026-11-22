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
        "text-muted": "#5c544d",
        // Stitch Admin Design System Tokens
        surface: "#fcf9f8",
        "surface-dim": "#dcd9d9",
        "surface-bright": "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "surface-container-highest": "#e5e2e1",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#414942",
        "inverse-surface": "#313030",
        "inverse-on-surface": "#f3f0ef",
        "stitch-primary": "#002f19",
        "stitch-primary-container": "#0d472a",
        "stitch-on-primary-container": "#7db590",
        "stitch-primary-fixed": "#b6f0c7",
        "stitch-primary-fixed-dim": "#9ad3ac",
        "stitch-secondary": "#745853",
        "stitch-secondary-container": "#fed7d0",
        "stitch-tertiary": "#352500",
        "stitch-tertiary-fixed": "#ffdea0",
        "stitch-tertiary-fixed-dim": "#fbbc0e",
        "stitch-outline": "#717971",
        "stitch-outline-variant": "#c0c9c0"
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "EB Garamond", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        "cozy-sm": "0 2px 10px -1px rgba(24, 11, 4, 0.05), 0 1px 4px 0 rgba(212, 136, 0, 0.03)",
        "cozy": "0 12px 34px -4px rgba(22, 10, 4, 0.08), 0 4px 14px -2px rgba(212, 136, 0, 0.05), 0 0 24px -6px rgba(212, 136, 0, 0.03), inset 0 1px 0 rgba(255, 252, 245, 0.9)",
        "cozy-lg": "0 24px 54px -10px rgba(20, 9, 3, 0.11), 0 8px 26px -4px rgba(212, 136, 0, 0.09), 0 0 60px -15px rgba(212, 136, 0, 0.06), inset 0 1px 0 rgba(255, 252, 245, 0.95)",
        "cozy-float": "0 28px 65px -12px rgba(20, 9, 3, 0.15), 0 12px 30px -4px rgba(212, 136, 0, 0.11), 0 0 50px -10px rgba(212, 136, 0, 0.08)",
        "roast-bloom": "0 20px 50px -10px rgba(20, 9, 3, 0.14), 0 8px 25px -4px rgba(212, 136, 0, 0.12), 0 0 70px -15px rgba(212, 136, 0, 0.10)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
