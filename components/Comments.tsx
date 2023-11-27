import dynamic from 'next/dynamic'

import cn from 'classnames'
import { useTheme } from 'next-themes'

import ClientLoading from '@/components/ClientLoading'
import { useConfig } from '@/lib/config'
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
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const fullWidth = frontMatter.fullWidth ?? false

  return (
    <div
      className={cn(
        'my-5 px-4 font-medium text-gray-500 dark:text-gray-400',
        fullWidth ? 'md:px-24' : 'mx-auto max-w-2xl'
      )}
    >
      {BLOG.comment && <div className='notion-hr my-4' />}
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'giscus' && (
        <ClientLoading>
          <GiscusComponent
            theme={dark ? 'noborder_dark' : 'light'}
            {...BLOG.comment.giscusConfig}
          />
        </ClientLoading>
      )}
    </div>
  )
}

export default Comments
