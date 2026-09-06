<template>
  <div class="pricing-page">
    <header class="pricing-header">
      <p class="pricing-kicker">{{ t('pricing.kicker') }}</p>
      <h1 class="pricing-title">{{ t('pricing.title') }}</h1>
      <p class="pricing-subtitle">{{ t('pricing.subtitle') }}</p>
    </header>

    <div class="pricing-cards">
      <article class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ t('pricing.openSource.title') }}</h2>
            <p class="card-description">{{ t('pricing.openSource.description') }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ t('pricing.free') }}</div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in openSourceFeatures" :key="index">
              <span class="feature-icon" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <a class="cta-button" :href="quickStartHref">{{ t('pricing.getStarted') }}</a>
      </article>

      <article class="pricing-card highlighted">
        <div class="popular-tag">{{ t('pricing.mostPopular') }}</div>
        <div class="card-content">
          <div class="card-header">
            <h2>{{ t('pricing.professional.title') }}</h2>
            <p class="card-description">{{ t('pricing.professional.description') }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ t('pricing.professional.priceCurrent') }}</div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in professionalFeatures" :key="index">
              <span class="feature-icon" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <p class="sponsor-note">{{ t('pricing.sponsorNote') }}</p>
        <a class="cta-button primary" :href="honorHref">{{ t('pricing.buyNow') }}</a>
      </article>

      <article class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ t('pricing.enterprise.title') }}</h2>
            <p class="card-description">{{ t('pricing.enterprise.description') }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ t('pricing.enterprise.priceCurrent') }}</div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in enterpriseFeatures" :key="index">
              <span class="feature-icon" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button type="button" class="cta-button" disabled>{{ t('pricing.unavailable') }}</button>
      </article>
    </div>

    <section class="brand-banner">
      <div class="brand-copy">
        <h2>{{ t('pricing.brandTitle') }}</h2>
        <p>{{ t('pricing.brandDesc') }}</p>
      </div>
      <a class="cta-button primary brand-cta" :href="boothHref">{{ t('pricing.brandCta') }}</a>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vuepress/client";
import { useI18n } from "../composables/useI18n";

const { t, tm, withLocale } = useI18n();

const openSourceFeatures = computed(() => tm('pricing.openSource.features') || [])
const professionalFeatures = computed(() => tm('pricing.professional.features') || [])
const enterpriseFeatures = computed(() => tm('pricing.enterprise.features') || [])
const quickStartHref = computed(() => withBase(withLocale('/backend/summary/quick-start.html')))
const honorHref = computed(() => withBase(withLocale('/sponsors.html')) + '#honor')
const boothHref = computed(() => withBase(withLocale('/sponsors.html')) + '#booth')
</script>

<style scoped>
.pricing-page {
  --pricing-brand: var(--vp-c-brand-1);
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 20px 72px;
}

.pricing-header {
  max-width: 720px;
  margin: 0 auto 36px;
  text-align: center;
}

.pricing-kicker {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pricing-brand);
}

.pricing-title {
  margin: 0;
  font-size: clamp(28px, 5vw, 40px);
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.pricing-subtitle {
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 28px 24px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.pricing-card.highlighted {
  border: 1px solid color-mix(in srgb, var(--pricing-brand) 42%, var(--vp-c-divider));
  background: linear-gradient(180deg, color-mix(in srgb, var(--pricing-brand) 10%, transparent), transparent 42%), var(--vp-c-bg-soft);
}

.popular-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background-color: var(--pricing-brand);
  color: #fff;
  padding: 0.25rem 0.9rem;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.card-content {
  flex: 1;
}

.card-header {
  margin: 0 0 1.25rem;
  text-align: center;
}

.card-header h2 {
  margin: 0;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.card-description {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.price-section {
  text-align: center;
  margin-bottom: 2.25rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--pricing-brand);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
}

.features-list li {
  padding: 0.45rem 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-1);
}

.feature-icon {
  color: var(--pricing-brand);
  font-weight: 700;
}

.sponsor-note {
  margin: 0 0 12px;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--pricing-brand);
  border-radius: 10px;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none !important;
  color: var(--pricing-brand) !important;
  background: transparent;
  appearance: none;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
  background-color: var(--pricing-brand);
  color: #fff !important;
}

.cta-button.primary {
  background-color: var(--pricing-brand);
  color: #fff !important;
}

.cta-button.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px -10px rgba(0, 148, 133, 0.55);
}

.cta-button:disabled {
  cursor: not-allowed;
  color: var(--vp-c-text-3) !important;
  border-color: var(--vp-c-divider);
  background: transparent;
  opacity: 0.7;
}

.cta-button:disabled:hover {
  background: transparent;
  color: var(--vp-c-text-3) !important;
  transform: none;
  box-shadow: none;
}

.brand-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 28px;
  padding: 28px;
  border: 1px solid color-mix(in srgb, var(--pricing-brand) 22%, var(--vp-c-divider));
  border-radius: 16px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--pricing-brand) 10%, var(--vp-c-bg-soft)), var(--vp-c-bg-soft) 62%);
}

.brand-copy h2 {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.brand-copy p {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.brand-cta {
  flex: none;
  width: auto;
  min-width: 168px;
}

@media (max-width: 959px) {
  .pricing-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .pricing-page {
    padding: 36px 16px 56px;
  }

  .pricing-cards,
  .brand-banner {
    grid-template-columns: 1fr;
    flex-direction: column;
    align-items: stretch;
  }

  .brand-cta {
    width: 100%;
  }
}
</style>
