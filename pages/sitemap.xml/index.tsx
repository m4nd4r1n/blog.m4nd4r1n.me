import type { GetServerSideProps } from 'next'

import { type ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap'

import { getAllPosts } from '@/lib/notion'
import { config } from '@/lib/server/config'

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx.req.method !== 'GET') {
    ctx.res.statusCode = 405
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.res.write(JSON.stringify({ error: 'method not allowed' }))
    ctx.res.end()
    return {
      props: {}
    }
  }
  const posts = await getAllPosts({ includePages: false })
  if (!posts) return { notFound: true }

  const latest = Math.max(...posts.map(post => post.date))

  const fields: ISitemapField[] = posts.map(post => ({
    loc: `${config.link}/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'daily',
    priority: 0.7
  }))
  const home: ISitemapField = {
    loc: `${config.link}`,
    lastmod: new Date(latest).toISOString(),
    changefreq: 'daily',
    priority: 0.7
  }

  ctx.res.setHeader('Cache-Control', 'public, max-age=28800, stale-while-revalidate=28800')

  return getServerSideSitemapLegacy(ctx, [home, ...fields])
}

export default function Sitemap() {}
