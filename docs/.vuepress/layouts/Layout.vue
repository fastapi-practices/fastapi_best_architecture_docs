<script setup>
import { Layout } from "vuepress-theme-plume/client";
import SponsorPanel from "../components/SponsorPanel.vue";
import BannerTop from "../components/BannerTop.vue";
import SponsorSidebar from "../components/SponsorSidebar.vue";
import Footer from "../components/Footer.vue";

const text = "完全开源";
const characters = text.split("");
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
      <div style="text-align: center; margin-bottom: 1rem;">
        <span
            v-for="(char, index) in characters"
            :key="index"
            class="colorful-char"
            :style="{ animationDelay: `${index * 0.2}s` }"
        >
          {{ char }}
        </span>
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