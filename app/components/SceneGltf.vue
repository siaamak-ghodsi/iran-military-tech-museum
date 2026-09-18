<script setup lang="ts">
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const props = defineProps<{ url: string }>()

const { scene } = await useLoader(GLTFLoader, props.url)
scene.scale.set(1.2, 1.2, 1.2)
scene.position.set(0, -0.5, 0)
</script>

<template>
  <primitive :object="scene" />
</template>
