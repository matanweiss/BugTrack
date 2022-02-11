module.exports = {
  content: [
    './public/index.html',
    './src/**/*.js'
  ],
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
  plugins: [],
}
