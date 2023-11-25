import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Pagination from '@/components/Pagination'
import { useConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/notion'
import { clientConfig } from '@/lib/server/config'
import type { Post } from '@/types'

interface MainProps {
  postsToShow: Post[]
  page: number
  showNext: boolean
}

export const getStaticProps: GetStaticProps<MainProps> = async () => {
  const posts = await getAllPosts({ includePages: false })

  if (!posts) return { notFound: true }

  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  postsToShow,
  page,
  showNext
}: MainProps) => {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default Blog
