import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'

import cn from 'classnames'
import { createHash } from 'crypto'
import type { ExtendedRecordMap } from 'notion-types'

import Comments from '@/components/Comments'
import Container from '@/components/Container'
import HitCounter from '@/components/HitCounter'
import Post from '@/components/Post'
import { useConfig } from '@/lib/config'
import { useLocale } from '@/lib/locale'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { clientConfig } from '@/lib/server/config'
import type { Post as PostType } from '@/types'

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  blockMap,
  emailHash
}) => {
  const router = useRouter()
  const BLOG = useConfig()
  const locale = useLocale()

  // TODO: It would be better to render something
  if (router.isFallback) return null

  const fullWidth = post.fullWidth ?? false

  return (
    <Container
      layout='blog'
      title={post.title}
      description={post.summary}
      slug={post.slug}
      date={new Date(post.date).toISOString()}
      type='article'
      fullWidth={fullWidth}
      postId={post.id}
    >
      <Post post={post} blockMap={blockMap} emailHash={emailHash} fullWidth={fullWidth} />

      {/* Back and Top */}
      <div
        className={cn(
          'my-5 flex justify-between px-4 font-medium text-gray-500 dark:text-gray-400',
          fullWidth ? 'md:px-24' : 'mx-auto max-w-2xl'
        )}
      >
        <a>
          <button
            onClick={() => router.push(BLOG.path || '/')}
            className='mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100'
          >
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
            className='mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100'
          >
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>

      {post.type?.[0] !== 'Page' && (
        <>
          <Comments frontMatter={post} />

          <div className={cn('px-4', fullWidth ? 'md:px-24' : 'mx-auto max-w-2xl')}>
            <HitCounter
              targetUrl={`${BLOG.link}/${post.slug}`}
              title='view'
              titleBgColor='#F9B034'
              countBgColor='#F69335'
            />
          </div>
        </>
      )}
    </Container>
  )
}

export default BlogPost

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({ includePages: true })
  if (!posts) return { paths: [], fallback: true }
  return {
    paths: posts.map(row => `${clientConfig.path}/${row.slug}`),
    fallback: true
  }
}

interface BlogPostProps {
  post: PostType
  blockMap: ExtendedRecordMap
  emailHash: string
}

export const getStaticProps: GetStaticProps<BlogPostProps, { slug: string }> = async ({
  params
}) => {
  const posts = await getAllPosts({ includePages: true })
  if (!posts) return { notFound: true }
  const post = posts.find(t => t.slug === params?.slug)
  if (!post || !post.id) return { notFound: true }

  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5').update(clientConfig.email).digest('hex').trim().toLowerCase()

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}
