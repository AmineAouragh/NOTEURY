/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Balsamiq: ["Balsamiq Sans", "cursive"],
        Fuzzy: ['Fuzzy Bubbles', 'cursive'],
        Bakbak: ['Bakbak One', 'cursive'],
        Oswald: ['Oswald', 'sans-serif'],
        PTsans: ['PT Sans', 'sans-serif'],
        Lato: ['Lato', 'sans-serif'],
        Ubuntu: ['Ubuntu', 'sans-serif'],
        Vietnam: ['Bo Vietnam Pro', 'sans-serif'],
        PermanentMarker: ['Permanent marker', 'cursive'],
        Bangers: ['Bangers', 'cursive'],
        Secular: [ 'Secular One', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}