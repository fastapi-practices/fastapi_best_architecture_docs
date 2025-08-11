<template>
  <div class="brand-header">
    <span>独家赞助</span>
  </div>
  <div class="brand-container">
    <div class="sidebar-brand">
      <div
          class="brand"
          @click="openSponsorLink(homeSponsor.href)"
      >
        <img
            v-if="shouldShowSponsor(homeSponsor.expiryTime)"
            :alt="homeSponsor.alt"
            :src="homeSponsor.link"
            class="brand-image"
        />
        <span v-else class="brand-text">成为赞助商</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { homeSponsor, openSponsorLink, shouldShowSponsor } from "../data/sponsors";
</script>

<style scoped>
.brand-header {
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
