/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonOrange: '#D4AF37', // Premium Gold
        cyberOrange: '#FF4500', // Deep intense orange for accents
        neonGreen: '#FFFFFF',  // Clean White
        darkBg: '#030303', // Deepest black for OLED premium feel
        deepSpace: '#050505',
        cardBg: 'rgba(20, 20, 20, 0.5)',
        glassBg: 'rgba(255, 255, 255, 0.02)',
        glassBorder: 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cyber: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit': 'orbit 30s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
