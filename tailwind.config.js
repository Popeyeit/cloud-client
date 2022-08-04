module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        file: "1fr 4fr repeat(4, 1fr)",
      },
    },
  },
  plugins: [],
};
// [1fr 4fr repeat(4, 1fr)]
