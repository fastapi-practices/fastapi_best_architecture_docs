<template>
  <div class="brand-header">
    <span>倾情赞助</span>
  </div>
  <div class="brand-container">
    <div class="gold-sponsors">
      <div
          v-for="brand in goldSponsors"
          v-show="shouldShowSponsor(brand)"
          class="brand-item gold"
          @click="openSponsorLink(brand.href, '_blank')"
      >
        <img :alt="brand.alt" :src="brand.link" class="brand-image" />
      </div>
    </div>
    <div class="general-sponsors">
      <div
          v-for="brand in generalSponsors"
          v-show="shouldShowSponsor(brand)"
          class="brand-item"
          @click="openSponsorLink(brand.href, '_blank')"
      >
        <img :alt="brand.alt" :src="brand.link" class="brand-image" />
      </div>
    </div>
    <div
        v-if="shouldShowExtraBecomeSponsor"
        class="brand-item become-brand"
        @click="openSponsorLink(sponsorUrl)"
    >
      <span class="brand-text">成为赞助商</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  generalSponsors,
  goldSponsors,
  openSponsorLink,
  shouldShowSponsor,
  sponsorUrl
} from "../data/sponsors";

const shouldShowExtraBecomeSponsor = computed(() => {
  return (goldSponsors.filter(brand => shouldShowSponsor(brand)).length +
      generalSponsors.filter(brand => shouldShowSponsor(brand)).length) < 9;
});
</script>

<style scoped>
.brand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin: 3px 0 2px;
}

.brand-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.gold-sponsors {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.general-sponsors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
}

.brand-item {
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66px;
  transition: all 0.3s ease;
  position: relative;
}

.brand-item:hover {
  border: 1px solid var(--vp-c-brand);
}

.brand-item.gold {
  height: 96px;
}

.brand-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: opacity 0.3s ease;
}

.brand-text {
  color: var(--vp-c-text-3);
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  padding: 0 8px;
}

.brand-item.gold .brand-text {
  font-size: 13px;
}

.become-brand {
  height: 32px;
  background-color: unset;
}
</style>
