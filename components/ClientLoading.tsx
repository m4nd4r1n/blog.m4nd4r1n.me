import { useIsServer } from '@/lib/useIsServer'

interface ClientLoadingProps {
  fallback?: React.ReactNode
}

const ClientLoading: React.FC<React.PropsWithChildren<ClientLoadingProps>> = ({
  children,
  fallback = null
}) => {
  const isServer = useIsServer()
  if (isServer) return fallback

  return children
}

export default ClientLoading
