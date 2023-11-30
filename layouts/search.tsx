import { useState } from 'react'

import PropTypes from 'prop-types'

import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Tags from '@/components/Tags'
import type { Post } from '@/types'

interface SearchLayoutProps {
  tags: Record<string, number>
  posts: Post[]
  currentTag?: string
}

const SearchLayout: React.FC<SearchLayoutProps> = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState('')
  let filteredBlogPosts: Post[] = []
  if (posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = `${post.title ?? ''}${post.summary ?? ''}${tagContent}`
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  return (
    <Container
      title={currentTag ?? 'Search'}
      isTagPage={!!currentTag}
      slug={currentTag ?? 'search'}
    >
      <div className='relative'>
        <input
          type='text'
          placeholder={currentTag ? `Search in #${currentTag}` : 'Search Articles'}
          className='block w-full border border-black bg-white px-4 py-2 text-black dark:border-white dark:bg-night dark:text-white'
          onChange={e => setSearchValue(e.target.value)}
        />
        <svg
          className='absolute right-3 top-3 h-5 w-5 text-black dark:text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </div>
      <Tags tags={tags} currentTag={currentTag} />
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && (
          <p className='text-gray-500 dark:text-gray-300'>No posts found.</p>
        )}
        {filteredBlogPosts.slice(0, 20).map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  )
}
SearchLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.objectOf<number>(PropTypes.any).isRequired,
  currentTag: PropTypes.string
}
export default SearchLayout
