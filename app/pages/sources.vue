<script setup lang="ts">
const route = useRoute()
const { t, fetchContent } = useMuseum()
const content = await fetchContent()
const highlightId = computed(() => String(route.query.id || ''))

useHead({ title: t('museum.sources.title') })

onMounted(() => {
  if (highlightId.value) {
    const el = document.getElementById(highlightId.value)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>

<template>
  <div>
    <h1 class="mb-2 text-2xl font-light">{{ t('museum.sources.title') }}</h1>
    <p class="mb-8 text-sm text-museum-muted">{{ content.sources.length }} records — linked from system exhibits by source id.</p>
    <SourceList :sources="content.sources" :highlight-id="highlightId || undefined" />
  </div>
</template>
