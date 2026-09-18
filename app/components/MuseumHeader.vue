<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const route = useRoute()

const nav = computed(() => [
  { to: localePath('/explore'), label: t('museum.nav.explore') },
  { to: localePath('/timeline'), label: t('museum.nav.timeline') },
  { to: localePath('/categories'), label: t('museum.nav.categories') },
  { to: localePath('/compare'), label: t('museum.nav.compare') },
  { to: localePath('/collection-3d'), label: t('museum.nav.collection3d') },
  { to: localePath('/periods'), label: t('museum.nav.periods') },
  { to: localePath('/sources'), label: t('museum.nav.sources') },
])

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <header class="border-b border-museum-border bg-museum-elevated/90 backdrop-blur sticky top-0 z-50">
    <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
      <NuxtLink :to="localePath('/')" class="group flex flex-col gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-accent">
        <span class="text-xs uppercase tracking-[0.2em] text-museum-muted">{{ t('museum.tagline') }}</span>
        <span class="font-display text-lg font-medium text-museum-text group-hover:text-museum-accent">{{ t('museum.title') }}</span>
      </NuxtLink>
      <nav class="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Main">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-museum-muted transition hover:text-museum-text focus:outline-none focus-visible:text-museum-accent"
          :class="{ 'text-museum-accent': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="flex items-center gap-3">
        <NuxtLink :to="localePath('/search')" class="text-sm text-museum-muted hover:text-museum-accent">
          {{ t('museum.nav.search') }}
        </NuxtLink>
        <div class="flex rounded border border-museum-border text-xs" role="group" aria-label="Language">
          <NuxtLink
            v-for="loc in locales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            class="px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-museum-accent"
            :class="locale === loc.code ? 'bg-museum-card text-museum-text' : 'text-museum-muted'"
            :hreflang="loc.code"
          >
            {{ loc.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
