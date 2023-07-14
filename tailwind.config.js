/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    color: {
      bg: '#212529',
      primary: '#276678',
      secondary: '#1687A7',
      light: '#D3E0EA',
      white: '#FFF6F4',
      gray: '#7E7E7E',
      black: '#2F2F2F',
      text: '#212529',
      heading: '#27374D',
      subheading: '#526D82',
    },
    screens: {
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '640px' },
      xsm: { max: '480px' },
      xxsm: { max: '400px' },
      xxxsm: { max: '300px' },
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
