import { Post } from '@/types'

export function getAllTagsFromPosts(posts: Post[]) {
  const taggedPosts = posts.filter(post => post?.tags)
  const tags = [
    ...taggedPosts
      .map(({ tags }) => tags)
      .filter((tags): tags is NonNullable<typeof tags> => Boolean(tags))
      .flat()
  ]
  const tagObj: Record<string, number> = {}
  tags.forEach(({ tag }) => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  return tagObj
}
