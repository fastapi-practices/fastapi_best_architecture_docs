<template>
  <div class="sponsor-header" @click="toggleCollapse">
    <span>倾情赞助</span>
    <span class="toggle-icon">{{ isCollapsed ? "<" : ">" }}</span>
  </div>
  <div class="sponsor-container" v-if="!isCollapsed">
    <div class="gold-sponsors">
      <div
        v-for="(sponsor, index) in goldSponsors"
        :key="'gold-' + index"
        class="sponsor-item gold"
        @click="openSponsorLink(sponsor.href)"
      >
        <img v-if="sponsor.link" :src="sponsor.link" :alt="sponsor.alt" class="sponsor-image" />
        <span v-else class="sponsor-text">{{ sponsor.text }}</span>
      </div>
    </div>
    <div class="general-sponsors">
      <div
        v-for="(sponsor, index) in generalSponsors"
        :key="'general-' + index"
        class="sponsor-item"
        @click="openSponsorLink(sponsor.href)"
      >
        <img v-if="sponsor.link" :src="sponsor.link" :alt="sponsor.alt" class="sponsor-image" />
        <span v-else class="sponsor-text">{{ sponsor.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { goldSponsors, generalSponsors } from "../data/sponsors";

const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const openSponsorLink = (href) => {
  window.open(href, "_blank");
};
</script>

<style scoped>
.sponsor-header {
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

.sponsor-container {
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

.sponsor-item {
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66px;
}

.sponsor-item:hover {
  border: 1px solid var(--vp-c-brand);
}

.sponsor-item.gold {
  height: 96px;
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.sponsor-text {
  color: var(--vp-c-text-3);
  font-size: 10px;
}

.sponsor-item.gold .sponsor-text {
  font-size: 12px;
}
</style>
