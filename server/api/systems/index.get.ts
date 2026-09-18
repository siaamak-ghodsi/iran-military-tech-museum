import { getMuseumContent, timelineSystems } from '../../utils/contentStore'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { systems, categories, periods } = getMuseumContent()

  if (query.timeline === '1' || query.categorySlug || query.periodSlug) {
    return timelineSystems({
      categorySlug: query.categorySlug ? String(query.categorySlug) : undefined,
      periodSlug: query.periodSlug ? String(query.periodSlug) : undefined,
    })
  }

  let result = [...systems]
  if (query.categoryId) {
    result = result.filter((s) => s.categoryId === String(query.categoryId))
  }
  if (query.categorySlug) {
    const cat = categories.find((c) => c.slug === String(query.categorySlug))
    if (cat) result = result.filter((s) => s.categoryId === cat.id)
  }
  if (query.periodId) {
    result = result.filter((s) => s.historicalPeriodIds.includes(String(query.periodId)))
  }
  if (query.periodSlug) {
    const period = periods.find((p) => p.slug === String(query.periodSlug))
    if (period) {
      result = result.filter((s) => s.historicalPeriodIds.includes(period.id))
    }
  }

  return result
})
