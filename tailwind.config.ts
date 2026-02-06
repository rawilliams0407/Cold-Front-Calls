import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08081F", // Deep Black extraction
          light: "#12122A",   // Lighter shade
          highlight: "#1E1E3F", // Highlight shade
          glass: "rgba(8, 8, 31, 0.7)", // Glass variant
        },
        platinum: {
          DEFAULT: "#E4E4E7", // Zinc-200 (Silver/Platinum)
          light: "#F4F4F5",   // Zinc-100 (Bright Silver)
          dark: "#A1A1AA",    // Zinc-400 (Darker Gunmetal)
          shimmer: "rgba(255, 255, 255, 0.5)", // Shimmer overlay
        },
        stone: {
          DEFAULT: "#57534E", // Stone-600
          light: "#A8A29E",   // Stone-400
        },
        ice: {
          DEFAULT: "#0ea5e9", // Ice 500 (Primary Blue)
          300: "#7dd3fc",     // Sky-300
          400: "#22d3ee",     // Ice 400 (Cyan Accent - Sparks)
          500: "#0ea5e9",     // Ice 500 (Primary Blue)
          600: "#0284c7",     // Ice 600 (Deep Blue - Depth/Hover)
          900: "#0c4a6e",     // Sky-900
          glow: "rgba(14, 165, 233, 0.6)",
        },
        frost: {
          500: "#38bdf8",     // Frost 500 (Bright Highlight - Glowing Borders/Text)
        },
        mist: "#9CA3AF", // Gray-400
      },
      fontFamily: {
        display: ["Playfair Display", "serif"], // Premium Heritage
        body: ["Inter", "sans-serif"],          // Clean Modern
        teko: ["Teko", "sans-serif"],           // Keep for specific technical data if needed
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      animation: {
        'slow-morph': 'morph 8s ease-in-out infinite',
        'liquid-flow': 'liquid 15s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
      },
      keyframes: {
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        liquid: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.15) translate(-1%, -1%)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;