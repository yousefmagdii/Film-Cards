/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        luxurious: 'Luxurious Script, cursive',
        dance: 'Dancing Script, cursive',
        caveat: 'Caveat, cursive',
        pacifico: 'Pacifico, cursive',
      },
    },
  },
  plugins: [],
};
