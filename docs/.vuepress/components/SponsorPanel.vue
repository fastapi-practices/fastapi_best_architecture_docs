<template>
  <div class="sponsor-header" @click="toggleCollapse">
    <span>倾情赞助</span>
    <span class="toggle-icon">
      <Icon v-if="isCollapsed" name="iconamoon:arrow-right-2" />
      <Icon v-else name="iconamoon:arrow-down-2" />
    </span>
  </div>
  <div class="sponsor-container">
    <div class="gold-sponsors">
      <div
          v-for="(sponsor, index) in goldSponsors"
          v-show="!isCollapsed || (isCollapsed && !sponsor.alt.includes('成为赞助商'))"
          :key="'gold-' + index"
          :class="{ 'collapsed-mode': isCollapsed }"
          class="sponsor-item gold"
          @click="openSponsorLink(sponsor.href)"
      >
        <img v-if="sponsor.link" :alt="sponsor.alt" :src="sponsor.link" class="sponsor-image" />
        <span v-if="!isCollapsed && sponsor.alt.includes('成为赞助商')" class="sponsor-text">
          {{ sponsor.alt }}
        </span>
        <span v-if="isCollapsed" class="sponsor-text collapsed-text">
          {{ sponsor.alt }}
        </span>
      </div>
    </div>
    <div class="general-sponsors">
      <div
          v-for="(sponsor, index) in generalSponsors"
          v-show="!isCollapsed || (isCollapsed && !sponsor.alt.includes('成为赞助商'))"
          :key="'general-' + index"
          :class="{ 'collapsed-mode': isCollapsed }"
          class="sponsor-item"
          @click="openSponsorLink(sponsor.href)"
      >
        <img v-if="sponsor.link" :alt="sponsor.alt" :src="sponsor.link" class="sponsor-image" />
        <span v-if="!isCollapsed && sponsor.alt.includes('成为赞助商')" class="sponsor-text">
          {{ sponsor.alt }}
        </span>
        <span v-if="isCollapsed" class="sponsor-text collapsed-text">
          {{ sponsor.alt }}
        </span>
      </div>
    </div>
    <div v-if="isCollapsed" class="sponsor-item become-sponsor" @click="openSponsorLink(sponsorUrl)">
      <span class="sponsor-text">成为赞助商</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { generalSponsors, goldSponsors, sponsorUrl } from "../data/sponsors";

const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (typeof window !== 'undefined') {
    localStorage.setItem("sponsorCollapsed", isCollapsed.value);
  }
};

const openSponsorLink = (href) => {
  if (typeof window !== 'undefined') {
    window.open(href, "_blank");
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem("sponsorCollapsed");
    isCollapsed.value = savedState ? savedState === "true" : false;
  }
});
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
  transition: all 0.3s ease;
  position: relative;
}

.sponsor-item:hover {
  border: 1px solid var(--vp-c-brand);
}

.sponsor-item.gold {
  height: 96px;
}

.sponsor-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: opacity 0.3s ease;
}

.sponsor-text {
  color: var(--vp-c-text-3);
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  padding: 0 8px;
}

.sponsor-item.gold .sponsor-text {
  font-size: 13px;
}

.collapsed-mode {
  height: 32px !important;
}

.collapsed-mode .sponsor-image {
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

.become-sponsor {
  height: 32px;
  background-color: unset;
}
</style>
