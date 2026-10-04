/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#10201F',
          soft: '#172A28',
        },
        paper: {
          DEFAULT: '#E9EDE4',
          dim: '#DDE3D6',
        },
        sage: {
          DEFAULT: '#B6C3B0',
          ghost: '#ADBAA7',
        },
        compass: {
          gold: '#E8732A', // primary accent (orange)
          teal: '#0E7C86',
          sky: '#4A90A4',
          coral: '#E1613F',
        },
        ink80: 'rgba(16,32,31,0.8)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      keyframes: {
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spinSlow: 'spinSlow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
