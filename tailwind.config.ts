import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neuro: {
          50: '#F8FAFC',  // Neuro White
          100: '#F1F5F9',
          900: '#0F172A',
        },
        synapse: {
          400: '#818CF8',
          500: '#6366F1', // Primary
          600: '#4F46E5',
        },
        deep: {
          800: '#312E81',
          900: '#1E1B4B', // Secondary/Dark
          950: '#020617',
        },
        electric: {
          400: '#22D3EE',
          500: '#06B6D4', // Accent
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-outfit)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/assets/noise.png')", // Optional, if we want texture
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
