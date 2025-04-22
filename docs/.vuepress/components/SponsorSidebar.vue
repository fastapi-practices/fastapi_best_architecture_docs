<template>
  <div class="sponsor-header">
    <span>独家赞助</span>
  </div>
  <div class="sponsor-container">
    <div class="sidebar-sponsor">
      <div class="sponsor" @click="openSponsorLink(homeSponsor.href)">
        <img v-if="homeSponsor.link" :src="homeSponsor.link" :alt="homeSponsor.alt" class="sponsor-image" />
        <span v-else class="sponsor-text">{{ homeSponsor.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { homeSponsor } from "../data/sponsors";

const openSponsorLink = (href) => {
  window.open(href, "_blank");
};
</script>

<style scoped>
.sponsor-header {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.sponsor-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sidebar-sponsor {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sponsor {
  background-color: var(--vp-c-bg-safe);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 89px;
}

.sponsor:hover {
  border: 1px solid var(--vp-c-brand);
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.sponsor-text {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

@media (max-width: 576px) {
  .sponsor {
    height: 110px;
  }
}
</style>
