// /** @type {import('tailwindcss').Config} */


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#223a66",
        primary: "#3238f2",
        "custom-red": "#ff0000",
        "banner-color": "#012169",
        "back-color": "#f4f9fc",
        "back-record": "#f4f9fc",
        "login-color": "#79c2d0",
        "brand-600": "#1D4ED8",
        // Add your custom color
      },
      padding: {
        15: "3.75rem", // Adding custom padding for 'px-15'
      },
      margin: {
        15: "5.75rem",
        20: "6.7rem",
        30: "10.7rem",
        40: "32.5rem",
      },
      width: {
        "1/6-custom": "18%", // Custom width for example
        "1/8-custom": "12.5%", // Add as many custom widths as needed
      },
      fontFamily: {
        exo: ['"Exo"', "sans-serif"],
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotate: "rotate 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};
