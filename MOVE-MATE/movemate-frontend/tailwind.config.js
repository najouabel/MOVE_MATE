/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      colors : {
        'custGreen1' : '#E7BB31',
        'custGreen2' : '#E7BB31',
        'custGreen3' : '#E7BB31',
        'custGray' : '#E7BB31',
        'custOrangeStr':"#E7BA2E",
        'customBlue': {
          DEFAULT: 'rgb(80 155 227)',
          '30': 'rgba(80, 155, 227, 0.3)'
        }}
    },
  },
}
