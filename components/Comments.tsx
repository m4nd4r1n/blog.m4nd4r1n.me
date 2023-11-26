import dynamic from 'next/dynamic'

import cn from 'classnames'

import { useConfig } from '@/lib/config'
import useTheme from '@/lib/theme'
import type { Post } from '@/types'

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Utterances')
  },
  { ssr: false }
)
const GiscusComponent = dynamic(
  () => {
    return import('@giscus/react')
  },
  { ssr: false }
)

interface CommentsProps {
  frontMatter: Post
}

const Comments: React.FC<CommentsProps> = ({ frontMatter }) => {
  const BLOG = useConfig()
  const { dark } = useTheme()

  const fullWidth = frontMatter.fullWidth ?? false

  return (
    <div
      className={cn(
        'my-5 px-4 font-medium text-gray-500 dark:text-gray-400',
        fullWidth ? 'md:px-24' : 'mx-auto max-w-2xl'
      )}
    >
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'giscus' && (
        <GiscusComponent theme={dark ? 'dark_dimmed' : 'light'} {...BLOG.comment.giscusConfig} />
      )}
    </div>
  )
}

export default Comments
