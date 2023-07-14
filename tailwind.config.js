/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
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
    extend: {
      keyframes: {
        bounceInOut: {
          '0%, 25%': { transform: 'translateY(-10px)' },
          '25%, 75%': { transform: 'translateY(20px)' },
          '75%, 100%': { transform: 'translateY(-10px)' },
        },
        bounceOutIn: {
          '0%, 25%': { transform: 'translateY(15px)' },
          '25%, 75%': { transform: 'translateY(-30px)' },
          '75%, 100%': { transform: 'translateY(15px)' },
        },
      },
      animation: {
        bounceInOut: 'bounceInOut 5s linear infinite',
        bounceOutIn: 'bounceOutIn 4s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'night'],
    darkTheme: 'night',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
