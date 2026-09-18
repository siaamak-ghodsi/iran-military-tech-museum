<script setup lang="ts">
import type { System, Category } from '../../shared/types/content'

const props = defineProps<{
  system: System
  category?: Category
}>()

const { localized } = useMuseum()
const localePath = useLocalePath()
</script>

<template>
  <article class="museum-card flex min-w-[260px] max-w-xs flex-col gap-3 p-4 transition hover:border-museum-accent/40 focus-within:ring-2 focus-within:ring-museum-accent">
    <PlaceholderImage :system="system" />
    <div class="flex flex-wrap items-center gap-2">
      <span class="font-mono text-xs text-museum-gold">{{ system.designation }}</span>
      <ConfidenceBadge :level="system.confidence" />
    </div>
    <h3 class="text-base font-medium leading-snug">
      <NuxtLink :to="localePath(`/systems/${system.id}`)" class="hover:text-museum-accent focus:outline-none focus-visible:underline">
        {{ localized(system.names) }}
      </NuxtLink>
    </h3>
    <p v-if="category" class="text-xs text-museum-muted">{{ localized(category.names) }}</p>
    <OriginBadge :origin="system.originType" />
    <p class="line-clamp-3 text-sm text-museum-muted">{{ localized(system.description) }}</p>
  </article>
</template>
