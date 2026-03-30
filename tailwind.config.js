/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#F97316',          // Naranja ETC
          'primary-dark': '#EA580C',   // Naranja oscuro
          dark: '#1F2937',             // Gris carbón
        }
      }
    },
  },
  plugins: [],
}
