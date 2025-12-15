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
</style>