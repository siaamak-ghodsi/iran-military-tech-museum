<script setup lang="ts">
const localePath = useLocalePath()
const { t, fetchContent, localized } = useMuseum()
const content = await fetchContent()
const cats = [...content.categories].sort((a, b) => a.sortOrder - b.sortOrder)
useHead({ title: t('museum.nav.categories') })
</script>

<template>
  <div>
    <h1 class="mb-8 text-2xl font-light">{{ t('museum.nav.categories') }}</h1>
    <ul class="grid gap-4 md:grid-cols-2">
      <li v-for="cat in cats" :key="cat.id">
        <NuxtLink
          :to="localePath(`/categories/${cat.slug}`)"
          class="museum-card block p-6 hover:border-museum-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-accent"
        >
          <h2 class="text-lg">{{ localized(cat.names) }}</h2>
          <p class="mt-2 text-sm text-museum-muted">{{ localized(cat.description) }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
