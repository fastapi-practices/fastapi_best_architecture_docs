<template>
  <div class="banner">
    <p class="vp-banner-text">
      <span class="vp-text-primary">FBA </span>
      <span class="vp-tagline">· FasAPI</span>
      <span class="vp-place"> 最佳架构</span>
      <span class="vp-date"> · 插件系统已发布</span>
      <a class="vp-primary-action" href="/fastapi_best_architecture_docs/plugin/before.html"> 甩起来 </a>
    </p>
    <button @click="dismiss">
      <Icon name="mingcute:close-fill" />
    </button>
    <p class="vp-banner-text vp-coupon">
      <span class="vp-text-primary">代码</span> 有 BUG？
      <span class="vp-text-primary"> 请通过互动与我们反馈！</span>
    </p>
  </div>
</template>

<script setup>
import { useStorage } from "@vueuse/core";

const isDismissed = useStorage("fba-docs-banner-top", true);

function dismiss() {
  isDismissed.value = false;
  if (typeof window !== 'undefined') {
    localStorage.setItem("fba-docs-banner-top", false);
  }
  updateDocumentClass();
}

function updateDocumentClass() {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle("banner-dismissed", !isDismissed.value);
  }
}

updateDocumentClass();
</script>

<style>
html:not(.banner-dismissed) {
  --vp-layout-top-height: 60px;
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-layout-top-height);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: #161618;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
}

.banner-dismissed .banner {
  display: none;
}

a:hover {
  text-decoration: underline;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 10px;
}

.vp-banner-text {
  font-size: 16px;
}

.vp-text-primary {
  color: var(--vp-c-brand-1);
}

.vp-primary-action {
  background: var(--vp-c-brand-1);
  color: #121c1a;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.vp-primary-action:hover {
  text-decoration: none;
  background: #75c05e;
}

@media (max-width: 1280px) {
  .banner .vp-banner-text {
    font-size: 14px;
  }
}

@media (max-width: 780px) {
  .vp-tagline {
    display: none;
  }

  .vp-primary-action {
    padding: 5px 5px;
  }

  .vp-time-now {
    display: none;
  }
}

@media (max-width: 579px) {
  .vp-place {
    display: none;
  }

  .vp-date {
    display: none;
  }
}
</style>
