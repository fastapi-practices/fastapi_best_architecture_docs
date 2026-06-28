<template>
  <a class="sponsor-exclusive-popup" :href="targetHref" :target="isExternal ? '_blank' : '_self'"
    :title="hasBrand ? homeSponsor.alt : '独家赞助商席位 - 立即咨询'">
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
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vuepress/client'
import { homeSponsor, shouldShowSponsor } from '../data/sponsors'
import GradientText from './bits/GradientText.vue'

const hasBrand = computed(() => shouldShowSponsor(homeSponsor))
const sponsorHref = computed(() => withBase('/sponsors.html'))
const targetHref = computed(() => hasBrand.value
  ? homeSponsor.href || sponsorHref.value
  : sponsorHref.value)
const isExternal = computed(() => hasBrand.value && /^https?:/.test(targetHref.value))
</script>

<style scoped>
.sponsor-exclusive-popup {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 224px;
  padding: 12px 14px 10px;
  border-radius: 16px;
  color: inherit;
  text-decoration: none !important;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(0, 148, 133, 0.22);
  box-shadow:
    0 10px 28px -12px rgba(0, 148, 133, 0.35),
    0 4px 12px -6px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

[data-theme="dark"] .sponsor-exclusive-popup {
  background: rgba(28, 28, 32, 0.82);
  border-color: rgba(0, 148, 133, 0.38);
  box-shadow:
    0 12px 32px -12px rgba(0, 0, 0, 0.5),
    0 4px 14px -6px rgba(0, 148, 133, 0.3);
}

.sponsor-exclusive-popup:hover {
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
  .sponsor-exclusive-popup {
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
