<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t, localized } = useMuseum()
const id = computed(() => String(route.params.id))

const { data, error } = await useAsyncData(`system-${id.value}`, () =>
  $fetch(`/api/systems/${id.value}`),
)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, message: 'System not found' })
}

const system = computed(() => data.value!.system)

if (data.value!.legacyId) {
  await navigateTo(localePath(`/systems/${system.value.id}`), { replace: true })
}

function relatedName(systemId: string) {
  const hit = data.value!.relatedSystems?.find((s) => s?.id === systemId)
  return hit ? localized(hit.names) : systemId
}

useHead({ title: localized(system.value.names) })
</script>

<template>
  <article v-if="system" class="flex flex-col gap-10">
    <header class="flex flex-col gap-4 border-b border-museum-border pb-8 md:flex-row md:items-start md:justify-between">
      <div>
        <p class="font-mono text-sm text-museum-gold">{{ system.designation }}</p>
        <h1 class="mt-2 text-3xl font-light">{{ localized(system.names) }}</h1>
        <div class="mt-4 flex flex-wrap gap-2">
          <ConfidenceBadge :level="system.confidence" />
          <OriginBadge :origin="system.originType" />
        </div>
      </div>
      <NuxtLink
        v-if="system.model3d.status !== 'none'"
        :to="localePath(`/collection-3d?system=${system.id}`)"
        class="rounded border border-museum-accent px-4 py-2 text-sm hover:bg-museum-accent/10"
      >
        {{ t('museum.system.view3d') }}
      </NuxtLink>
    </header>

    <div class="grid gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2 flex flex-col gap-8">
        <PlaceholderImage :system="system" />
        <section>
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.history') }}</h2>
          <p class="mt-3 leading-relaxed">{{ localized(system.description) }}</p>
          <p class="mt-4 leading-relaxed text-museum-muted">{{ localized(system.historicalContext) }}</p>
        </section>
        <section>
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.techSignificance') }}</h2>
          <p class="mt-3 leading-relaxed">{{ localized(system.technologicalSignificance) }}</p>
        </section>
        <section>
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.specs') }}</h2>
          <ul v-if="system.specifications.length" class="mt-4 flex flex-col gap-3">
            <li v-for="spec in system.specifications" :key="spec.id" class="museum-card p-4">
              <div class="flex flex-wrap justify-between gap-2">
                <span class="text-sm text-museum-muted">{{ localized(spec.label) }}</span>
                <ConfidenceBadge :level="spec.confidence" />
              </div>
              <p class="mt-1">{{ localized(spec.value) }}</p>
            </li>
          </ul>
          <p v-else class="mt-3 text-sm text-museum-muted">{{ t('museum.system.noSpecs') }}</p>
        </section>
        <section v-if="system.variants.length">
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.variants') }}</h2>
          <ul class="mt-4 flex flex-col gap-3">
            <li v-for="v in system.variants" :key="v.id" class="museum-card p-4">
              <span class="font-mono text-xs text-museum-gold">{{ v.designation }}</span>
              <p class="mt-2 text-sm">{{ localized(v.description) }}</p>
            </li>
          </ul>
        </section>
        <section v-if="system.notes">
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.curatorNotes') }}</h2>
          <p class="mt-3 text-sm text-museum-muted">{{ localized(system.notes) }}</p>
        </section>
        <section v-if="system.disputedClaims.length">
          <h2 class="text-sm uppercase tracking-widest" style="color: var(--museum-warn)">{{ t('museum.system.disputed') }}</h2>
          <ul class="mt-4 flex flex-col gap-3">
            <li v-for="d in system.disputedClaims" :key="d.id" class="border border-museum-warn/30 p-4">
              <p class="text-sm">{{ localized(d.claim) }}</p>
              <ConfidenceBadge class="mt-2" :level="d.confidence" />
            </li>
          </ul>
        </section>
      </div>
      <aside class="flex flex-col gap-8">
        <section class="museum-card p-4 text-sm">
          <dl class="flex flex-col gap-3">
            <div>
              <dt class="text-museum-muted">{{ t('museum.system.origin') }}</dt>
              <dd class="mt-1">{{ t(`museum.origin.${system.originType}`) }}</dd>
            </div>
            <div>
              <dt class="text-museum-muted">{{ t('museum.system.confidence') }}</dt>
              <dd class="mt-1"><ConfidenceBadge :level="system.confidence" /></dd>
            </div>
          </dl>
        </section>
        <section v-if="system.related.length">
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.related') }}</h2>
          <ul class="mt-3 flex flex-col gap-2">
            <li v-for="rel in system.related" :key="rel.systemId + rel.relationType">
              <NuxtLink :to="localePath(`/systems/${rel.systemId}`)" class="museum-link text-sm">
                {{ rel.relationType }} → {{ relatedName(rel.systemId) }}
              </NuxtLink>
            </li>
          </ul>
        </section>
        <section>
          <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.system.sources') }}</h2>
          <ul class="mt-4 flex flex-col gap-2 text-sm">
            <li v-for="src in data!.sources" :key="src.id">
              <NuxtLink :to="localePath(`/sources?id=${src.id}`)" class="museum-link">
                {{ src.id }}
              </NuxtLink>
              <span class="text-museum-muted"> — {{ src.title }}</span>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </article>
</template>
