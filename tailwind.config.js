import  daisyui   from"daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "base-100" : "rgb(234, 225, 225)",
          "base-200" :"#FFFFFF",
          "base-300" :"rgb(222, 222, 222)",
          primary: "#633cff",
          "primary-focus":"#fff",
          "primary-content":"#FFFFFF",
          neutral:"#737373",
   
        },
      },
      "dark"
    ],
  },
}
