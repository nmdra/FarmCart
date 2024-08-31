/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      'green-light':'#F5FCE6',
      'custom-green': '#36753D',
    },},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

