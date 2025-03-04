import daisyui from "daisyui";
module.exports = {
  plugins: [daisyui,require('@tailwindcss/typography')],
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/layouts/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
      }
    }
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "retro",
      "valentine",
      "garden",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "winter",
      "nord",
    ],
  },
};
