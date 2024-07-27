/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/app.vue",
    "./src/error.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          from: {'background-position': '100% 0'},
          to: {'background-position': '-100% 0'}
        }
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite'
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

