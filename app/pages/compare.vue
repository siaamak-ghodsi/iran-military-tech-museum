<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { t, fetchContent, localized } = useMuseum()
const content = await fetchContent()

const idA = computed(() => String(route.query.a || ''))
const idB = computed(() => String(route.query.b || ''))

const systemA = computed(() => content.systems.find((s) => s.id === idA.value))
const systemB = computed(() => content.systems.find((s) => s.id === idB.value))

function update(key: 'a' | 'b', value: string) {
  router.push({ path: localePath('/compare'), query: { ...route.query, [key]: value || undefined } })
}

const rows = computed(() => {
  if (!systemA.value || !systemB.value) return []
  return [
    { label: t('museum.system.origin'), a: t(`museum.origin.${systemA.value.originType}`), b: t(`museum.origin.${systemB.value.originType}`) },
    { label: t('museum.system.confidence'), a: t(`museum.confidence.${systemA.value.confidence}`), b: t(`museum.confidence.${systemB.value.confidence}`) },
    { label: 'Designation', a: systemA.value.designation, b: systemB.value.designation },
    { label: t('museum.system.history'), a: localized(systemA.value.description), b: localized(systemB.value.description) },
    {
      label: t('museum.system.techSignificance'),
      a: localized(systemA.value.technologicalSignificance),
      b: localized(systemB.value.technologicalSignificance),
    },
    {
      label: 'Introduction (as cited)',
      a: systemA.value.introductionPeriod || '—',
      b: systemB.value.introductionPeriod || '—',
    },
  ]
})

useHead({ title: t('museum.compare.title') })
</script>

<template>
  <div class="flex flex-col gap-8">
    <header>
      <h1 class="text-2xl font-light">{{ t('museum.compare.title') }}</h1>
      <p class="mt-2 text-sm text-museum-muted">{{ t('museum.compare.noRanking') }}</p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <label v-for="side in (['a', 'b'] as const)" :key="side" class="flex flex-col gap-1 text-xs text-museum-muted">
        {{ t('museum.compare.select') }} ({{ side.toUpperCase() }})
        <select
          class="rounded border border-museum-border bg-museum-card px-3 py-2 text-sm"
          :value="side === 'a' ? idA : idB"
          @change="update(side, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">—</option>
          <option v-for="s in content.systems" :key="s.id" :value="s.id">{{ s.designation }} — {{ localized(s.names) }}</option>
        </select>
      </label>
    </div>

    <div v-if="systemA && systemB" class="overflow-x-auto">
      <table class="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr class="border-b border-museum-border text-start">
            <th class="p-3 text-museum-muted">{{ t('museum.compare.characteristic') }}</th>
            <th class="p-3">{{ localized(systemA.names) }}</th>
            <th class="p-3">{{ localized(systemB.names) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i" class="border-b border-museum-border/60 align-top">
            <th scope="row" class="p-3 text-museum-muted">{{ row.label }}</th>
            <td class="p-3">{{ row.a }}</td>
            <td class="p-3">{{ row.b }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-sm text-museum-muted">{{ t('museum.compare.select') }}</p>
  </div>
</template>
