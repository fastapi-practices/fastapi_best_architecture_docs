<template>
  <div class="brand-header">
    <span>{{ t('sponsorUi.heartfelt') }}</span>
  </div>
  <div class="brand-container">
    <div class="gold-sponsors">
      <div v-for="brand in goldSponsors" v-show="shouldShowSponsor(brand)" class="brand-item gold"
        @click="openSponsorLink(brand.href, '_blank')">
        <SponsorMedia :src="brand.link" :alt="brand.alt" :ink="brand.ink" fit="cover" />
      </div>
    </div>
    <div class="general-sponsors">
      <div v-for="brand in generalSponsors" v-show="shouldShowSponsor(brand)" class="brand-item"
        @click="openSponsorLink(brand.href, '_blank')">
        <SponsorMedia :src="brand.link" :alt="brand.alt" :ink="brand.ink" />
      </div>
    </div>
    <div v-if="shouldShowExtraBecomeSponsor" class="brand-item become-brand" @click="openSponsorLink(localeSponsorUrl)">
      <span class="brand-text">{{ t('sponsorUi.becomeSponsor') }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vuepress/client";
import {
  generalSponsors,
  goldSponsors,
  openSponsorLink,
  shouldShowSponsor,
} from "../data/sponsors";
import { useI18n } from "../composables/useI18n";
import SponsorMedia from "./SponsorMedia.vue";

const { t, withLocale } = useI18n();
const localeSponsorUrl = computed(() => withBase(withLocale('/sponsors.html')));

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
  overflow: hidden;
  transition: outline-color 0.3s ease;
  position: relative;
}

.brand-item:hover {
  outline: 1px solid var(--vp-c-brand);
  outline-offset: -1px;
}

.brand-item.gold {
  height: 96px;
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

.brand-item.gold .brand-text,
.brand-item.gold :deep(.sponsor-media__name) {
  font-size: 13px;
}

.become-brand {
  height: 32px;
  background-color: unset;
}
</style>
