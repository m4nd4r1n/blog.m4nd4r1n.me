import type { Config } from 'tailwindcss'

import { config } from './lib/server/config'

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: config.lightBackground || '#ffffff'
        },
        night: {
          DEFAULT: config.darkBackground || '#111827'
        },
        sun: {
          DEFAULT: '#ffd700'
        },
        moon: {
          DEFAULT: '#dddddd'
        },
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b'
        }
      },
      fontFamily: {
        noEmoji: [
          '"IBM Plex Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      },
      boxShadow: {
        'switch-day':
          'inset 0 -1px 2px #987416, 0 1px 2px #80808077, 0 0 0 6px #ffffff22, 0 0 0 12px #ffffff22, 6px 0 0 12px #ffffff22',
        'switch-night':
          'inset 0 -1px 2px #808080, 0 1px 2px #555555, 0 0 0 6px #ffffff22, 0 0 0 12px #ffffff22, -6px 0 0 12px #ffffff22',
        'switch-inset': 'inset 0 0 3px'
      },
      backgroundImage: {
        'switch-day': 'linear-gradient(skyblue, cadetblue)',
        'switch-night': 'linear-gradient(-45deg, #222, #000030)'
      },
      width: {
        post: 'calc(100% - 120px)'
      },
      maxWidth: {
        'list-image': '120px'
      },
      maxHeight: {
        'list-image': '120px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
} satisfies Config
