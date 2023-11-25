import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import SearchLayout from '@/layouts/search'
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import type { Post } from '@/types'

const search: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ tags, posts }) => {
  return <SearchLayout tags={tags} posts={posts} />
}

export default search

interface SearchProps {
  tags: Record<string, number>
  posts: Post[]
}

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const posts = await getAllPosts({ includePages: false })
  if (!posts) return { notFound: true }
  const tags = getAllTagsFromPosts(posts)
  return {
    props: {
      tags,
      posts
    },
    revalidate: 1
  }
}
