import Head from 'next/head'

import cn from 'classnames'
import PropTypes from 'prop-types'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useConfig } from '@/lib/config'
import { monaspace, suit } from '@/lib/fonts'

interface ContainerProps {
  layout?: 'blog' | 'post' | 'page'
  fullWidth?: boolean
  title?: string
  description?: string
  slug?: string
  date?: string
  type?: string
  image?: string
  keywords?: string[]
  postId?: string
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  layout,
  fullWidth,
  ...customMeta
}) => {
  const BLOG = useConfig()

  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  const meta = {
    title: BLOG.title,
    type: 'website',
    ...customMeta
  }
  const ogImage = meta.postId ? `${BLOG.link}/api/og?id=${encodeURIComponent(meta.postId)}` : null
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {/* <meta content={BLOG.darkBackground} name="theme-color" /> */}
        <meta name='robots' content='follow, index' />
        <meta charSet='UTF-8' />
        {BLOG.seo.googleSiteVerification && (
          <meta name='google-site-verification' content={BLOG.seo.googleSiteVerification} />
        )}
        {BLOG.seo.keywords && <meta name='keywords' content={BLOG.seo.keywords.join(', ')} />}
        <meta name='description' content={meta.description} />
        <meta property='og:locale' content={BLOG.lang} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:url' content={meta.slug ? `${url}/${meta.slug}` : url} />
        {ogImage && <meta property='og:image' content={ogImage} />}
        <meta property='og:type' content={meta.type} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:title' content={meta.title} />
        {ogImage && <meta name='twitter:image' content={ogImage} />}
        {meta.type === 'article' && (
          <>
            <meta property='article:published_time' content={meta.date} />
            <meta property='article:author' content={BLOG.author} />
          </>
        )}
      </Head>
      <div className={`wrapper ${suit.variable} ${monaspace.variable}`}>
        <Header navBarTitle={layout === 'blog' ? meta.title : null} fullWidth={fullWidth} />
        <main
          className={cn(
            'flex-grow',
            layout !== 'blog' && ['self-center px-4', fullWidth ? 'md:px-24' : 'w-full max-w-2xl']
          )}
        >
          {children}
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </>
  )
}

Container.propTypes = {
  children: PropTypes.node
}

export default Container
