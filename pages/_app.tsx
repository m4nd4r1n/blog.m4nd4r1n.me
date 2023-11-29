import App, { type AppContext, type AppProps } from 'next/app'
import dynamic from 'next/dynamic'

import 'katex/dist/katex.min.css'
import { ThemeProvider } from 'next-themes'
import 'prismjs/themes/prism-coy.css'
import 'react-notion-x/src/styles.css'

import loadLocale from '@/assets/i18n'
import Scripts from '@/components/Scripts'
import { ConfigProvider } from '@/lib/config'
import { prepareDayjs } from '@/lib/dayjs'
import { LocaleProvider } from '@/lib/locale'
import '@/styles/globals.css'
import '@/styles/notion.css'
import '@/styles/prism.css'
import type { BlogConfig, Locale } from '@/types'

interface AppOwnProps {
  config: BlogConfig
  locale: Locale
}

const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })

export default function MyApp({ Component, pageProps, config, locale }: AppProps & AppOwnProps) {
  return (
    <ConfigProvider value={config}>
      <Scripts />
      <LocaleProvider value={locale}>
        {process.env.NODE_ENV === 'production' && config?.analytics?.provider === 'ga' && <Gtag />}
        <ThemeProvider attribute='class' themes={['dark', 'light']}>
          <Component {...pageProps} />
        </ThemeProvider>
      </LocaleProvider>
    </ConfigProvider>
  )
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const config: BlogConfig =
    typeof window === 'object'
      ? await fetch('/api/config').then(res => res.json())
      : await import('@/lib/server/config').then(module => module.clientConfig)

  prepareDayjs(config.timezone)

  return {
    ...(await App.getInitialProps(ctx)),
    config,
    locale: await loadLocale('basic', config.lang)
  }
}
