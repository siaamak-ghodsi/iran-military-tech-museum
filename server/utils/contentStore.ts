import type { MuseumContent } from '../../shared/types/content'
import { LEGACY_SYSTEM_ID_REDIRECTS, loadMuseumFromResearchSeed } from './seedMapper'

let cache: MuseumContent | null = null

export function getMuseumContent(): MuseumContent {
  if (!cache) {
    cache = loadMuseumFromResearchSeed()
  }
  return cache
}

export function resolveSystemId(id: string): string {
  return LEGACY_SYSTEM_ID_REDIRECTS[id] ?? id
}

export function getSystemById(id: string) {
  const resolved = resolveSystemId(id)
  return getMuseumContent().systems.find((s) => s.id === resolved)
}

export function searchSystems(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const { systems: all, categories, periods } = getMuseumContent()
  return all.filter((system) => {
    const cat = categories.find((c) => c.id === system.categoryId)
    const periodLabels = system.historicalPeriodIds
      .map((pid) => periods.find((p) => p.id === pid))
      .filter(Boolean)
    const haystack = [
      system.id,
      system.designation,
      system.names.en,
      system.names.fa,
      ...system.alternativeNames,
      cat?.names.en,
      cat?.names.fa,
      ...periodLabels.map((p) => p!.names.en),
      ...periodLabels.map((p) => p!.names.fa),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

/** Hide pre-modern unless explicitly filtered on timeline. */
export function timelineSystems(options: {
  categorySlug?: string
  periodSlug?: string
}) {
  const { systems, categories, periods } = getMuseumContent()
  let list = [...systems]

  const showPreModern =
    options.periodSlug === 'pre-modern' ||
    options.periodSlug === 'pre-modern-era'

  if (!showPreModern) {
    list = list.filter((s) => s.categoryId !== 'cat-historical')
  }

  if (options.categorySlug) {
    const cat = categories.find((c) => c.slug === options.categorySlug)
    if (cat) list = list.filter((s) => s.categoryId === cat.id)
  }
  if (options.periodSlug) {
    const period = periods.find((p) => p.slug === options.periodSlug)
    if (period) {
      list = list.filter((s) => s.historicalPeriodIds.includes(period.id))
    }
  }

  return list.sort((a, b) =>
    (a.introductionPeriod ?? '').localeCompare(b.introductionPeriod ?? ''),
  )
}
