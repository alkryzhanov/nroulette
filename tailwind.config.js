/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "radical-red": "#f65261",
        "gray-one": "rgba(96, 96, 96, 0.7)",
      },
    },
  },
  plugins: [],
};
