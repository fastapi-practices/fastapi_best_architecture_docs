---
pageLayout: home
home: true
title: fba | FastAPI Best Architecture
watermark: false
signDown: true
config:
  - type: hero
    background: tint-plate
    tintPlate: 240
    hero:
      name: FastAPI Best Architecture
      tagline: 企业级后端架构解决方案
      text: 基于 FastAPI 框架，前后端分离，遵循「三层架构」设计，支持 Python 3.10+ 版本
      actions:
        - theme: brand
          text: 快速上手 ->
          link: /backend/summary/quick-start
        - theme: sponsor
          text: 在线体验 ->
          link: https://fastapi-practices.github.io/fba-offline/
        - theme: alt
          text: 三层架构?
          link: /backend/summary/intro#三层架构
        - theme: alt
          text: 为什么选择我们?
          link: /backend/summary/why
        - theme: alt
          text: DeepWiki 文档
          link: https://deepwiki.com/fastapi-practices/fastapi-best-architecture
  - type: SponsorHome
  - type: features
    features:
      - title: 现代技术栈
        icon: ✨
        details: FastAPI + SQLAlchemy 2.0 + Pydantic v2 + Celery 全栈异步
      - title: 三层架构
        icon: 🧠
        details: 极简设计，所有开发者都能轻松上手与扩展
      - title: 插件系统
        icon: unjs:unplugin
        details: 零耦合功能扩展，支持随意拼装
      - title: 高性能 JWT
        icon: 🔏
        details: 内置缓存 + 白名单机制的自研认证中间件
      - title: 高级权限控制
        icon: 🛠️
        details: 完整 RBAC + 精细化数据权限方案
      - title: 内置代码生成器
        icon: ⚙️
        details: 一键生成代码，预览、写入、下载，告别重复 CV
      - title: 全局时区支持
        icon: ⌛
        details: 开箱即用的时区配置，彻底解决时间处理痛点
      - title: 全链路日志追踪
        icon: 📝
        details: Trace ID + 丰富日志，快速定位任何问题
      - title: 一键容器部署
        icon: 🐳
        details: 完整 Docker Compose 方案，极速上线
  - type: custom
---

<script setup lang="ts">
import { computed } from 'vue'
import { goldSponsors, generalSponsors, shouldShowSponsor } from '@source/.vuepress/data/sponsors'

const processedGoldSponsors = computed(() =>
  goldSponsors.filter(sponsor => shouldShowSponsor(sponsor) && sponsor.link)
)

const processedGeneralSponsors = computed(() =>
  generalSponsors.filter(sponsor => shouldShowSponsor(sponsor) && sponsor.link)
)

const showGoldPlaceholder = computed(() =>
  goldSponsors.some(s => s.alt?.includes('成为赞助商') && !s.link)
)

const showGeneralPlaceholder = computed(() =>
  generalSponsors.some(s => s.alt?.includes('成为赞助商') && !s.link)
)
</script>

<style scoped>
:deep(.swiper-slide-link) {
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

:deep(.swiper-slide-link:hover) {
  border: 1px solid var(--vp-c-brand);
}

:deep(.swiper-slide) {
  background-color: var(--vp-c-bg-soft);
}
</style>

::: center

# 金牌赞助商

:::

<Swiper
v-if="processedGoldSponsors.length > 0"
:items="processedGoldSponsors"
mode="broadcast"
:loop="false"
:height="162"
:slides-per-view="3"
:space-between="10"
mousewheel
/>

::: center

## 银牌赞助商

:::

<Swiper
v-if="processedGeneralSponsors.length > 0"
:items="processedGeneralSponsors"
mode="carousel"
:height="168"
:slides-per-view="4"
:space-between="10"
:speed="5000"
/>

::: center

## 贡献者

:::

<div align="center">
  <a href="https://github.com/fastapi-practices/fastapi-best-architecture/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=fastapi-practices/fastapi-best-architecture"/>
  </a>
</div>
