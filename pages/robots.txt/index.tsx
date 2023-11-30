import type { GetServerSideProps } from 'next'

import { config } from '@/lib/server/config'

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ error: 'method not allowed' }))
    res.end()

    return {
      props: {}
    }
  }

  res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *
Allow: /

Host: ${config.link}

Sitemap: ${config.link}/sitemap.xml
`)
  res.end()

  return {
    props: {}
  }
}

export default function Robots() {}
