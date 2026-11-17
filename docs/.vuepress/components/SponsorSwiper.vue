<template>
  <section class="sponsor-swiper">
    <header class="ss-header">
      <h2 class="ss-title">{{ t('sponsorUi.goldTitle') }}</h2>
    </header>
    <div v-if="goldSponsorsList.length > 0" class="ss-grid ss-gold">
      <div v-for="(item, index) in goldSponsorsList" :key="(item.link || item.alt || '') + index" class="ss-card">
        <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer" class="ss-card-link no-icon">
          <SponsorMedia :src="item.link" :alt="item.alt" :ink="item.ink" />
        </a>
        <SponsorMedia v-else :src="item.link" :alt="item.alt" :ink="item.ink" />
      </div>
    </div>
    <p v-else class="ss-empty">{{ t('sponsorUi.seatWaiting') }} <a :href="sponsorsHref">{{ t('sponsorUi.beFirst') }}</a>
    </p>

    <header class="ss-header">
      <h2 class="ss-title">{{ t('sponsorUi.silverTitle') }}</h2>
    </header>
    <ClientOnly v-if="silverMarquee">
      <Swiper class="vp-swiper swiper-no-swiping" :style="{ width: '100%', height: '168px' }" :modules="silverModules"
        :autoplay="{ delay: 0, disableOnInteraction: false }" :slides-per-view="4" :space-between="10" :loop="true"
        :speed="5000" @swiper="onSilverSwiper">
        <SwiperSlide v-for="(item, index) in generalSponsorsList" :key="(item.link || item.alt || '') + index">
          <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer"
            class="swiper-slide-link no-icon">
            <SponsorMedia :src="item.link" :alt="item.alt" :ink="item.ink" />
          </a>
          <SponsorMedia v-else :src="item.link" :alt="item.alt" :ink="item.ink" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
    <div v-else-if="generalSponsorsList.length > 0" class="ss-grid ss-silver">
      <div v-for="(item, index) in generalSponsorsList" :key="(item.link || item.alt || '') + index" class="ss-card">
        <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer" class="ss-card-link no-icon">
          <SponsorMedia :src="item.link" :alt="item.alt" :ink="item.ink" />
        </a>
        <SponsorMedia v-else :src="item.link" :alt="item.alt" :ink="item.ink" />
      </div>
    </div>
    <p v-else class="ss-empty">{{ t('sponsorUi.seatWaiting') }} <a :href="sponsorsHref">{{ t('sponsorUi.beFirst') }}</a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { useMutationObserver } from '@vueuse/core'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, onMounted } from 'vue'
import { withBase } from 'vuepress/client'
import { goldSponsors, generalSponsors, shouldShowSponsor } from '../data/sponsors'
import { useI18n } from '../composables/useI18n'
import SponsorMedia from './SponsorMedia.vue'

import 'swiper/css'

const { t, withLocale } = useI18n()
const sponsorsHref = computed(() => withBase(withLocale('/sponsors.html')))

const goldSponsorsList = computed(() => goldSponsors.filter(shouldShowSponsor))
const generalSponsorsList = computed(() => generalSponsors.filter(shouldShowSponsor))

// 银牌超过一屏（4 个）才滚动，否则用居中网格，避免出现空席位
const silverMarquee = computed(() => generalSponsorsList.value.length > 4)

const silverModules = [Autoplay]

let silverSwiper: SwiperType | undefined

function onSilverSwiper(swiper: SwiperType) {
  silverSwiper = swiper
}

onMounted(() => {
  useMutationObserver(() => document.documentElement, () => {
    if (!silverSwiper)
      return
    silverSwiper.wrapperEl.style.transform = 'translate3d(0px, 0px, 0px)'
    setTimeout(() => silverSwiper?.update(), 350)
  }, { attributeFilter: ['data-theme'] })
})
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

/* 展位网格：按实际数量居中排列，不再出现空席位 */
.ss-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 24px 0;
}

.ss-card {
  display: flex;
  overflow: hidden;
  border: 1px solid transparent;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.3s ease;
}

.ss-card:hover {
  border-color: var(--vp-c-brand-1);
}

.ss-card-link {
  display: flex;
  width: 100%;
  height: 100%;
}

/* 金牌 7:3，银牌 5:3，与展位素材比例保持一致 */
.ss-gold .ss-card {
  width: min(100%, 377px);
  aspect-ratio: 7 / 3;
}

.ss-silver .ss-card {
  width: min(100%, 280px);
  aspect-ratio: 5 / 3;
}

.sponsor-swiper :deep(.vp-swiper) {
  margin: 24px 0;
}

.sponsor-swiper :deep(.swiper) {
  --swiper-theme-color: var(--vp-c-bg);
}

.sponsor-swiper :deep(.swiper-slide) {
  display: flex;
  height: 100%;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.sponsor-swiper :deep(.swiper-slide-link) {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.sponsor-swiper :deep(.swiper-slide-link:hover) {
  border: 1px solid var(--vp-c-brand-1);
}

.sponsor-swiper :deep(.swiper-wrapper) {
  transition-timing-function: linear;
}
</style>
