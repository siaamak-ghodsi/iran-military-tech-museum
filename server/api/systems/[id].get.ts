import { getMuseumContent, getSystemById, resolveSystemId } from '../../utils/contentStore'

export default defineEventHandler((event) => {
  const rawId = getRouterParam(event, 'id')
  if (!rawId) throw createError({ statusCode: 400, message: 'Missing id' })

  const id = resolveSystemId(rawId)
  const system = getSystemById(id)
  if (!system) throw createError({ statusCode: 404, message: 'System not found' })

  const { sources, categories, periods, systems } = getMuseumContent()
  const relatedSystems = [
    ...system.related.map((r) => systems.find((s) => s.id === r.systemId)),
    ...system.predecessorIds.map((pid) => systems.find((s) => s.id === pid)),
    ...system.successorIds.map((sid) => systems.find((s) => s.id === sid)),
  ].filter(Boolean)

  return {
    system,
    legacyId: rawId !== id ? rawId : undefined,
    sources: sources.filter((s) => system.referenceIds.includes(s.id)),
    category: categories.find((c) => c.id === system.categoryId),
    periods: periods.filter((p) => system.historicalPeriodIds.includes(p.id)),
    relatedSystems: [...new Map(relatedSystems.map((s) => [s!.id, s])).values()],
  }
})
