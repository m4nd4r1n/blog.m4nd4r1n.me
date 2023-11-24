import { useEffect, useRef, useState } from 'react'

import mermaid from 'mermaid'
import { getTextContent } from 'notion-utils'

import useTheme from '@/lib/theme'

export default function Mermaid({ block }) {
  const { dark } = useTheme()

  useEffect(() => {
    mermaid.initialize({ theme: dark ? 'dark' : 'neutral' })
  }, [dark])

  const source = getTextContent(block.properties.title)
  const container = useRef(null)
  const [svg, setSVG] = useState('')

  useEffect(() => {
    mermaid.render(`mermaid-${block.id}`, source, container.current).then(({ svg }) => setSVG(svg))
  }, [block, source])

  return (
    <div
      ref={container}
      className='flex w-full justify-center leading-normal'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
