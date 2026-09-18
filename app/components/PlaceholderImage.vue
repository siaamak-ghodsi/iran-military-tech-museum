<script setup lang="ts">
import type { System } from '../../shared/types/content'

defineProps<{ system: System }>()
const { localized } = useMuseum()
</script>

<template>
  <div
    class="relative flex aspect-[16/10] w-full flex-col items-center justify-center border border-dashed border-museum-border bg-museum-bg p-4 text-center"
    role="img"
    :aria-label="localized(system.names)"
  >
    <span class="font-mono text-2xl tracking-widest text-museum-accent/80">{{ system.designation }}</span>
    <span class="mt-2 text-xs text-museum-muted">{{ localized(system.names) }}</span>
    <span class="mt-1 text-[10px] uppercase tracking-widest text-museum-muted">Exhibit placeholder</span>
  </div>
</template>
