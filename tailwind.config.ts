import type { Config } from 'tailwindcss'

import { FONTS_SANS, FONTS_SERIF } from './consts'
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
        }
      },
      fontFamily: {
        sans: FONTS_SANS,
        serif: FONTS_SERIF,
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
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
} satisfies Config
