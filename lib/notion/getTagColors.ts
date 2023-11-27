import type { CollectionPropertySchemaMap } from 'notion-types'

export const getTagColors = (schema: CollectionPropertySchemaMap) => {
  const tagColorMap: Record<string, string> = {}
  const possibleTags = Object.values(schema ?? {}).filter(schema => schema.name === 'tags')[0]
    ?.options
  possibleTags?.forEach(tag => {
    tagColorMap[tag.value] = tag.color
  })
  return tagColorMap
}
