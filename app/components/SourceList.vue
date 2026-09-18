<script setup lang="ts">
import type { Source } from '../../shared/types/content'

const props = defineProps<{ sources: Source[]; highlightId?: string }>()
const { localized, t } = useMuseum()
</script>

<template>
  <ul class="flex flex-col gap-4">
    <li
      v-for="src in sources"
      :id="src.id"
      :key="src.id"
      class="museum-card scroll-mt-24 p-4 transition"
      :class="{ 'ring-2 ring-museum-accent/60': highlightId === src.id }"
    >
      <div class="flex flex-wrap items-start justify-between gap-2">
        <h3 class="text-sm font-medium">
          <a :href="src.url" target="_blank" rel="noopener noreferrer" class="museum-link">{{ src.title }}</a>
        </h3>
        <ConfidenceBadge :level="src.confidence" />
      </div>
      <p class="mt-1 font-mono text-[10px] text-museum-muted">{{ src.id }}</p>
      <p class="mt-1 text-xs text-museum-muted">{{ src.authorOrOrg }}</p>
      <p class="mt-2 text-sm">{{ localized(src.relevantClaim) }}</p>
      <dl class="mt-2 grid gap-1 text-xs text-museum-muted sm:grid-cols-2">
        <div>
          <dt class="inline">{{ t('museum.sources.accessed') }}:</dt>
          <dd class="inline ms-1">{{ src.accessedAt }}</dd>
        </div>
        <div v-if="src.publishedAt">
          <dt class="inline">{{ t('museum.sources.published') }}:</dt>
          <dd class="inline ms-1">{{ src.publishedAt }}</dd>
        </div>
      </dl>
      <p v-if="src.conflictsWith.length" class="mt-2 text-xs" style="color: var(--museum-warn)">
        {{ t('museum.sources.conflicts') }}: {{ src.conflictsWith.join(', ') }}
      </p>
      <p v-if="src.notes" class="mt-2 text-xs text-museum-muted">{{ localized(src.notes) }}</p>
    </li>
  </ul>
</template>
