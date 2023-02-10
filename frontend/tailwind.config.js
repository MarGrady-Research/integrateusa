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
        'line-red': 'rgb(255, 99, 132)',
        'asian': "#FF5050",
        'blackstudents': "#4472C4",
        'hispanic': "#FF9900",
        'other': "#FFC000",
        'whitestudents': "#339933",
      },
      transitionProperty : {
        'width': 'width',
      }
    },
  },
  plugins: [],
}
