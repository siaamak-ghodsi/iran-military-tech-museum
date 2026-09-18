import type { MuseumContent, System } from '../../shared/types/content'

export function useMuseum() {
  const { locale, t } = useI18n()
  const content = useState<MuseumContent | null>('museum-content', () => null)

  async function fetchContent() {
    if (content.value) return content.value
    content.value = await $fetch<MuseumContent>('/api/content')
    return content.value
  }

  function localized<T extends { en: string; fa?: string | null }>(obj: T): string {
    if (locale.value === 'fa') return obj.fa?.trim() || '—'
    return obj.en || '—'
  }

  function systemsSorted(list: System[]) {
    return [...list].sort((a, b) => a.designation.localeCompare(b.designation))
  }

  return { content, fetchContent, localized, systemsSorted, locale, t }
}
