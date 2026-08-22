<template>
  <span
    class="sponsor-media"
    :class="{
      'is-cover': fit === 'cover',
      'is-ink-white': ink === 'white',
      'is-ink-black': ink === 'black',
      'is-fallback': showFallback,
    }"
  >
    <img
      v-if="hasSrc && !failed"
      :src="src"
      :alt="label"
      :loading="loading"
      decoding="async"
      @error="failed = true"
    >
    <span v-if="showFallback" class="sponsor-media__name">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  ink?: 'white' | 'black'
  fit?: 'contain' | 'cover'
  loading?: 'lazy' | 'eager'
}>(), {
  fit: 'contain',
  loading: 'lazy',
})

const failed = ref(false)
const label = computed(() => props.alt?.trim() || '')
const hasSrc = computed(() => Boolean(props.src))
const showFallback = computed(() => !hasSrc.value || failed.value)

watch(() => props.src, () => {
  failed.value = false
})
</script>
