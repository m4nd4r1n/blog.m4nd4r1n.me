import type { NextApiHandler } from 'next'

import { idToUuid } from 'notion-utils'

import getPageProperties from '@/lib/notion/getPageProperties'
import api from '@/lib/server/notion-api'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })
  const { id } = req.query
  if (typeof id !== 'string' || !id) return res.status(400).json({ message: 'Invalid request' })
  try {
    const notionPageId = idToUuid(process.env.NOTION_PAGE_ID)
    const response = await api.getPage(notionPageId)
    const collection = Object.values(response.collection)[0]?.value
    const block = response.block
    const schema = collection?.schema
    const properties = await getPageProperties(id, block, schema)

    res.setHeader(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600'
    )
    return res.status(200).json(properties)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
