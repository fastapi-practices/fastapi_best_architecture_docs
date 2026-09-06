<template>
  <div class="privacy-page">
    <header class="privacy-header">
      <h1 class="privacy-title">{{ t('privacyPolicy.title') }}</h1>
      <p class="privacy-meta">
        <span>{{ t('privacyPolicy.updated') }} <strong>{{ t('privacyPolicy.date') }}</strong></span>
        <span class="privacy-meta-sep" aria-hidden="true">·</span>
        <span>{{ t('privacyPolicy.effective') }} <strong>{{ t('privacyPolicy.date') }}</strong></span>
      </p>
    </header>
    <article class="privacy-body">
      <slot />
    </article>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.privacy-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 24px 72px;
}

.privacy-header {
  text-align: center;
  margin-bottom: 36px;
}

.privacy-title {
  margin: 0;
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.privacy-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 10px;
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

.privacy-meta strong {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.privacy-meta-sep {
  color: color-mix(in srgb, var(--vp-c-text-3) 70%, transparent);
}

.privacy-body {
  font-size: 15px;
  line-height: 1.85;
  color: var(--vp-c-text-2);
}

.privacy-body :deep(h2) {
  margin: 2.4rem 0 0.85rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 20px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.privacy-body :deep(h2:first-child) {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.privacy-body :deep(h3) {
  margin: 1.35rem 0 0.55rem;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.45;
  color: var(--vp-c-text-1);
}

.privacy-body :deep(p) {
  margin: 0 0 1rem;
}

.privacy-body :deep(ul) {
  margin: 0 0 1.1rem;
  padding-left: 1.15rem;
}

.privacy-body :deep(li) {
  margin: 0.4rem 0;
  padding-left: 0.15rem;
}

.privacy-body :deep(li::marker) {
  color: var(--vp-c-brand-1);
}

.privacy-body :deep(strong) {
  font-weight: 650;
  color: var(--vp-c-text-1);
}

.privacy-body :deep(i) {
  font-style: normal;
  font-weight: 650;
  color: var(--vp-c-text-1);
}

.privacy-body :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  overflow-wrap: anywhere;
}

.privacy-body :deep(a:hover) {
  text-decoration: underline;
}

.privacy-body :deep(.privacy-notice) {
  margin: 0 0 1.15rem;
  padding: 12px 16px;
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
}

.privacy-body :deep(.privacy-notice strong) {
  font-weight: 650;
}

@media (max-width: 767px) {
  .privacy-page {
    padding: 36px 18px 56px;
  }

  .privacy-body {
    font-size: 14px;
    line-height: 1.8;
  }

  .privacy-body :deep(h2) {
    font-size: 18px;
  }
}
</style>
