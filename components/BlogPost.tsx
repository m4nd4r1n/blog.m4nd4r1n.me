import Link from 'next/link'

import FormattedDate from '@/components/FormattedDate'
import TagItem from '@/components/TagItem'
import { useConfig } from '@/lib/config'
import type { Post } from '@/types'

interface BlogPostProps {
  post: Post
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const BLOG = useConfig()

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className='mb-6 md:mb-8'>
        <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
          <h2 className='mb-2 cursor-pointer text-lg font-medium text-black dark:text-gray-100 md:text-xl'>
            {post.title}
          </h2>
          <time className='flex-shrink-0 text-gray-600 dark:text-gray-400'>
            <FormattedDate date={post.date} />
          </time>
        </header>
        <main>
          <p className='leading-8 text-gray-700 dark:text-gray-300'>{post.summary}</p>
          {post.tags && (
            <div
              className='tag-color flex flex-row flex-wrap'
              style={{
                paddingTop: '.5em',
                rowGap: '.7em',
                columnGap: '.3em'
              }}
            >
              {post.tags.map((tag, i) => (
                <TagItem key={`${post.id}-${i}`} {...tag} isLink={false} />
              ))}
            </div>
          )}
        </main>
      </article>
    </Link>
  )
}

export default BlogPost
