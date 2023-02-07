/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif']
      },
      colors: {
        'line-red': 'rgb(255, 99, 132)'
      },
      transitionProperty : {
        'width': 'width',
      }
    },
  },
  plugins: [],
}
