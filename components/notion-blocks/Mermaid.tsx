import { useEffect, useRef, useState } from 'react'

import mermaid from 'mermaid'
import { useTheme } from 'next-themes'
import type { CodeBlock } from 'notion-types'
import { getTextContent } from 'notion-utils'

interface MermaidProps {
  block: CodeBlock
}

export default function Mermaid({ block }: MermaidProps) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  useEffect(() => {
    mermaid.initialize({ theme: dark ? 'dark' : 'neutral' })
  }, [dark])

  const source = getTextContent(block.properties.title)
  const container = useRef<HTMLDivElement>(null)
  const [svg, setSVG] = useState('')

  useEffect(() => {
    mermaid
      .render(`mermaid-${block.id}`, source, container.current ?? undefined)
      .then(({ svg }) => setSVG(svg))
  }, [block, source])

  return (
    <div
      ref={container}
      className='flex w-full justify-center leading-normal'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
