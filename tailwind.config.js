/** @type {import('tailwindcss').Config} */
import shadcnTailwindPlugin from "./src/components/shadcn/lib/shadcn-tailwind-config";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui"), require("tailwindcss-animate"), shadcnTailwindPlugin],

  daisyui: {
    custom_theme: {
      "color-scheme": "light",
      primary: "#ffd545",
      "primary-content": "#4c4528",
      secondary: "#dbe774",
      "secondary-content": "#5d3f18",
      accent: "#c0370d",
      "accent-content": "#180a02",
      neutral: "#060023",
      "neutral-content": "#c4c5d0",
      "base-100": "#ffffff",
      "base-200": "#e8e8e8",
      "base-300": "#d1d1d1",
      "base-content": "#161616",
      success: "#00a96e",
      error: "#741317",
      info: "#00b5ff",
      warning: "#bb9625",
      "--animation-btn": ".25s",
      "--animation-input": ".2s",
      "--border-btn": "1px",
      "--btn-focus-scale": ".95",
      "--rounded-badge": "1.9rem",
      "--rounded-box": "1rem",
      "--rounded-btn": ".5rem",
      "--tab-border": "1px",
      "--tab-radius": ".5rem",
    },
  },
};
