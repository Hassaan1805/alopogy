/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#070B14',
        cosmic: '#10192C',
        aurora: '#4A7DFF',
        purple: '#8C6CFF',
        gold: '#F5C76A',
        softwhite: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
