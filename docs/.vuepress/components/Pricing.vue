<template>
  <div class="pricing-container">
    <h1 class="pricing-title">选择适合您的版本</h1>
    <p class="pricing-subtitle">
      以下所有版本仅用于赞助支持<br>
      <span style="color: #fd7600;">
        ✨此架构无需商业授权，任何个人或企业均可自由使用✨
      </span>
    </p>
    <div class="pricing-cards">
      <div class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ plans.openSource.title }}</h2>
            <p class="card-description">{{ plans.openSource.description }}</p>
          </div>
          <div class="price-section">
            <div class="current-price" style="margin-bottom: 59px">免费</div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in plans.openSource.features" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="cta-button"
                @click="openSponsorLink('/fastapi_best_architecture_docs/backend/summary/quick-start.html')">
          立即使用
        </button>
      </div>

      <div class="pricing-card highlighted">
        <div class="popular-tag">最受欢迎</div>
        <div class="card-content">
          <div class="card-header">
            <h2>{{ plans.professional.title }}</h2>
            <p class="card-description">{{ plans.professional.description }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ plans.professional.price.current }} <span class="billing-cycle">/ 年</span>
            </div>
            <div v-if="plans.professional.price.original" class="original-price">
              <del>{{ plans.professional.price.original }}</del>
            </div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in plans.professional.features" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="cta-button primary" @click="openSponsorLink('/fastapi_best_architecture_docs/planet.html')">立即购买
        </button>
      </div>

      <div class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ plans.enterprise.title }}</h2>
            <p class="card-description">{{ plans.enterprise.description }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ plans.enterprise.price.current }} <span class="billing-cycle"></span>
            </div>
            <div v-if="plans.enterprise.price.original" class="original-price">
              <del>{{ plans.enterprise.price.original }}</del>
            </div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in plans.enterprise.features" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="cta-button" style="color: #fd7600 !important;">无此方案</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { plans } from "../data/price";
import { openSponsorLink } from "../data/sponsors";
</script>

<style scoped>
.pricing-subtitle {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-container {
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 1200px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.pricing-title {
  text-align: center;
  margin: 3rem 0 3rem;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 3rem 2em 6em;
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

.billing-cycle {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.original-price {
  color: var(--vp-c-text-3);
  font-size: 1rem;
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

  .pricing-title {
    margin: 2rem 0 1.5rem;
  }

  .pricing-subtitle {
    margin-bottom: 2rem;
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
