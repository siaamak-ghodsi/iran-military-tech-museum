<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { t, fetchContent, localized } = useMuseum()

const content = await fetchContent()
const categorySlug = computed(() => String(route.query.categorySlug || ''))
const periodSlug = computed(() => String(route.query.periodSlug || ''))

const filtered = computed(() => {
  let list = [...content.systems]
  const showPreModern = periodSlug.value === 'pre-modern'
  if (!showPreModern) {
    list = list.filter((s) => s.categoryId !== 'cat-historical')
  }
  if (categorySlug.value) {
    const cat = content.categories.find((c) => c.slug === categorySlug.value)
    if (cat) list = list.filter((s) => s.categoryId === cat.id)
  }
  if (periodSlug.value) {
    const p = content.periods.find((x) => x.slug === periodSlug.value)
    if (p) list = list.filter((s) => s.historicalPeriodIds.includes(p.id))
  }
  return list.sort((a, b) => (a.introductionPeriod || '').localeCompare(b.introductionPeriod || ''))
})

function setFilter(key: 'categorySlug' | 'periodSlug', value: string) {
  router.push({
    path: localePath('/timeline'),
    query: { ...route.query, [key]: value || undefined },
  })
}

useHead({ title: t('museum.timeline.title') })
</script>

<template>
  <div class="flex flex-col gap-8">
    <header>
      <h1 class="text-2xl font-light">{{ t('museum.timeline.title') }}</h1>
      <p class="mt-2 text-sm text-museum-muted">{{ t('museum.timeline.scrollHint') }}</p>
    </header>

    <div class="flex flex-wrap gap-4">
      <label class="flex flex-col gap-1 text-xs text-museum-muted">
        {{ t('museum.timeline.filterPeriod') }}
        <select
          class="rounded border border-museum-border bg-museum-card px-3 py-2 text-sm text-museum-text"
          :value="periodSlug"
          @change="setFilter('periodSlug', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">{{ t('museum.timeline.all') }}</option>
          <option v-for="p in content.periods" :key="p.id" :value="p.slug">{{ localized(p.names) }}</option>
        </select>
      </label>
      <label class="flex flex-col gap-1 text-xs text-museum-muted">
        {{ t('museum.timeline.filterCategory') }}
        <select
          class="rounded border border-museum-border bg-museum-card px-3 py-2 text-sm text-museum-text"
          :value="categorySlug"
          @change="setFilter('categorySlug', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">{{ t('museum.timeline.all') }}</option>
          <option v-for="c in content.categories" :key="c.id" :value="c.slug">{{ localized(c.names) }}</option>
        </select>
      </label>
    </div>

    <div
      class="timeline-scroll flex gap-4 overflow-x-auto pb-4 focus-within:outline-none"
      tabindex="0"
      role="list"
      aria-label="Timeline systems"
    >
      <SystemCard
        v-for="sys in filtered"
        :key="sys.id"
        role="listitem"
        :system="sys"
        :category="content.categories.find((c) => c.id === sys.categoryId)"
      />
    </div>
    <p v-if="!filtered.length" class="text-sm text-museum-muted">{{ t('museum.search.noResults') }}</p>
  </div>
</template>
