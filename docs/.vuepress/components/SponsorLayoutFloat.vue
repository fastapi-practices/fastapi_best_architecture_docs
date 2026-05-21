<template>
  <SponsorExclusivePopup v-if="showSponsorPopup" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import SponsorExclusivePopup from './SponsorExclusivePopup.vue'

interface SponsorFloatFrontmatter {
  pageLayout?: string
}

const frontmatter = usePageFrontmatter<SponsorFloatFrontmatter>()
const showSponsorPopup = computed(() => {
  const pageLayout = frontmatter.value.pageLayout
  return pageLayout === 'friends' || pageLayout === 'page'
})
</script>
