<script setup lang="ts">
const { t, fetchContent, systemsSorted } = useMuseum()
const content = await fetchContent()
const systems = systemsSorted(content.systems)
useHead({ title: t('museum.nav.explore') })
</script>

<template>
  <div>
    <h1 class="mb-8 text-2xl font-light">{{ t('museum.nav.explore') }}</h1>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <SystemCard
        v-for="sys in systems"
        :key="sys.id"
        :system="sys"
        :category="content.categories.find((c) => c.id === sys.categoryId)"
      />
    </div>
  </div>
</template>
