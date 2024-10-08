/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-light': '#F5FCE6',
        'custom-green': '#36753D',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    nextui(),
  ],
}
