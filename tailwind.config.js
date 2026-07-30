/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          primary: '#FDB813',
          'primary-light': '#FFE59E',
          secondary: '#FF8CA3',
          'secondary-light': '#FFCCD5',
          accent: '#90B77D',
          'accent-light': '#C5E0B4',
          text: '#3E2723',
          background: '#FFFDF9',
        },
      },
      fontFamily: {
        handwritten: ['"Merienda"', 'cursive'], /* overridden in index.css via CSS variable */
        elegant: ['"Playfair Display"', 'serif'],
        signature: ['"Merienda"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        romantic: '0 10px 40px -10px rgba(253, 184, 19, 0.15), 0 2px 10px rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'heart-float': 'heart-float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'heart-float': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-100vh) scale(0.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
