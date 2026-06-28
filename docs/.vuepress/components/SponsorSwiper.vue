<template>
  <section class="sponsor-swiper">
    <header class="ss-header">
      <h2 class="ss-title">金牌赞助商</h2>
    </header>
    <Swiper v-if="processedGoldSponsors.length > 0" :items="processedGoldSponsors" mode="broadcast" :loop="false"
      :height="162" :slides-per-view="3" :space-between="10" mousewheel />
    <p v-else class="ss-empty">席位虚位以待 · <a :href="withBase('/sponsors.html')">来当首位赞助商</a></p>

    <header class="ss-header">
      <h2 class="ss-title">银牌赞助商</h2>
    </header>
    <Swiper v-if="processedGeneralSponsors.length > 0" :items="processedGeneralSponsors" mode="carousel" :height="168"
      :slides-per-view="4" :space-between="10" :speed="5000" />
    <p v-else class="ss-empty">席位虚位以待 · <a :href="withBase('/sponsors.html')">来当首位赞助商</a></p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vuepress/client'
// @ts-ignore
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import { goldSponsors, generalSponsors, shouldShowSponsor } from '../data/sponsors'

const processedGoldSponsors = computed(() =>
  goldSponsors.filter(sponsor => shouldShowSponsor(sponsor) && sponsor.link)
)

const processedGeneralSponsors = computed(() =>
  generalSponsors.filter(sponsor => shouldShowSponsor(sponsor) && sponsor.link)
)
</script>

<style scoped>
.sponsor-swiper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px;
}

.ss-header {
  text-align: center;
  margin: 28px 0 18px;
}

.ss-header:first-child {
  margin-top: 0;
}

.ss-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.01em;
}

.ss-empty {
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0;
  padding: 22px 0;
}

.ss-empty a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.ss-empty a:hover {
  text-decoration: underline;
}

.sponsor-swiper :deep(.swiper-slide-link) {
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.sponsor-swiper :deep(.swiper-slide-link:hover) {
  border: 1px solid var(--vp-c-brand-1);
}

.sponsor-swiper :deep(.swiper-slide) {
  background-color: var(--vp-c-bg-soft);
}

.sponsor-swiper :deep(.swiper-slide-img) {
  object-fit: contain !important
}
</style>
