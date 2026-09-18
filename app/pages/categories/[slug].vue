<script setup lang="ts">
const route = useRoute()
const { t, fetchContent, localized } = useMuseum()
const content = await fetchContent()
const slug = computed(() => String(route.params.slug))
const category = computed(() => content.categories.find((c) => c.slug === slug.value))
const systems = computed(() =>
  content.systems.filter((s) => s.categoryId === category.value?.id),
)

if (!category.value) {
  throw createError({ statusCode: 404, message: 'Category not found' })
}

useHead({ title: localized(category.value.names) })
</script>

<template>
  <div>
    <h1 class="text-2xl font-light">{{ localized(category!.names) }}</h1>
    <p class="mt-2 max-w-2xl text-museum-muted">{{ localized(category!.description) }}</p>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <SystemCard v-for="sys in systems" :key="sys.id" :system="sys" :category="category!" />
    </div>
  </div>
</template>
