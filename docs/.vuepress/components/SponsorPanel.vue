<template>
  <div class="sponsor-container">
    <!-- Gold Sponsors -->
    <div class="gold-sponsors">
      <div
          v-for="(sponsor, index) in goldSponsors"
          :key="'gold-' + index"
          class="sponsor-item gold"
          @click="openSponsorLink(sponsor.href)"
      >
        <img
            v-if="sponsor.link"
            :src="sponsor.link"
            :alt="sponsor.alt"
            class="sponsor-image"
        />
        <span v-else class="sponsor-text">{{ sponsor.text }}</span>
      </div>
    </div>

    <!-- General Sponsors -->
    <div class="general-sponsors">
      <div
          v-for="(sponsor, index) in generalSponsors"
          :key="'general-' + index"
          class="sponsor-item"
          @click="openSponsorLink(sponsor.href)"
      >
        <img
            v-if="sponsor.link"
            :src="sponsor.link"
            :alt="sponsor.alt"
            class="sponsor-image"
        />
        <span v-else class="sponsor-text">{{ sponsor.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {goldSponsors, generalSponsors} from "../data/sponsors";

const openSponsorLink = (href) => {
  window.open(href, '_blank')
}
</script>

<style scoped>
.sponsor-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
}

.gold-sponsors {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.general-sponsors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.sponsor-item {
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65px;
}

.sponsor-item:hover {
  border: 1px solid var(--vp-c-brand);
}

.sponsor-item.gold {
  height: 95px;
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sponsor-text {
  color: var(--vp-c-text-3);
  font-size: 10px;
}

.sponsor-item.gold .sponsor-text {
  font-size: 14px;
}
</style>
