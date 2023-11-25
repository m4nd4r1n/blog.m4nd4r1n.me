import type { Collection, ExtendedRecordMap } from 'notion-types'
import { getDateValue, getTextContent } from 'notion-utils'

import type { Properties } from '@/types'

type SelectKeys = 'type' | 'tags' | 'status'
type DateKey = 'date'

async function getPageProperties(
  id: string,
  block: ExtendedRecordMap['block'],
  schema: Collection['schema']
) {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || [])
  const excludeProperties = ['date', 'select', 'multi_select']
  const properties: Properties = {}
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name as Exclude<keyof Properties, SelectKeys>] = getTextContent(
        val as Parameters<typeof getTextContent>[0]
      )
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const tmpDateProperty: Partial<ReturnType<typeof getDateValue>> = getDateValue(
            val as Parameters<typeof getDateValue>[0]
          )
          if (tmpDateProperty) {
            delete tmpDateProperty.type
            properties[schema[key].name as DateKey] = tmpDateProperty
          }
          break
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(val as Parameters<typeof getTextContent>[0])
          if (selects[0]?.length) {
            properties[schema[key].name as SelectKeys] = selects.split(',')
          }
          break
        }
        default:
          break
      }
    }
  }
  return properties
}

export { getPageProperties as default }
