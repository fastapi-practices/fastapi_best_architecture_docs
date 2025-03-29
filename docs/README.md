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
  - type: features
    features:
      - title: 最新技术栈
        icon: 🚀
        details: 基于 FastAPI、SQLAlchemy 2.0、Pydantic-v2、Celery、等最新技术栈
      - title: 自研架构
        icon: 🧠
        details: 独特的「伪三层架构」，让所有开发者轻松驾驭
      - title: 全局异步
        icon: 🔄
        details: 基于 async/await + asgiref 实现全局异步处理，告别协程阻塞问题
      - title: JWT
        icon: 🔏
        details: 带有缓存和白名单的 JWT 中间件自动认证
      - title: 权限管理
        icon: 🛠️
        details: 提供 Casbin、Role-Menu 两种 RBAC 权限方案。开关控制选择
      - title: 代码生成
        icon: ⚙️
        details: 提供后端代码自动生成，告别繁琐基础代码结构 cv
      - title: 时区时间
        icon: ⌛
        details: 通过配置一键应用全局时区时间，告别时间处理烦恼
      - title: 日志
        icon: 📝
        details: 内置十分强大的日志系统，全方位 Trace ID 助你一步锁定问题
      - title: Docker
        icon: 🐳
        details: 提供 Docker compose 一键部署方案
  - type: custom
---

<script setup lang="ts">
import { goldSponsors, generalSponsors } from '@source/.vuepress/data/sponsors'
</script>

<h1 v-if="goldSponsors.length" align="center">特别赞助商</h1>

<Swiper
v-if="goldSponsors.length"
:items="goldSponsors"
mode="broadcast"
:loop="false"
:height="200"
:slides-per-view="3"
:space-between="10"
mousewheel
/>

<h2 v-if="generalSponsors.length" align="center">赞助商</h2>

<Swiper
v-if="generalSponsors.length"
:items="generalSponsors"
mode="carousel"
:height="150"
:slides-per-view="4"
:space-between="10"
:speed="5000"
/>
