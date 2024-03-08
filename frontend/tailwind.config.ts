/** @type {import('tailwindcss').Config} */

import { primaryColor, selectedLineColor } from "./constants";

const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(--font-libre)`],
      },
      colors: {
        primary: primaryColor,
        secondary: "rgb(252,136,55)",
        "line-selected": selectedLineColor,
        "map-control": "#333333",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
