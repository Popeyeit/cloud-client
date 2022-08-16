module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        file: "1fr 4fr repeat(4, 1fr)",
      },
      backgroundImage: {
        multiple_square: "url('/src/assets/img/multiple_square.svg')",
        list: "url('/src/assets/img/list.svg')",
      },
    },
  },
  plugins: [],
};
// [1fr 4fr repeat(4, 1fr)]
