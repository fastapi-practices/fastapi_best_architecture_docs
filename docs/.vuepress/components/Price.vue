<template>
  <div class="pricing-container">
    <h1 class="pricing-title">选择适合您的版本</h1>
    <div class="pricing-cards">
      <!-- 开源版 -->
      <div class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ plans.openSource.title }}</h2>
            <p class="card-description">{{ plans.openSource.description }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ plans.openSource.price.current }}</div>
            <div v-if="plans.openSource.price.original" class="original-price">
              <del>{{ plans.openSource.price.original }}</del>
            </div>
          </div>
          <ul class="features-list">
            <li v-for="(feature, index) in plans.openSource.features" :key="index">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
        <button class="cta-button">立即使用</button>
      </div>

      <!-- 专业版 -->
      <div class="pricing-card highlighted">
        <div class="popular-tag">最受欢迎</div>
        <div class="card-content">
          <div class="card-header">
            <h2>{{ plans.professional.title }}</h2>
            <p class="card-description">{{ plans.professional.description }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ plans.professional.price.current }} <span class="billing-cycle">/ 年</span></div>
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
        <button class="cta-button primary" @click="goSponsor">立即购买</button>
      </div>

      <!-- 企业版 -->
      <div class="pricing-card">
        <div class="card-content">
          <div class="card-header">
            <h2>{{ plans.enterprise.title }}</h2>
            <p class="card-description">{{ plans.enterprise.description }}</p>
          </div>
          <div class="price-section">
            <div class="current-price">{{ plans.enterprise.price.current }} <span class="billing-cycle">/ 年</span></div>
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
        <button class="cta-button" @click="goSponsor">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { plans } from "../data/price";
import { openSponsorLink, sponsorUrl } from "../data/sponsors";

const goSponsor = () => {
  openSponsorLink(sponsorUrl + '#有偿赞助')
}
</script>

<style scoped>
.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.pricing-title {
  text-align: center;
  margin-bottom: 3rem;
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
  margin-bottom: 1.5rem;
  text-align: center;
}

.card-header h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
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
</style>
