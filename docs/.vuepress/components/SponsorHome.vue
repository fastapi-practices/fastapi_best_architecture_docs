<template>
  <SponsorExclusivePopup v-if="isHomePage && isFullHero" />
  <a v-else-if="isHomePage" class="sponsor-home mode-inline" :href="targetHref"
    :target="isExternal ? '_blank' : '_self'" :title="hasBrand ? homeSponsor.alt : emptyTitle">
    <template v-if="hasBrand">
      <span class="sh-inline-label">{{ t('sponsorHome.exclusive') }}</span>
      <span class="sh-inline-body">
        <SponsorMedia :src="homeSponsor.link" :alt="homeSponsor.alt" :ink="homeSponsor.ink" fit="cover" />
      </span>
      <span class="sh-inline-label sh-inline-label-right">{{ t('sponsorHome.partner') }}</span>
    </template>
    <span v-else class="sh-inline-empty">
      <GradientText :text="emptyText" :colors="['#009485', '#c8abfa']" :animation-speed="3" />
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, withBase } from 'vuepress/client'
import { homeSponsor, shouldShowSponsor } from '../data/sponsors'
import { useI18n } from '../composables/useI18n'
import GradientText from './bits/GradientText.vue'
import SponsorExclusivePopup from './SponsorExclusivePopup.vue'
import SponsorMedia from './SponsorMedia.vue'

const route = useRoute()
const { t, withLocale } = useI18n()
const isHomePage = ref(false)
const isFullHero = ref(false)
let observer: MutationObserver | null = null
let raf = 0

const emptyTitle = computed(() => t('sponsorHome.emptyTitle'))
const emptyText = computed(() => t('sponsorHome.emptyText'))

const hasBrand = computed(() => shouldShowSponsor(homeSponsor))
const sponsorHref = computed(() => withBase(withLocale('/sponsors.html')))
const targetHref = computed(() => hasBrand.value
  ? homeSponsor.href || sponsorHref.value
  : sponsorHref.value)
const isExternal = computed(() => hasBrand.value && /^https?:/.test(targetHref.value))

const checkState = () => {
  if (typeof document === 'undefined') return
  const hero = document.querySelector('.vp-home-hero')
  isHomePage.value = !!hero
  isFullHero.value = !!hero?.classList.contains('full')
}

const scheduleCheck = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(checkState)
}

onMounted(() => {
  checkState()
  observer = new MutationObserver(scheduleCheck)
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  cancelAnimationFrame(raf)
})

watch(() => route.path, () => scheduleCheck())
</script>

<style scoped>
.sponsor-home {
  text-decoration: none !important;
  color: inherit;
}

/* ===== inline 横条（非 full 时） ===== */
.mode-inline {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px;
  gap: 24px;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.sh-inline-label {
  flex: 1;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: right;
  white-space: nowrap;
}

.sh-inline-label-right {
  text-align: left;
}

.sh-inline-body {
  flex-shrink: 0;
  width: 208px;
  aspect-ratio: 7 / 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.sh-inline-empty {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 16px;
}

@media (max-width: 768px) {
  .mode-inline {
    flex-direction: column;
    padding: 24px 16px;
    gap: 12px;
  }

  .sh-inline-label,
  .sh-inline-label-right {
    text-align: center;
  }

  .sh-inline-body {
    width: 168px;
  }
}

</style>
