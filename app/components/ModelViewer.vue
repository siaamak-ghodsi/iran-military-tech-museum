<script setup lang="ts">
import type { Model3d } from '../../shared/types/content'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { shallowRef } from 'vue'
import SceneGltf from './SceneGltf.vue'

const props = defineProps<{
  model: Model3d
  fallbackLabel: string
}>()

const { t, localized } = useMuseum()
const container = shallowRef<HTMLElement | null>(null)
const canvasKey = ref(0)

const hasModel = computed(
  () => props.model.status !== 'none' && !!props.model.url,
)

async function toggleFullscreen() {
  const el = container.value
  if (!el) return
  if (!document.fullscreenElement) await el.requestFullscreen?.()
  else await document.exitFullscreen?.()
}

function resetView() {
  canvasKey.value += 1
}
</script>

<template>
  <div ref="container" class="museum-card overflow-hidden">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-museum-border px-4 py-2 text-xs text-museum-muted">
      <span>{{ t('museum.3d.provenance') }}: {{ t(`museum.provenance.${model.provenance}`) }}</span>
      <span>{{ localized(model.label) }}</span>
    </div>
    <div v-if="hasModel" class="relative h-[min(60vh,480px)] bg-[#050608]">
      <ClientOnly>
        <TresCanvas :key="canvasKey">
          <TresPerspectiveCamera :position="[5, 2, 8]" />
          <OrbitControls make-default />
          <TresAmbientLight :intensity="0.45" />
          <TresDirectionalLight :position="[6, 10, 4]" :intensity="1.1" />
          <Suspense>
            <SceneGltf :url="model.url!" />
          </Suspense>
        </TresCanvas>
      </ClientOnly>
      <div class="absolute bottom-3 end-3 flex gap-2">
        <button
          type="button"
          class="rounded border border-museum-border bg-museum-elevated px-3 py-1 text-xs hover:border-museum-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-accent"
          @click="resetView"
        >
          {{ t('museum.3d.reset') }}
        </button>
        <button
          type="button"
          class="rounded border border-museum-border bg-museum-elevated px-3 py-1 text-xs hover:border-museum-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-accent"
          @click="toggleFullscreen"
        >
          {{ t('museum.3d.fullscreen') }}
        </button>
      </div>
    </div>
    <div v-else class="flex h-64 flex-col items-center justify-center gap-2 p-6 text-center text-sm text-museum-muted">
      <p>{{ t('museum.3d.fallback') }}</p>
      <p>{{ fallbackLabel }}</p>
    </div>
    <p class="border-t border-museum-border px-4 py-2 text-xs text-museum-muted">{{ t('museum.3d.controls') }}</p>
  </div>
</template>
