<template>
  <section class="home-sponsor">
    <div class="hs-inner">
      <h2 class="hs-title">请 fba 喝杯奶茶 🧋</h2>
      <p class="hs-desc">
        如果 fba 为你省下时间，欢迎请作者喝杯奶茶，让我们走得更远
      </p>
      <a :href="withBase('/sponsors.html')" class="hs-btn">
        支持一下
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vuepress/client'
</script>

<style scoped>
.home-sponsor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px;
}

.hs-inner {
  text-align: center;
}

.hs-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 10px;
  letter-spacing: -0.02em;
}

.hs-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 auto 28px;
  max-width: 620px;
}

.hs-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fff !important;
  background: var(--vp-c-brand-1);
  border-radius: 10px;
  text-decoration: none !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hs-btn svg {
  width: 16px;
  height: 16px;
}

.hs-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -8px rgba(0, 148, 133, 0.5);
}
</style>
