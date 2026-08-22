<template>
  <section class="sponsor-swiper">
    <header class="ss-header">
      <h2 class="ss-title">{{ t('sponsorUi.goldTitle') }}</h2>
    </header>
    <ClientOnly v-if="goldSponsorsList.length > 0">
      <Swiper class="vp-swiper" :style="{ width: '100%', height: '162px' }" :modules="goldModules" :slides-per-view="3"
        :space-between="10" :loop="false" :navigation="true" :pagination="{ dynamicBullets: true, clickable: true }"
        :mousewheel="true" :speed="300">
        <SwiperSlide v-for="(item, index) in goldSponsorsList" :key="(item.link || item.alt || '') + index">
          <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer"
            class="swiper-slide-link no-icon">
            <SponsorMedia :src="item.link" :alt="item.alt" :ink="item.ink" fit="cover" />
          </a>
          <SponsorMedia v-else :src="item.link" :alt="item.alt" :ink="item.ink" fit="cover" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
    <p v-else class="ss-empty">{{ t('sponsorUi.seatWaiting') }} <a :href="sponsorsHref">{{ t('sponsorUi.beFirst') }}</a>
    </p>

    <header class="ss-header">
      <h2 class="ss-title">{{ t('sponsorUi.silverTitle') }}</h2>
    </header>
    <ClientOnly v-if="generalSponsorsList.length > 0">
      <Swiper class="vp-swiper swiper-no-swiping" :style="{ width: '100%', height: '168px' }" :modules="silverModules"
        :autoplay="{ delay: 0, disableOnInteraction: false }" :slides-per-view="4" :space-between="10"
        :loop="generalSponsorsList.length > 4" :speed="5000" @swiper="onSilverSwiper">
        <SwiperSlide v-for="(item, index) in generalSponsorsList" :key="(item.link || item.alt || '') + index">
          <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer"
            class="swiper-slide-link no-icon">
            <SponsorMedia :src="item.link" :alt="item.alt" :ink="item.ink" />
          </a>
          <SponsorMedia v-else :src="item.link" :alt="item.alt" :ink="item.ink" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
    <p v-else class="ss-empty">{{ t('sponsorUi.seatWaiting') }} <a :href="sponsorsHref">{{ t('sponsorUi.beFirst') }}</a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { useMutationObserver } from '@vueuse/core'
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, onMounted } from 'vue'
import { withBase } from 'vuepress/client'
import { goldSponsors, generalSponsors, shouldShowSponsor } from '../data/sponsors'
import { useI18n } from '../composables/useI18n'
import SponsorMedia from './SponsorMedia.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t, withLocale } = useI18n()
const sponsorsHref = computed(() => withBase(withLocale('/sponsors.html')))

const goldSponsorsList = computed(() => goldSponsors.filter(shouldShowSponsor))
const generalSponsorsList = computed(() => generalSponsors.filter(shouldShowSponsor))

const goldModules = [Navigation, Pagination, Mousewheel]
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

.sponsor-swiper :deep(.vp-swiper) {
  margin: 24px 0;
}

.sponsor-swiper :deep(.swiper) {
  --swiper-theme-color: var(--vp-c-bg);
  --swiper-pagination-bullet-inactive-color: var(--vp-c-bg);
  --swiper-pagination-bullet-inactive-opacity: 0.4;
}

.sponsor-swiper :deep(.swiper-slide) {
  display: flex;
  height: 100%;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.sponsor-swiper :deep(.swiper-slide-link) {
  display: flex;
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
