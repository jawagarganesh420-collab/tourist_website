/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#10131A',
          soft: '#1B2130',
        },
        paper: {
          DEFAULT: '#F7F4EC',
          dim: '#EFEADD',
        },
        compass: {
          gold: '#E8A33D',
          teal: '#1B6E6B',
          sky: '#4A90A4',
          coral: '#E1613F',
        },
        ink80: 'rgba(16,19,26,0.8)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(-10%) translateY(0)' },
          '50%': { transform: 'translateX(6%) translateY(-4%)' },
          '100%': { transform: 'translateX(-10%) translateY(0)' },
        },
        flyby: {
          '0%': { transform: 'translate(-10vw, 0) rotate(6deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translate(110vw, -6vh) rotate(6deg)', opacity: 0 },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.15 },
          '50%': { opacity: 0.9 },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        flyby: 'flyby 26s linear infinite',
        spinSlow: 'spinSlow 40s linear infinite',
        twinkle: 'twinkle 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
