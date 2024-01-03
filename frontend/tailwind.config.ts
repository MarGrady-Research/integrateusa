/** @type {import('tailwindcss').Config} */

import {
  primaryColor,
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "./constants";

const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-libre)"],
      },
      colors: {
        primary: primaryColor,
        secondary: "rgb(252,136,55)",
        "line-red": "rgb(255, 99, 132)",
        asian: asianColor,
        blackstudents: blackColor,
        hispanic: hispanicColor,
        whitestudents: whiteColor,
        other: otherColor,
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
