---
home: true
watermark: false
config:
  - type: hero
    hero:
      name: FastAPI Best Architecture
      tagline: 企业级后端架构解决方案
      text: 基于 FastAPI 框架，前后端分离，遵循「伪三层架构」设计，支持 Python 3.10+ 版本
      actions:
        - theme: brand
          text: 快速开始 ->
          link: /backend/summary/quick-start
        - theme: alt
          text: 伪三层架构?
          link: /backend/summary/intro#伪三层架构
        - theme: alt
          text: 为什么选择我们?
          link: /backend/summary/why
        - theme: alt
          text: DeepWiki 文档
          link: https://deepwiki.com/fastapi-practices/fastapi_best_architecture
  - type: SponsorHome
  - type: features
    features:
      - title: 最新技术栈
        icon: 🚀
        details: 基于 FastAPI、SQLAlchemy 2.0、Pydantic-v2、Celery 等技术栈
      - title: 自研架构
        icon: 🧠
        details: 独特的「伪三层架构」，让所有开发者可轻松驾驭
      - title: 插件系统
        icon: unjs:unplugin
        details: 告别高耦合集成，让功能变得可轻松 Hot Swap（热插拔）
      - title: JWT
        icon: 🔏
        details: 带有缓存和白名单的 JWT 授权中间件
      - title: 权限管理
        icon: 🛠️
        details: RBAC 解决方案和十分高级的数据权限
      - title: 代码生成
        icon: ⚙️
        details: 内置代码自动生成，告别通用代码频繁 cv
      - title: 时区时间
        icon: ⌛
        details: 提供全局时区时间配置，告别时间处理烦恼
      - title: 日志
        icon: 📝
        details: 强大的日志系统，Trace ID 助你轻松定位任何问题
      - title: Docker
        icon: 🐳
        details: 提供 Docker compose 一键部署方案
  - type: custom
---

<script setup lang="ts">
import { goldSponsors, generalSponsors } from '@source/.vuepress/data/sponsors'
</script>

<h1 align="center">特别赞助商</h1>

<Swiper
:items="goldSponsors"
mode="broadcast"
:loop="false"
:height="162"
:slides-per-view="3"
:space-between="10"
mousewheel
/>

<h2 align="center">赞助商</h2>

<Swiper
:items="generalSponsors"
mode="carousel"
:height="168"
:slides-per-view="4"
:space-between="10"
:speed="5000"
/>

<h2 align="center" style="border-top: none; margin-bottom: 24px">贡献者</h2>

<div align="center">
  <a href="https://github.com/fastapi-practices/fastapi_best_architecture/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=fastapi-practices/fastapi_best_architecture"/>
  </a><br>
  <a href="/fastapi_best_architecture_docs/join.html" style="font-size: 13px">加入我们</a>
</div>