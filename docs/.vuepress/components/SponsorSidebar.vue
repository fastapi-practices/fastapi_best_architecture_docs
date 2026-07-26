<template>
  <div class="brand-header">
    <span>{{ t('sponsorUi.exclusiveShort') }}</span>
  </div>
  <div class="brand-container">
    <div class="sidebar-brand">
      <div class="brand" @click="openSponsorLink(homeSponsor.href)">
        <img v-if="shouldShowSponsor(homeSponsor)" :alt="homeSponsor.alt" :src="homeSponsor.link" class="brand-image" />
        <span v-else class="brand-text">{{ t('sponsorUi.becomeSponsor') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { homeSponsor, openSponsorLink, shouldShowSponsor } from "../data/sponsors";
import { useI18n } from "../composables/useI18n";

const { t } = useI18n();
</script>

<style scoped>
.brand-header {
  text-align: left;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.brand-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sidebar-brand {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.brand {
  background-color: var(--vp-c-bg-safe);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 89px;
}

.brand:hover {
  border: 1px solid var(--vp-c-brand);
}

.brand-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.brand-text {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

@media (max-width: 576px) {
  .brand {
    height: 110px;
  }
}
</style>
