<script setup>
import BannerTop from "../components/BannerTop.vue";
import Footer from "../components/Footer.vue";
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import SponsorPanel from "../components/SponsorPanel.vue";
import SponsorSidebar from "../components/SponsorSidebar.vue";

import { useData } from 'vuepress-theme-plume/composables'
import { computed } from "vue";
import { Layout } from "vuepress-theme-plume/client";

const { frontmatter } = useData()
const showSidebarSponsorOnAsideTop = computed(() => frontmatter.value.sponsor_sidebar)

</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="custom-content">
        <BannerTop />
      </div>
    </template>
    <template #nav-bar-menu-before>
      <p class="neon-text">优雅～ 永不过时</p>
    </template>
    <template #sidebar-nav-before>
      <div class="custom-content">
        <SponsorSidebar />
      </div>
    </template>
    <template #aside-top>
      <div v-if="showSidebarSponsorOnAsideTop" style="margin-bottom: 8px">
        <SponsorSidebar />
      </div>
    </template>
    <template #posts-aside-top>
      <div style="margin-bottom: 8px">
        <SponsorSidebar />
      </div>
    </template>
    <template #doc-title-after>
      <PageContextMenu />
    </template>
    <template #aside-outline-after>
      <div class="custom-content">
        <SponsorPanel />
      </div>
    </template>
    <template #footer-content>
      <div class="custom-content">
        <Footer />
      </div>
    </template>
  </Layout>
</template>

<style>
.custom-content {
  width: 100%;
}

.neon-text {
  margin-right: 38px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #ff3366;
  background: linear-gradient(135deg, rgba(255, 51, 102, 0.1), rgba(255, 51, 102, 0.05));
  border: 1px solid rgba(255, 51, 102, 0.3);
  border-radius: 8px;
  text-shadow: 0 0 8px rgba(255, 51, 102, 0.8),
  0 0 15px rgba(255, 51, 102, 0.5),
  0 0 25px rgba(255, 51, 102, 0.3);
  animation: neon-flicker 3s ease-in-out infinite;
  transition: all 0.3s ease;
}

@keyframes neon-flicker {
  0%, 100% {
    text-shadow: 0 0 8px rgba(255, 51, 102, 0.8),
    0 0 15px rgba(255, 51, 102, 0.5),
    0 0 25px rgba(255, 51, 102, 0.3);
  }
  50% {
    text-shadow: 0 0 5px rgba(255, 51, 102, 0.6),
    0 0 10px rgba(255, 51, 102, 0.4),
    0 0 15px rgba(255, 51, 102, 0.2);
  }
}
</style>