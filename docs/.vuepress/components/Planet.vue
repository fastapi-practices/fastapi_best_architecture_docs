<template>
  <div class="content-wrapper">
    <div class="centered-header">
      <h1 class="main-header-text">您正在浏览非公开内容</h1>
    </div>

    <div class="qr-section">
      <button class="qr-toggle" @click="toggleQrOpen">
        <span class="qr-toggle-icon" :class="{ 'open': qrOpen }"></span>
        扫码订阅
        <span v-if="qrOpen">收起</span>
        <span v-else>展开</span>
      </button>
      <div v-if="qrOpen" class="qr-content">
        <p>
          加入 <a href="https://discord.gg/Sdg6dT5kjz" target="_blank">Discord</a> 社区，可领取免费体验资格
        </p>
        <img src="https://wu-clan.github.io/picx-images-hosting/知识星球.png" alt="知识星球" class="qr-image" />
      </div>
    </div>

    <p style="text-align: center; color: var(--vp-c-brand);">
      如果您已订阅此服务，请直接点击下方链接卡片跳转预览
    </p>

    <div class="tabs">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="{ active: activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="tabs.find((tab) => tab.id === activeTab)" class="tab-content">
      <div class="tab-header">
        <div class="tab-description">
          <template v-if="activeTab === 'fba'">此分类下的文章可用于 fba 架构，可能无法应用于其他三方架构方案</template>
          <template v-if="activeTab === 'fastapi'">此分类下的文章可用于任何基于 FastAPI 框架开发的架构</template>
          <template v-if="activeTab === 'plugin'">
            此分类下的文章可用于 fba 架构的插件系统
          </template>
        </div>
      </div>

      <CardGrid>
        <LinkCard
            v-for="card in tabs.find((tab) => tab.id === activeTab)!.cards"
            :key="card.href"
            :title="card.title"
            :icon="card.icon"
            :href="card.href"
            :description="card.description"
        />
      </CardGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card, fastapiCards, fbaCards, pluginCards } from "../data/planet";

interface Tab {
  id: string;
  label: string;
  cards: Card[];
}

const tabs = ref<Tab[]>([
  { id: 'fba', label: '架构', cards: fbaCards.value },
  { id: 'fastapi', label: '通用', cards: fastapiCards.value },
  { id: 'plugin', label: '插件', cards: pluginCards.value },
]);

const activeTab = ref<string>('fba');
const qrOpen = ref(false);

const toggleQrOpen = () => {
  qrOpen.value = !qrOpen.value;
};
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.centered-header {
  text-align: center;
}

.main-header-text {
  color: #fd7600;
  font-weight: bold;
  margin: 3rem 0 3rem;
}

.qr-section {
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.qr-toggle {
  font-weight: 600;
  color: var(--vp-c-brand);
  cursor: pointer;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  transition: background-color 0.2s ease;
}

.qr-toggle:hover {
  background-color: rgba(var(--vp-c-brand), 0.05);
}

.qr-toggle-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  border: 0.1em solid var(--vp-c-brand);
  border-radius: 50%;
  position: relative;
}

.qr-toggle-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.6em;
  height: 0.1em;
  background-color: var(--vp-c-brand);
  transform: translate(-50%, -50%);
}

.qr-toggle-icon.open::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.1em;
  height: 0.6em;
  background-color: var(--vp-c-brand);
  transform: translate(-50%, -50%);
}

.qr-content {
  text-align: center;
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.qr-image {
  max-width: 400px;
  width: 100%;
  border-radius: 0.5rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.tabs button {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  cursor: pointer;
}

.tabs button:hover {
  color: var(--vp-c-brand);
}

.tabs button.active {
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-brand);
}

.tab-description {
  color: var(--vp-c-text-3);
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid var(--vp-c-divider);
}

@media (min-width: 768px) and (max-width: 959px) {
  .content-wrapper {
    padding: 2rem;
  }
}

@media (min-width: 960px) {
  .content-wrapper {
    padding: 3rem;
  }
}
</style>
