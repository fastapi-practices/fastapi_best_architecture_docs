<script setup>
import { computed } from "vue";
import { Layout } from "vuepress-theme-plume/client";
import { useSidebar } from 'vuepress-theme-plume/composables'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'

import BannerTop from "../components/BannerTop.vue";
import Footer from "../components/Footer.vue";
import SponsorPanel from "../components/SponsorPanel.vue";
import SponsorSidebar from "../components/SponsorSidebar.vue";

const { hasSidebar, hasAside } = useSidebar()
const showSidebarSponsorOnAsideTop = computed(() => !hasSidebar.value && hasAside.value)

</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="custom-content">
        <BannerTop />
      </div>
    </template>
    <template #nav-bar-content-after>
      <div>
        <button class="login-button">
          <a href="https://fba.wu-clan.site/">登录</a>
        </button>
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

.login-button {
  height: 32px;
  padding: 0 12px;
  margin-left: 16px;
  font-weight: 500;
  color: #FFFFF5DB;
  background-color: var(--vp-c-brand-1);
  border: none;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .login-button {
    height: 28px;
    padding: 0 10px;
    margin-left: 8px;
    font-size: 13px;
  }
}
</style>