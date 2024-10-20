/** @type {import('tailwindcss').Config} */
import shadcnTailwindPlugin from "./src/components/shadcn/lib/shadcn-tailwind-config";
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		screens: {
  			print: {
  				raw: 'print'
  			},
  			screen: {
  				raw: 'screen'
  			}
  		},
  		colors: {
  			sidebar: {
  				DEFAULT: 'oklch(var(--sidebar-background))',
  				foreground: 'oklch(var(--sidebar-foreground))',
  				primary: 'oklch(var(--sidebar-primary))',
  				'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
  				accent: 'oklch(var(--sidebar-accent))',
  				'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
  				border: 'oklch(var(--sidebar-border))',
  				ring: 'oklch(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animate"),
    shadcnTailwindPlugin,
  ],

  daisyui: {
    light: {
      "color-scheme": "dark",
      primary: "#7480ff",
      "primary-content": "#050617",
      secondary: "#ff52d9",
      "secondary-content": "#190211",
      accent: "#00cdb8",
      "accent-content": "#000f0c",
      neutral: "#2a323c",
      "neutral-content": "#a6adbb",
      "base-100": "#1d232a",
      "base-200": "#191e24",
      "base-300": "#15191e",
      "base-content": "#a6adbb",
      success: "#00a96e",
      error: "#ff5861",
      info: "#00b5ff",
      warning: "#ffbe00",
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
    dark: {
      "color-scheme": "dark",
      primary: "#7480ff",
      "primary-content": "#050617",
      secondary: "#ff52d9",
      "secondary-content": "#190211",
      accent: "#00cdb8",
      "accent-content": "#000f0c",
      neutral: "#2a323c",
      "neutral-content": "#a6adbb",
      "base-100": "#1d232a",
      "base-200": "#191e24",
      "base-300": "#15191e",
      "base-content": "#a6adbb",
      success: "#00a96e",
      error: "#ff5861",
      info: "#00b5ff",
      warning: "#ffbe00",
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
