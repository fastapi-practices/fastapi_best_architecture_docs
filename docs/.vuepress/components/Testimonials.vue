<template>
  <section class="testimonials">
    <header class="t-header">
      <h2 class="t-title">{{ t('testimonials.title') }}</h2>
      <p class="t-subtitle">{{ t('testimonials.subtitle') }}</p>
    </header>

    <div class="t-marquee">
      <div v-for="(row, rowIdx) in rows" :key="rowIdx" class="t-row"
        :class="rowIdx % 2 === 0 ? 't-row-left' : 't-row-right'">
        <div class="t-track">
          <article v-for="(item, idx) in [...row, ...row]" :key="`${rowIdx}-${idx}`" class="t-card"
            :aria-hidden="idx >= row.length ? 'true' : undefined">
            <div class="t-quote-mark">"</div>
            <p class="t-quote">{{ item.quote }}</p>
            <footer class="t-author">
              <img v-if="item.avatar" :src="item.avatar" :alt="item.name" class="t-avatar" loading="lazy" />
              <div class="t-author-meta">
                <span class="t-author-name">{{ item.name }}</span>
                <span class="t-author-role">{{ item.role }}</span>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

interface Testimonial {
  name: string
  role: string
  quote: string
  avatar?: string
}

const { t, tm } = useI18n()

const items = computed(() => tm<Testimonial[]>('testimonials.items') || [])

const rows = computed(() => {
  const list = items.value
  const rowCount = 2
  const rowSize = Math.ceil(list.length / rowCount)
  return Array.from({ length: rowCount }, (_, idx) =>
    list.slice(idx * rowSize, (idx + 1) * rowSize)
  ).filter(row => row.length > 0)
})
</script>

<style scoped>
.testimonials {
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 24px;
}

.t-header {
  text-align: center;
  margin-bottom: 36px;
}

.t-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.t-subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.t-marquee {
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
}

.t-row {
  display: flex;
  overflow: hidden;
}

.t-track {
  display: flex;
  gap: 18px;
  width: max-content;
  animation: marquee-scroll 72s linear infinite;
  will-change: transform;
}

.t-row-left .t-track {
  animation-name: marquee-left;
}

.t-row-right .t-track {
  animation-name: marquee-right;
  animation-duration: 80s;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-50% - 9px));
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(calc(-50% - 9px));
  }

  100% {
    transform: translateX(0);
  }
}

.t-card {
  position: relative;
  flex: 0 0 auto;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px 22px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 560px) {
  .t-card {
    width: 290px;
  }
}

.t-quote-mark {
  position: absolute;
  top: -22px;
  right: 14px;
  font-size: 96px;
  line-height: 1;
  font-family: Georgia, serif;
  color: var(--vp-c-brand-soft);
  pointer-events: none;
  user-select: none;
}

.t-quote {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin: 0;
  position: relative;
  z-index: 1;
}

.t-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 4px;
}

.t-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-bg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.t-author-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.t-author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.t-author-role {
  font-size: 12px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
