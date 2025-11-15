/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-cocoa': '#453013',
        'latte-sand': '#C9AD90',
        'soft-cream': '#FFF6F0',
      },
      fontFamily: {
        'cooper': ['Cooper Black', 'serif'],
      },
    },
  },
  plugins: [],
}