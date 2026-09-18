<script setup lang="ts">
import type { OriginType } from '../../shared/types/content'

defineProps<{ origin: OriginType }>()
const { t } = useI18n()
</script>

<template>
  <span class="inline-flex rounded bg-museum-bg px-2 py-0.5 text-xs text-museum-muted ring-1 ring-museum-border">
    {{ t(`museum.origin.${origin}`) }}
  </span>
</template>
