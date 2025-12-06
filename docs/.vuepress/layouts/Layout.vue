<script setup>
import { Layout } from "vuepress-theme-plume/client";
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import SponsorPanel from "../components/SponsorPanel.vue";
import BannerTop from "../components/BannerTop.vue";
import SponsorSidebar from "../components/SponsorSidebar.vue";
import Footer from "../components/Footer.vue";
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