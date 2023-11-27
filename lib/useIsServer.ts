import { useSyncExternalStore } from 'react'

const subscribe = () => {
  return () => {}
}

const getSnapshot = () => {
  return false
}

const getServerSnapshot = () => {
  return true
}

export const useIsServer = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
