import dayjs from 'dayjs'
import { idToUuid } from 'notion-utils'

import { config as BLOG } from '@/lib/server/config'
import api from '@/lib/server/notion-api'
import type { Post } from '@/types'

import filterPublishedPosts from './filterPublishedPosts'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts({ includePages = false }: { includePages: boolean }) {
  const id = idToUuid(process.env.NOTION_PAGE_ID)

  const response = await api.getPage(id)

  const collection = Object.values(response.collection)[0]?.value
  const collectionQuery = response.collection_query
  const block = response.block
  const schema = collection?.schema

  const rawMetadata = block[id].value
  const tagColorMap: Record<string, string> = {}
  const possibleTags = Object.values(schema ?? {}).filter(schema => schema.name === 'tags')[0]
    ?.options
  possibleTags?.forEach(tag => {
    tagColorMap[tag.value] = tag.color
  })

  // Check Type
  if (rawMetadata?.type !== 'collection_view_page' && rawMetadata?.type !== 'collection_view') {
    console.log(`pageId "${id}" is not a database`)
    return null
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery)
    const data: Post[] = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      const post = {
        ...properties,
        // Add fullwidth to properties
        fullWidth: block[id].value?.format?.page_full_width ?? false,
        // Convert date (with timezone) to unix milliseconds timestamp
        date: (properties.date?.start_date
          ? dayjs.tz(properties.date?.start_date)
          : dayjs(block[id].value?.created_time)
        ).valueOf(),
        tags:
          properties.tags?.map(tag => ({
            tag,
            color: tagColorMap[tag] || 'blue'
          })) ?? []
      }

      data.push(post)
    }

    // remove all the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includePages })

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => b.date - a.date)
    }
    return posts
  }
}
