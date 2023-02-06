/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontSize: {
      xl: ["32px", { lineHeight: "48px" }],
      lg: ["24px", { lineHeight: "40px" }],
      base: ["16px", { lineHeight: "24px" }],
      sm: ["14px", { lineHeight: "20px" }],
      xs: ["12px", { lineHeight: "12px" }],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      uicolor: {
        10: "#414141",
        20: "#3C3C3C",
        30: "#373737",
        40: "#323232",
        50: "#2D2D2D",
        60: "#282828",
        70: "#232323",
        80: "#1E1E1E",
        90: "#191919",
        100: "#141414",
        error: "#7f1d1d",
      },
      textcolor: {
        primary: "rgba(255, 255, 255, 1)",
        secondary: "rgb(255, 255, 255 , 0.56)",
        disabled: "rgba(255, 255, 255, 0.32)",
      },
    },
    extend: {
      fontFamily: {
        title: ["Glysa"],
        default: ["LexendDeca"],
      },
      screens: {
        xs: "500px",
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
};
