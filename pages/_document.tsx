import { Head, Html, Main, NextScript } from 'next/document'

import CJK from '@/lib/cjk'
import { config } from '@/lib/server/config'

export default function Document() {
  return (
    <Html lang={config.lang}>
      <Head>
        {config.font && config.font === 'serif' ? (
          <>
            <link
              rel='preload'
              href='/fonts/SourceSerif.var.woff2'
              as='font'
              type='font/woff2'
              crossOrigin='anonymous'
            />
            <link
              rel='preload'
              href='/fonts/SourceSerif-Italic.var.woff2'
              as='font'
              type='font/woff2'
              crossOrigin='anonymous'
            />
          </>
        ) : (
          <>
            <link
              rel='preload'
              href='/fonts/IBMPlexSansVar-Roman.woff2'
              as='font'
              type='font/woff2'
              crossOrigin='anonymous'
            />
            <link
              rel='preload'
              href='/fonts/IBMPlexSansVar-Italic.woff2'
              as='font'
              type='font/woff2'
              crossOrigin='anonymous'
            />
          </>
        )}

        {['zh', 'ja', 'ko'].includes(config.lang.slice(0, 2).toLocaleLowerCase()) && (
          <>
            <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
            <link
              rel='preload'
              as='style'
              href={`https://fonts.googleapis.com/css2?family=Noto+${
                config.font === 'serif' ? 'Serif' : 'Sans'
              }+${CJK()}:wght@400;500;700&display=swap`}
            />
            <link
              rel='stylesheet'
              href={`https://fonts.googleapis.com/css2?family=Noto+${
                config.font === 'serif' ? 'Serif' : 'Sans'
              }+${CJK()}:wght@400;500;700&display=swap`}
            />
            <noscript>
              <link
                rel='stylesheet'
                href={`https://fonts.googleapis.com/css2?family=Noto+${
                  config.font === 'serif' ? 'Serif' : 'Sans'
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
            </noscript>
          </>
        )}
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
      <body className='bg-day motion-safe:transition-all motion-safe:ease-linear dark:bg-night'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
