<script setup lang="ts">
const localePath = useLocalePath()
const { t, fetchContent, localized } = useMuseum()
const content = await fetchContent()
const periods = [...content.periods].sort((a, b) => a.yearStart - b.yearStart)
useHead({ title: t('museum.nav.periods') })
</script>

<template>
  <div>
    <h1 class="mb-8 text-2xl font-light">{{ t('museum.nav.periods') }}</h1>
    <ul class="flex flex-col gap-6">
      <li v-for="p in periods" :key="p.id" class="museum-card p-6">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-lg">{{ localized(p.names) }}</h2>
          <span class="font-mono text-xs text-museum-gold">{{ p.yearStart }}–{{ p.yearEnd ?? '…' }}</span>
        </div>
        <p class="mt-2 text-sm text-museum-muted">{{ localized(p.description) }}</p>
        <NuxtLink
          :to="localePath(`/timeline?periodSlug=${p.slug}`)"
          class="museum-link mt-4 inline-block text-sm"
        >
          {{ t('museum.nav.timeline') }} →
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
