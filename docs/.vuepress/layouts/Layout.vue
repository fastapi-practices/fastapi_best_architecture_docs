<script setup>
import { Layout } from "vuepress-theme-plume/client";
import SponsorPanel from "../components/SponsorPanel.vue";
import AsideNavAfter from "../components/AsideNavAfter.vue";
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
    <template #aside-outline-after>
      <div class="custom-content">
        <SponsorPanel />
        <AsideNavAfter />
      </div>
    </template>
  </Layout>
</template>

<style>
.custom-content {
  width: 100%;
}
</style>
