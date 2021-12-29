module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#091222",
        secondary: "#15191F",
        third: "#017AFF",
        four: "#152347",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
