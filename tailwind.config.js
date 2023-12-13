import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      cover: "url('/src/assets/bg.jpg')",
    },
    fontFamily: {
      display: ["Noto Sans JP", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    // Animate delay plugins
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
  ],
};
