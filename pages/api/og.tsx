import type { PageConfig } from 'next'
import type { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'

import type { Properties } from '@/types'

export const config: PageConfig = {
  runtime: 'edge'
}

const HOST = `http://${process.env.HOSTNAME ?? 'localhost'}:3000`

const bold = fetch(new URL('../../public/fonts/Pretendard-Bold.woff', import.meta.url)).then(res =>
  res.arrayBuffer()
)

const OGImage = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const propertiesRes = await fetch(`${HOST}/api/properties?id=${id}`)
  if (!propertiesRes.ok) return new Response('Not found', { status: 404 })
  const [properties, font] = await Promise.all([propertiesRes.json() as Promise<Properties>, bold])

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Pretendard", sans-serif',
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: 'center',
          gap: '3rem'
        }}
      >
        <img
          style={{
            objectFit: 'cover',
            width: '64px',
            height: '64px'
          }}
          src={`${HOST}/favicon.png`}
          alt=''
        />
        <span
          style={{
            maxWidth: '600px',
            wordBreak: 'keep-all',
            backgroundImage: 'linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {properties.title}
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}

export default OGImage
