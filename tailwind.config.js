module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#fff', // Replace with your desired blue color code
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
