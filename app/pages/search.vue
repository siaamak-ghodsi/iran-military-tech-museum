<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { t, fetchContent } = useMuseum()
const content = await fetchContent()

const q = ref(String(route.query.q || ''))
const results = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return []
  return content.systems.filter((system) => {
    const cat = content.categories.find((c) => c.id === system.categoryId)
    const haystack = [
      system.designation,
      system.names.en,
      system.names.fa,
      ...system.alternativeNames,
      cat?.names.en,
      cat?.names.fa,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
})

watch(q, (val) => {
  router.replace({ path: localePath('/search'), query: val ? { q: val } : {} })
})

useHead({ title: t('museum.nav.search') })
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-light">{{ t('museum.nav.search') }}</h1>
    <input
      v-model="q"
      type="search"
      class="max-w-xl rounded border border-museum-border bg-museum-card px-4 py-3 text-museum-text focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-accent"
      :placeholder="t('museum.search.placeholder')"
      autocomplete="off"
    />
    <div v-if="q && results.length" class="grid gap-4 sm:grid-cols-2">
      <SystemCard
        v-for="sys in results"
        :key="sys.id"
        :system="sys"
        :category="content.categories.find((c) => c.id === sys.categoryId)"
      />
    </div>
    <p v-else-if="q" class="text-sm text-museum-muted">{{ t('museum.search.noResults') }}</p>
  </div>
</template>
