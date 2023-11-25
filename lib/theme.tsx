import { createContext, useContext, useEffect } from 'react'

import { useMedia } from 'react-use'

import { useConfig } from '@/lib/config'

const ThemeContext = createContext<{ dark: boolean | null }>({ dark: true })

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const { appearance } = useConfig()

  // `defaultState` should normally be a boolean. But it causes initial loading flashes in slow
  // rendering. Setting it to `null` so that we can differentiate the initial loading phase
  // @ts-expect-error: `null` is a valid value for `defaultState`
  const prefersDark = useMedia('(prefers-color-scheme: dark)', null) as boolean | null
  const dark = appearance === 'dark' || (appearance === 'auto' && prefersDark)

  useEffect(() => {
    // Only decide color scheme after initial loading, i.e. when `dark` is really representing a
    // media query result
    if (typeof dark === 'boolean') {
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.classList.remove('color-scheme-unset')
    }
  }, [dark])

  return <ThemeContext.Provider value={{ dark }}>{children}</ThemeContext.Provider>
}

export default function useTheme() {
  return useContext(ThemeContext)
}
