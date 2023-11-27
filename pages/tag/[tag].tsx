import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import SearchLayout from '@/layouts/search'
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import type { Post } from '@/types'

const Tag: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  tags,
  posts,
  currentTag
}) => {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
}

export default Tag

interface TagProps {
  tags: Record<string, number>
  posts: Post[]
  currentTag: string
}

export const getStaticProps: GetStaticProps<TagProps, { tag: string }> = async ({ params }) => {
  const currentTag = params?.tag
  const posts = await getAllPosts({ includePages: false })
  if (!posts || !currentTag) return { notFound: true }
  const tags = getAllTagsFromPosts(posts)
  const filteredPosts = posts.filter(
    post => post && post.tags && post.tags.some(({ tag }) => tag === currentTag)
  )
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({ includePages: false })
  if (!posts) return { paths: [], fallback: true }
  const tags = getAllTagsFromPosts(posts)
  return {
    paths: Object.keys(tags).map(tag => ({ params: { tag } })),
    fallback: true
  }
}
