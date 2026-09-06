---
pageLayout: home
home: true
title: fba | FastAPI Best Architecture
watermark: false
signDown: true
config:
  - type: hero
    background: tint-plate
    full: true
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
  - type: features
    title: 企业级开发，开箱即用
    description: 三层架构打底，插件生态扩展，AI 贯穿协作
    features:
      - title: 三层架构打底
        icon: ph:squares-four-duotone
        details: API → Service → CRUD/DAO 分层，边界清晰，配套代码生成，新人 30 分钟即可上手
        link: /backend/summary/intro
      - title: 插件生态扩展
        icon: ph:puzzle-piece-duotone
        details: AI、Auth、Storage、Notification 装即用、卸即净，企业可自建私有仓库
        link: /plugin/before
      - title: AI 项目上下文
        icon: ph:sparkle-duotone
        details: fba skills + LLMs.txt 让 Claude Code、Cursor、Codex 等直接读懂项目规范
        link: /ai/skills
      - title: 认证权限内置
        icon: ph:shield-check-duotone
        details: JWT、RBAC、数据权限、OAuth 2.0 等企业基础件预置
        link: /backend/reference/RBAC
      - title: 缓存队列与运维
        icon: ph:stack-duotone
        details: Redis、Celery、全链路日志、时区方案按需启用
        link: /backend/reference/cache
      - title: 一键容器部署
        icon: ph:cloud-arrow-up-duotone
        details: Docker Compose 编排就位，MySQL / PostgreSQL 生产可用
        link: /backend/deploy/Docker
  - type: ProjectStats
  - type: Testimonials
  - type: custom
  - type: SponsorSwiper
  - type: HomeSponsor
---

::: center

## 常见问题

<p class="description">也许，你正想问</p>

:::

::: collapse accordion
- 与原生 FastAPI 项目相比，fba 多了什么？

  在 FastAPI 之上预置了三层架构、RBAC、JWT、缓存、全链路日志、时区、Docker、代码生成、插件系统等企业级必需件——开箱即用，不必从零搭脚手架

- 为什么选三层架构，而不是 DDD？

  三层是 DDD 思想的轻量落地：上手门槛低，边界清晰，依然为未来向 DDD 演进留好空间

- 支持多租户吗？

  支持。实验性多租户能力已在后端落地，详见 [PR #1101](https://github.com/fastapi-practices/fastapi-best-architecture/pull/1101)，但暂不包含前端实施

- 可以商用吗？

  MIT 协议，永久免费商用，源码完全开放。如果项目对你有价值，欢迎成为赞助商或贡献者

- 支持哪些数据库？

  一等支持 MySQL 与 PostgreSQL；Redis 作为缓存与队列底座；其他数据库可通过 AI 轻松适配

- AI 赋能怎么开启？

  安装 [fba skills](./ai/skills.md) 即可在 Claude Code、Cursor、Trae 等 AI 工具中获取 fba 专属上下文与脚手架命令
:::

::: center

## 贡献者

<p class="description">每一次提交，都在让 fba 变得更好</p>

<a href="https://github.com/fastapi-practices/fastapi-best-architecture/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fastapi-practices/fastapi-best-architecture"/>
</a>

:::

<style scoped>
  :deep(.description) {
    font-size: 15px;
    color: var(--vp-c-text-2);
    margin-bottom: 36px;
  }
</style>
