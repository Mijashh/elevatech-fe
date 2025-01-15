import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'brand': {
          DEFAULT: '#0066FF',
          50: '#B8D4FF',
          100: '#A3C8FF',
          200: '#7AAFFF',
          300: '#5297FF',
          400: '#297EFF',
          500: '#0066FF',
          600: '#0050C7',
          700: '#00398F',
          800: '#002357',
          900: '#000C1F',
          950: '#000103',
        },
      },
    },
  },
}
