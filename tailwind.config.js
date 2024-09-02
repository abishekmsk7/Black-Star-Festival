/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': {
            '50': '#FFFBF5', 
            '100': '#FFF6E8', 
            '200': '#FFE6C7', 
            '300': '#FFD2A6', 
            '400': '#FF9F63', 
            '500': '#ff6222', 
            '600': '#E6511C', 
            '700': '#BF3E13', 
            '800': '#992D0C', 
            '900': '#731C07', 
            '950': '#4A1003'
        }, 
        'secondary': {
            '50': '#FEFCFF', 
            '100': '#FDFAFF', 
            '200': '#F8F2FF', 
            '300': '#F3EBFF', 
            '400': '#E4D9FF', 
            '500': '#D4CAFF', 
            '600': '#AEA3E6', 
            '700': '#7E71BF', 
            '800': '#544899', 
            '900': '#332973', 
            '950': '#18114A'
        }
      },
      fontSize: theme => ({
        'xs':   '0.8rem',  // 12
        'sm':   '0.875rem', // 14
        'base': '1rem',     // 16
        'md':   '1.125rem', // 18
        'lg':   '1.25rem',  // 20
        'xl':   '1.5rem',   // 24
        '2xl':  '1.875rem', // 30
        '3xl':  '2.25rem',  // 36
        '4xl':  '3rem',     // 48
        '5xl':  '3.75rem',  // 60
        '6xl':  '4.5rem',   // 72
        '7xl':  '6rem',     // 96
        '8xl':  '8rem',     // 128
        '9xl':  '10rem',    // 160
      }),
      fontFamily: {
        'sans-primary': [
          'Panama'
        ],
        'heading': [
          'Matter'
        ],
      },

    },
  },
  plugins: [],
};
