module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.js'
  ],
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
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .6s',
        fadeOut: 'fadeOut .3s'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}