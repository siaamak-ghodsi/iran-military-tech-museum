import { searchSystems } from '../utils/contentStore'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = String(query.q ?? '')
  return searchSystems(q)
})
