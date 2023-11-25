import { createContext, useContext } from 'react'

import type { BlogConfig } from '@/types'

interface ConfigProviderProps {
  value: BlogConfig
}

const ConfigContext = createContext<BlogConfig | undefined>(undefined)

export function ConfigProvider({ value, children }: React.PropsWithChildren<ConfigProviderProps>) {
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  const config = useContext(ConfigContext)

  if (!config) throw new Error('useConfig must be used within a ConfigProvider')

  return config
}
