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
          DEFAULT: "#08081F", // Darker Deep Black Background
          light: "#1A1A40",   // Lighter shade for footer/sections
          highlight: "#262650" // Highlight shade
        },
        carbon: '#151538',   // Card BG - harmonized with new Obsidian
        mist: '#9CA3AF',     // Text Color
        frost: {
            100: '#e0f2fe', 
            500: '#38bdf8', // Bright Highlight
        },
        ice: {
          DEFAULT: "#0ea5e9", // Primary Blue
          400: '#22d3ee', // Cyan Accent
          500: '#0ea5e9', // Primary Blue
          600: '#0284c7', // Deep Blue
          900: '#0c4a6e', // Dark Navy Glow
          dim: "#0284c7",
          glow: "rgba(14, 165, 233, 0.5)",
        },
      },
      fontFamily: {
        display: ["Teko", "sans-serif"], // Maps to font-teko in your HTML
        teko: ["Teko", "sans-serif"],    // Alias for direct use
        body: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],  // Alias for direct use
      },
      backgroundImage: {
        'swamp': "url('https://images.unsplash.com/photo-1599589658826-6b2746465e94?q=80&w=2574&auto=format&fit=crop')",
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      letterSpacing: {
        'super-wide': '0.3em',
      },
      boxShadow: {
        'neon-blue': '0 0 20px 2px rgba(14, 165, 233, 0.4)',
      },
      animation: {
        'cold-front': 'cold-front 8s ease-in-out infinite',
        'radar': 'radar 4s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-bar': 'bounce 1.2s infinite ease-in-out',
        'scan-vertical': 'scanVertical 3s ease-in-out infinite',
      },
      keyframes: {
        'cold-front': {
          '0%, 100%': { 
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': { 
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        radar: {
            '0%': { 'background-position': '100% 50%' },
            '100%': { 'background-position': '0% 50%' }
        },
        bounce: {
            '0%, 100%': { height: '20%' },
            '50%': { height: '100%' }
        },
        scanVertical: {
            '0%': { top: '0%', opacity: '0' },
            '10%': { opacity: '1' },
            '90%': { opacity: '1' },
            '100%': { top: '95%', opacity: '0' }
        }
      },
    },
  },
  plugins: [],
};
export default config;