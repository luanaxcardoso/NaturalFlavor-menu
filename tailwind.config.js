/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        "capa": "url('/assets/capa1.jpeg')",
      },
    },
  },
  plugins: [],
}

