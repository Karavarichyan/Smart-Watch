module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["breeze_sans", "serif"],
        // 'serif': ['YourFontName', 'serif'],
        // 'mono': ['YourFontName', 'monospace'],
        // Add more font families if needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
