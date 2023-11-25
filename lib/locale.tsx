import { createContext, useContext } from 'react'

import type { Locale } from '@/types'

interface LocaleProviderProps {
  value: Locale
}

const LocaleContext = createContext<Locale | undefined>(undefined)

export function LocaleProvider({ value, children }: React.PropsWithChildren<LocaleProviderProps>) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export const useLocale = () => {
  const locale = useContext(LocaleContext)

  if (!locale) throw new Error('useLocale must be used within a LocaleProvider')

  return locale
}
