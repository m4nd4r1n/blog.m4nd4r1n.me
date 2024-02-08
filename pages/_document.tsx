import { Head, Html, Main, NextScript } from 'next/document'

import { monaspace, pretendard } from '@/lib/fonts'
import { config } from '@/lib/server/config'

export default function Document() {
  return (
    <Html lang={config.lang}>
      <Head>
        <link rel='icon' href='/favicon.png' />
        {config.appearance === 'auto' ? (
          <>
            <meta
              name='theme-color'
              content={config.lightBackground}
              media='(prefers-color-scheme: light)'
            />
            <meta
              name='theme-color'
              content={config.darkBackground}
              media='(prefers-color-scheme: dark)'
            />
          </>
        ) : (
          <meta
            name='theme-color'
            content={config.appearance === 'dark' ? config.darkBackground : config.lightBackground}
          />
        )}
      </Head>
      <body
        className={`bg-day motion-safe:transition-all motion-safe:ease-linear dark:bg-night ${pretendard.variable} ${monaspace.variable} font-sans antialiased`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
