<template>
  <div class="pricing-container">
    <div class="pricing-cards">
      <div class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ t('pricing.openSource.title') }}</h2>
            <p class="card-description">{{ t('pricing.openSource.description') }}</p>
          </div>
          <div class="price-section">
            <div class="current-price" style="margin-bottom: 59px">{{ t('pricing.free') }}</div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in openSourceFeatures" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="cta-button"
          @click="openSponsorLink(withBase(withLocale('/backend/summary/quick-start.html')))">
          {{ t('pricing.getStarted') }}
        </button>
      </div>

      <div class="pricing-card highlighted">
        <div class="popular-tag">{{ t('pricing.mostPopular') }}</div>
        <div class="card-content">
          <div class="card-header">
            <h2>{{ t('pricing.professional.title') }}</h2>
            <p class="card-description">{{ t('pricing.professional.description') }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ t('pricing.professional.priceCurrent') }}</div>
            <div class="original-price">
              <del>{{ t('pricing.professional.priceOriginal') }}</del>
            </div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in professionalFeatures" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <p style="text-align: center; color: var(--vp-c-text-2);">{{ t('pricing.sponsorNote') }}</p>
        <button class="cta-button primary"
          @click="openSponsorLink(withBase(withLocale('/sponsors.html')))">{{ t('pricing.buyNow') }}
        </button>
      </div>

      <div class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ t('pricing.enterprise.title') }}</h2>
            <p class="card-description">{{ t('pricing.enterprise.description') }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ t('pricing.enterprise.priceCurrent') }}</div>
            <div class="original-price">
              <del>{{ t('pricing.enterprise.priceOriginal') }}</del>
            </div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in enterpriseFeatures" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="cta-button">{{ t('pricing.notAvailable') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vuepress/client";
import { openSponsorLink } from "../data/sponsors";
import { useI18n } from "../composables/useI18n";

const { t, tm, withLocale } = useI18n();

const openSourceFeatures = computed(() => tm('pricing.openSource.features') || [])
const professionalFeatures = computed(() => tm('pricing.professional.features') || [])
const enterpriseFeatures = computed(() => tm('pricing.enterprise.features') || [])
</script>

<style scoped>
.pricing-container {
  margin: 0 auto;
  max-width: 1200px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.pricing-card {
  position: relative;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 750px;
}

.pricing-card.highlighted {
  border: 2px solid var(--vp-c-brand-1);
}

.popular-tag {
  position: absolute;
  top: -18px;
  right: 20px;
  background-color: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.card-content {
  flex: 1;
}

.card-header {
  margin: -1rem 0 1.5rem;
  text-align: center;
}

.card-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.price-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.current-price {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.original-price {
  color: var(--vp-c-text-3);
  font-size: 1rem;
  margin-top: 10px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.features-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.feature-icon {
  color: var(--vp-c-brand-1);
  margin-right: 0.5rem;
  font-weight: bold;
}

.cta-button {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background-color: var(--vp-c-brand-1);
  color: white;
}

.cta-button.primary {
  background-color: var(--vp-c-brand-1);
  color: white;
}

@media (max-width: 767px) {
  .pricing-cards {
    grid-template-columns: repeat(1, 1fr);
    padding: 2rem 1rem 4rem;
  }

  .pricing-card {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .pricing-cards {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem 2rem 5rem;
  }
}

@media (min-width: 960px) {
  .pricing-cards {
    padding: 3rem 2em 6em;
  }
}
</style>
