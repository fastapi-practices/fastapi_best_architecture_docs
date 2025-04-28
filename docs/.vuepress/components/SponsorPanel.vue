<template>
  <div class="brand-header" @click="toggleCollapse">
    <span>倾情赞助</span>
    <span class="toggle-icon">
      <Icon v-if="isCollapsed" name="iconamoon:arrow-right-2" />
      <Icon v-else name="iconamoon:arrow-down-2" />
    </span>
  </div>
  <div class="brand-container">
    <div class="gold-sponsors">
      <div
          v-for="(brand, index) in processedGoldSponsors"
          v-show="!isCollapsed || (isCollapsed && shouldShowSponsor(brand))"
          :key="'gold-' + index"
          :class="{ 'collapsed-mode': isCollapsed }"
          class="brand-item gold"
          @click="openSponsorLink(brand.href)"
      >
        <img v-if="!isCollapsed && brand.link" :alt="brand.alt" :src="brand.link" class="brand-image" />
        <span v-if="!isCollapsed && brand.alt.includes('成为赞助商')" class="brand-text">
          {{ brand.alt }}
        </span>
        <span v-if="isCollapsed" class="brand-text collapsed-text">
          {{ brand.alt }}
        </span>
      </div>
    </div>
    <div class="general-sponsors">
      <div
          v-for="(brand, index) in processedGeneralSponsors"
          v-show="!isCollapsed || (isCollapsed && shouldShowSponsor(brand))"
          :key="'general-' + index"
          :class="{ 'collapsed-mode': isCollapsed }"
          class="brand-item"
          @click="openSponsorLink(brand.href)"
      >
        <img v-if="!isCollapsed && brand.link" :alt="brand.alt" :src="brand.link" class="brand-image" />
        <span v-if="!isCollapsed && brand.alt.includes('成为赞助商')" class="brand-text">
          {{ brand.alt }}
        </span>
        <span v-if="isCollapsed" class="brand-text collapsed-text">
          {{ brand.alt }}
        </span>
      </div>
    </div>
    <div
        v-if="isCollapsed && shouldShowExtraBecomeSponsor"
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
  defaultSponsor,
  generalSponsors,
  goldSponsors,
  openSponsorLink,
  shouldShowSponsor,
  sponsorUrl
} from "../data/sponsors";
import { useStorage } from "@vueuse/core";

const isCollapsed = useStorage('fba-docs-sponsor-collapsed', false);

const processedGoldSponsors = computed(() => {
  return goldSponsors.map(brand => {
    return shouldShowSponsor(brand) ? brand : defaultSponsor;
  });
});

const processedGeneralSponsors = computed(() => {
  return generalSponsors.map(brand => {
    return shouldShowSponsor(brand) ? brand : defaultSponsor;
  });
});

const shouldShowExtraBecomeSponsor = computed(() => {
  return (goldSponsors.filter(brand => brand.link && shouldShowSponsor(brand)).length +
      generalSponsors.filter(brand => brand.link && shouldShowSponsor(brand)).length) < 9;
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const brandItemGoldHeight = computed(() => {
  return isCollapsed.value ? '32px' : '96px'
})

const brandItemHeight = computed(() => {
  return isCollapsed.value ? '32px' : '66px'
})
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

.toggle-icon {
  font-size: 10px;
  transform: scale(1.2);
  opacity: 0.7;
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
  height: v-bind(brandItemHeight);
  transition: all 0.3s ease;
  position: relative;
}

.brand-item:hover {
  border: 1px solid var(--vp-c-brand);
}

.brand-item.gold {
  height: v-bind(brandItemGoldHeight);
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

.collapsed-mode {
  height: 32px !important;
}

.collapsed-mode .brand-image {
  opacity: 0;
}

.collapsed-text {
  color: var(--vp-c-brand-1) !important;
  font-weight: 600;
  transform: scale(1.05);
}

.collapsed-mode:hover .collapsed-text {
  color: var(--vp-c-text-1) !important;
}

.become-brand {
  height: 32px;
  background-color: unset;
}
</style>
