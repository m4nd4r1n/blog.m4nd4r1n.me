import { useRouter } from 'next/router'
import { useEffect } from 'react'

import * as gtag from '@/lib/gtag'
import { useConfig } from '@/lib/config'

const Gtag = () => {
  const config = useConfig()
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(config.analytics.gaConfig.measurementId, url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [config, router.events])
  return null
}
export default Gtag
