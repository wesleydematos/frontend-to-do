/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "4rem",
    },
    screens: {
      mobile: "400px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#ffffff",
      black_rgba: "rgba(0, 0, 0, 0.54)",
      gray: {
        500: "#1D1A2C",
        400: "#100D1E",
        300: "#221E34",
        200: "#353149",
        100: "#C7C7C7",
      },
      green: {
        300: "#38F892",
        200: "#08490e",
        100: "#61FFAA",
      },
      yellow: {
        100: "#FACD35",
      },
      error: {
        100: "#E64980",
      },
    },
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
        winner: "Play, sans-serif",
      },
      backgroundImage: {
        home: "url('/src/assets/homebackground.jpg')",
        dashboard: "url('/src/assets/dashboard.jpg')",
      },
    },
  },
  plugins: [],
};
