module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'rotateX(20deg)' },
          '100%': { opacity: 1, transform: 'rotateX(0)' }
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'rotateX(0)' },
          '100%': { opacity: 0, transform: 'rotateX(20deg)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn .6s',
        fadeOut: 'fadeOut .1s'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
