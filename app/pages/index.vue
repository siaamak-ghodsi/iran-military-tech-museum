<script setup lang="ts">
const { t, fetchContent, localized, systemsSorted } = useMuseum()
const localePath = useLocalePath()
const content = await fetchContent()
const featured = systemsSorted(content.systems).filter((s) =>
  ['f-14a-tomcat-iriaf', 'bavar-373', 'mohajer-4'].includes(s.id),
)
const categories = content.categories.sort((a, b) => a.sortOrder - b.sortOrder)

useHead({ title: t('museum.title') })
</script>

<template>
  <div class="flex flex-col gap-16">
    <section class="relative overflow-hidden rounded-lg border border-museum-border bg-museum-elevated px-6 py-16 md:px-12">
      <div class="relative z-10 max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-museum-gold">{{ t('museum.tagline') }}</p>
        <h1 class="mt-4 font-display text-3xl font-light leading-tight md:text-5xl">{{ t('museum.subtitle') }}</h1>
        <p class="mt-6 text-museum-muted">{{ t('museum.disclaimer') }}</p>
        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink
            :to="localePath('/timeline')"
            class="inline-flex items-center rounded border border-museum-accent bg-museum-accent/10 px-5 py-2.5 text-sm text-museum-text hover:bg-museum-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-accent"
          >
            {{ t('museum.home.heroCta') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/timeline?periodSlug=1970s&categorySlug=aircraft')"
            class="inline-flex items-center rounded border border-museum-border px-5 py-2.5 text-sm text-museum-muted hover:border-museum-accent hover:text-museum-text"
          >
            {{ t('museum.nav.timeline') }} · 1970s · Aircraft
          </NuxtLink>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-museum-accent/5 via-transparent to-transparent" />
    </section>

    <section>
      <h2 class="mb-6 text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.home.featured') }}</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <SystemCard
          v-for="sys in featured"
          :key="sys.id"
          :system="sys"
          :category="categories.find((c) => c.id === sys.categoryId)"
        />
      </div>
    </section>

    <section class="museum-card p-6">
      <h2 class="text-sm uppercase tracking-widest text-museum-muted">{{ t('museum.home.journey') }}</h2>
      <p class="mt-2 text-sm text-museum-text">{{ t('museum.home.journeySteps') }}</p>
      <NuxtLink :to="localePath('/systems/f-14a-tomcat-iriaf')" class="museum-link mt-4 inline-block text-sm">
            F-14A →
      </NuxtLink>
    </section>
  </div>
</template>
