/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
  },

  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },

    extend: {
      colors: {
        primary: '#43BFC7',
        'primary-deep': '#17939b',
        'primary-light': '#F4FEFF',
      },
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          // marginLeft: 'auto',
          // marginRight: 'auto',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      });
    },
  ],
};
