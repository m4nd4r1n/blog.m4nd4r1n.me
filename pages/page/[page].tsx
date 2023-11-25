import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import { config } from '@/lib/server/config'
import type { Post } from '@/types'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  postsToShow,
  page,
  showNext
}) => {
  return (
    <Container>
      {postsToShow && postsToShow.map(post => <BlogPost key={post.id} post={post} />)}
      <Pagination page={page} showNext={showNext} />
    </Container>
  )
}

interface PageProps {
  postsToShow: Post[]
  page: number
  showNext: boolean
}

export const getStaticProps: GetStaticProps<PageProps, { page: string }> = async ({ params }) => {
  const page = Number(params?.page ?? 0) // Get Current Page No.
  const posts = await getAllPosts({ includePages: false })
  if (!posts) return { notFound: true }
  const postsToShow = posts.slice(config.postsPerPage * (page - 1), config.postsPerPage * page)
  const totalPosts = posts.length
  const showNext = page * config.postsPerPage < totalPosts
  return {
    props: {
      page, // Current Page
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({ includePages: false })
  if (!posts) return { paths: [], fallback: true }
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / config.postsPerPage)
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) }
    })),
    fallback: true
  }
}

export default Page
