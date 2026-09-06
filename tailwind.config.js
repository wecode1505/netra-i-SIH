/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#050505', // True black/deepest slate
          800: '#0f1115', // Premium dark card background
          700: '#1e2128', // Subtle borders
          600: '#2a2f3a', // Hover states
        },
        accent: {
          cyan: '#06b6d4',   // Primary AI Color
          indigo: '#6366f1', // Secondary AI Color
          red: '#ef4444',    // Alerts
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}