<script setup lang="ts">
import type { ConfidenceLevel } from '../../shared/types/content'

defineProps<{ level: ConfidenceLevel }>()
const { t } = useI18n()
</script>

<template>
  <span
    class="inline-flex items-center rounded border px-2 py-0.5 text-xs uppercase tracking-wide"
    :class="`confidence-${level}`"
    :style="{ borderColor: 'var(--badge)', color: 'var(--badge)' }"
  >
    {{ t(`museum.confidence.${level}`) }}
  </span>
</template>
