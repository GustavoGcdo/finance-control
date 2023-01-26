/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#212121',
        'primary': '#73D762',
        'primary-hover': '#d9ffd3',
        'primary-dark': '#237216',
      }
    },
  },
  plugins: [],
}
