<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { t, fetchContent, localized } = useMuseum()
const content = await fetchContent()

const systemId = computed(() => String(route.query.system || 'f-14a-tomcat-iriaf'))
const system = computed(() => content.systems.find((s) => s.id === systemId.value))
const withModels = computed(() => content.systems.filter((s) => s.model3d.status !== 'none'))

useHead({ title: t('museum.3d.title') })
</script>

<template>
  <div class="flex flex-col gap-8">
    <header>
      <h1 class="text-2xl font-light">{{ t('museum.3d.title') }}</h1>
    </header>

    <label class="flex max-w-md flex-col gap-1 text-xs text-museum-muted">
      Exhibit
      <select
        class="rounded border border-museum-border bg-museum-card px-3 py-2 text-sm"
        :value="systemId"
        @change="router.push({ path: localePath('/collection-3d'), query: { system: ($event.target as HTMLSelectElement).value } })"
      >
        <option v-for="s in withModels" :key="s.id" :value="s.id">{{ s.designation }} — {{ localized(s.names) }}</option>
      </select>
    </label>

    <ModelViewer
      v-if="system"
      :model="system.model3d"
      :fallback-label="localized(system.names)"
    />

    <section>
      <h2 class="text-sm uppercase tracking-widest text-museum-muted">NO_MODEL fallbacks</h2>
      <ul class="mt-4 grid gap-3 sm:grid-cols-2">
        <li v-for="s in content.systems.filter((x) => x.model3d.status === 'none')" :key="s.id" class="museum-card p-3 text-sm">
          {{ s.designation }} — {{ localized(s.names) }}
        </li>
      </ul>
    </section>
  </div>
</template>
