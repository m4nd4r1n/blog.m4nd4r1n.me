import type { NextApiHandler } from 'next'

import { clientConfig } from '@/lib/server/config'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(clientConfig)
  } else {
    res.status(204).end()
  }
}

export default handler
