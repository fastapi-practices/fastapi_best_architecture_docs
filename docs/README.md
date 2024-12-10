---
home: true
watermark: false
config:
  - type: 'hero'
    full: true
    background: tint-plate
    hero:
      name: FastAPI Best Architecture
      tagline: 企业级中后台解决方案
      text: 基于 FastAPI 框架，前后端分离，遵循「伪三层架构」设计，支持 Python 3.10+ 版本
      actions:
        - theme: brand
          text: 快速开始 ->
          link: /guide/
        - theme: alt
          text: 在线预览
          link: https://fba.xwboy.top
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
      - title: 代码生成
        icon: ⚙️
        details: 提供后端代码自动生成，告别繁琐基础代码结构 cv
      - title: 权限管理
        icon: 🛠️
        details: 提供 Casbin、Role-Menu 两种 RBAC 权限方案。开关控制选择
      - title: JWT
        icon: 🔏
        details: 带有缓存和白名单的 JWT 中间件自动认证
      - title: Docker
        icon: 🐳
        details: 提供 Docker compose 一键部署方案
      - title: 时区时间
        icon: ⌛
        details: 通过配置一键应用全局时区时间，告别时间处理烦恼
      - title: 日志
        icon: 📝
        details: 内置十分强大的日志系统，全方位 Trace ID 助你一步锁定问题
  - type: custom
  - type: profile
    name: wu-clan
    description: 一个喜欢在夜深人静时进行开源创作的 coder
    avatar: https://avatars.githubusercontent.com/u/52145145?v=4
---

<script setup lang="ts">
import { ref } from 'vue'

const goldSponsors = ref([
  {
    link: 'https://wu-clan.github.io/picx-images-hosting/fba.png',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  }
])

const sponsors = ref([
  {
    link: 'https://wu-clan.github.io/picx-images-hosting/fba.png',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  },
  {
    link: '',
    text: '成为赞助商',
    href: 'https://github.com/wu-clan',
    alt: 'wu-clan',
  }
])
</script>

<h1 v-if="goldSponsors.length" align="center">金牌赞助商</h1>

<Swiper
v-if="goldSponsors.length"
:items="goldSponsors"
mode="carousel"
:height="200"
:slides-per-view="3"
:space-between="15"
:speed="15000"
/>

<h2 v-if="sponsors.length" align="center">赞助商</h2>

<Swiper
v-if="sponsors.length"
:items="sponsors"
mode="carousel"
:height="200"
:slides-per-view="4"
:space-between="10"
:speed="2500"
/>
