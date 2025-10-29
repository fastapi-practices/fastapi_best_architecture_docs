<script setup>
import { Layout } from "vuepress-theme-plume/client";
import SponsorPanel from "../components/SponsorPanel.vue";
import BannerTop from "../components/BannerTop.vue";
import SponsorSidebar from "../components/SponsorSidebar.vue";
import Footer from "../components/Footer.vue";
import GradientText from "../components/bits/GradientText.vue";
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

.colorful-char {
  font-size: 1.2em;
  font-weight: bold;
  color: hsl(0, 70%, 60%);
  animation: colorful 6s infinite ease-in-out;
}

@keyframes colorful {
  0% {
    color: hsl(0, 70%, 60%);
  }
  33% {
    color: hsl(120, 70%, 60%);
  }
  66% {
    color: hsl(240, 70%, 60%);
  }
  100% {
    color: hsl(0, 70%, 60%);
  }
}
</style>