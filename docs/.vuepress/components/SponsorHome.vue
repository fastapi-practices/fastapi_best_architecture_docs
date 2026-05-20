<template>
  <a v-if="isHomePage" :class="['sponsor-home', isFullHero ? 'mode-popup' : 'mode-inline']" :href="targetHref"
    :target="isExternal ? '_blank' : '_self'" :title="hasBrand ? homeSponsor.alt : '独家赞助商席位 - 立即咨询'">
    <template v-if="isFullHero">
      <span class="sh-pop-label">
        <span class="sh-dot"></span>
        {{ hasBrand ? '独家赞助商' : '独家赞助商席位现已空缺' }}
      </span>

      <span class="sh-pop-body">
        <img v-if="hasBrand" :src="homeSponsor.link" :alt="homeSponsor.alt" class="sh-pop-img" />
        <span v-else class="sh-pop-cta">
          <GradientText text="立即咨询 ->" :colors="['#009485', '#c8abfa']" :animation-speed="3" />
        </span>
      </span>

      <span class="sh-pop-footer">fba 官方合作伙伴</span>
    </template>

    <template v-else>
      <template v-if="hasBrand">
        <span class="sh-inline-label">独家赞助商</span>
        <span class="sh-inline-body">
          <img :src="homeSponsor.link" :alt="homeSponsor.alt" class="sh-inline-img" />
        </span>
        <span class="sh-inline-label sh-inline-label-right">fba 官方合作伙伴</span>
      </template>
      <span v-else class="sh-inline-empty">
        <GradientText text="独家赞助商席位现已空缺 - 立即咨询" :colors="['#009485', '#c8abfa']" :animation-speed="3" />
      </span>
    </template>
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'
import { homeSponsor, shouldShowSponsor } from '../data/sponsors'
import GradientText from './bits/GradientText.vue'

const route = useRoute()
const isHomePage = ref(false)
const isFullHero = ref(false)
let observer: MutationObserver | null = null
let raf = 0

const hasBrand = computed(() => shouldShowSponsor(homeSponsor))
const targetHref = computed(() => hasBrand.value
  ? homeSponsor.href || '/fastapi_best_architecture_docs/sponsors.html'
  : '/fastapi_best_architecture_docs/sponsors.html')
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

.sh-inline-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

[data-theme="dark"] .sh-inline-img {
  filter: grayscale(1) invert(1);
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

/* ===== popup 浮窗（full 时） ===== */
.mode-popup {
  position: fixed;
  bottom: 56px;
  left: 56px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 224px;
  padding: 12px 14px 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(0, 148, 133, 0.22);
  box-shadow:
    0 10px 28px -12px rgba(0, 148, 133, 0.35),
    0 4px 12px -6px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

[data-theme="dark"] .mode-popup {
  background: rgba(28, 28, 32, 0.82);
  border-color: rgba(0, 148, 133, 0.38);
  box-shadow:
    0 12px 32px -12px rgba(0, 0, 0, 0.5),
    0 4px 14px -6px rgba(0, 148, 133, 0.3);
}

.mode-popup:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 148, 133, 0.5);
}

.sh-pop-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sh-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(0, 148, 133, 0.18);
  flex-shrink: 0;
  animation: sh-dot-pulse 2.4s ease-in-out infinite;
}

@keyframes sh-dot-pulse {

  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(0, 148, 133, 0.18);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(0, 148, 133, 0.05);
  }
}

.sh-pop-body {
  position: relative;
  width: 100%;
  aspect-ratio: 7 / 3;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(0, 148, 133, 0.08), rgba(124, 58, 237, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sh-pop-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

[data-theme="dark"] .sh-pop-img {
  filter: grayscale(1) invert(1);
}

.sh-pop-cta {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
}

.sh-pop-footer {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  text-align: center;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .mode-popup {
    bottom: 16px;
    left: 16px;
    width: 168px;
    padding: 10px 12px 8px;
    gap: 6px;
  }

  .sh-pop-label {
    font-size: 10px;
  }

  .sh-pop-footer {
    font-size: 10px;
  }
}
</style>
