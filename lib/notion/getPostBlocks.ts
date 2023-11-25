import api from '@/lib/server/notion-api'

export async function getPostBlocks(id: string) {
  return await api.getPage(id)
}
