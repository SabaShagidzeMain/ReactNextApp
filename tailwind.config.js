/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#272727",
        "custom-red": "#310a0b",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
