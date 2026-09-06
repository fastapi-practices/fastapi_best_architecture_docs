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
      tagline: Enterprise Backend Architecture
      text: >-
        Built on FastAPI with a frontend-backend split and a classic three-layer
        design. Supports Python 3.10+
      actions:
        - theme: brand
          text: Get Started ->
          link: /en/backend/summary/quick-start
        - theme: sponsor
          text: Live Demo ->
          link: https://fastapi-practices.github.io/fba-offline/
        - theme: alt
          text: Three-layer architecture?
          link: /en/backend/summary/intro#three-layer-architecture
        - theme: alt
          text: Why choose us?
          link: /en/backend/summary/why
        - theme: alt
          text: DeepWiki Docs
          link: https://deepwiki.com/fastapi-practices/fastapi-best-architecture
  - type: features
    title: Enterprise-ready, out of the box
    description: Three-layer core, plugin ecosystem, AI-first collaboration
    features:
      - title: Three-layer foundation
        icon: ph:squares-four-duotone
        details: API → Service → CRUD/DAO layers with clear boundaries and code generation — productive in 30 minutes
        link: /en/backend/summary/intro
      - title: Plugin ecosystem
        icon: ph:puzzle-piece-duotone
        details: AI, Auth, Storage, Notification — install and remove cleanly; private registries for enterprises
        link: /en/plugin/before
      - title: AI project context
        icon: ph:sparkle-duotone
        details: fba skills + LLMs.txt help Claude Code, Cursor, Codex and more understand project conventions
        link: /en/ai/skills
      - title: Auth & permissions built-in
        icon: ph:shield-check-duotone
        details: JWT, RBAC, data permissions, OAuth 2.0 and other enterprise essentials included
        link: /en/backend/reference/RBAC
      - title: Cache, queue & ops
        icon: ph:stack-duotone
        details: Redis, Celery, end-to-end logging, and timezone support when you need them
        link: /en/backend/reference/cache
      - title: One-click container deploy
        icon: ph:cloud-arrow-up-duotone
        details: Docker Compose ready with production-ready MySQL / PostgreSQL setups
        link: /en/backend/deploy/Docker
  - type: ProjectStats
  - type: Testimonials
  - type: custom
  - type: SponsorSwiper
  - type: HomeSponsor
---

::: center

## FAQ

<p class="subtitle">Questions you might be asking</p>

:::

::: collapse accordion
- What does fba add on top of plain FastAPI?

  On top of FastAPI it ships a three-layer architecture, RBAC, JWT, caching, end-to-end logging, timezone handling, Docker, code generation, a plugin system, and other enterprise essentials — ready out of the box, no scaffolding from scratch.

- Why three-layer architecture instead of DDD?

  Three-layer is a lightweight take on DDD ideas: low onboarding cost, clear boundaries, and room to evolve toward full DDD later.

- Does it support multi-tenancy?

  Yes. Experimental multi-tenancy is already available on the backend — see [PR #1101](https://github.com/fastapi-practices/fastapi-best-architecture/pull/1101). Frontend support is not included yet.

- Can it be used commercially?

  MIT licensed, free for commercial use forever, fully open source. If the project helps you, consider becoming a sponsor or contributor.

- Which databases are supported?

  First-class support for MySQL and PostgreSQL; Redis as the cache and queue foundation. Other databases can be adapted easily with AI assistance.

- How do I enable AI-powered workflows?

  Install [fba skills](./ai/skills.md) to give Claude Code, Cursor, Trae, and similar tools fba-specific context and scaffolding commands.
:::

::: center

## Contributors

<p class="subtitle">Every commit makes fba better</p>

<a href="https://github.com/fastapi-practices/fastapi-best-architecture/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fastapi-practices/fastapi-best-architecture"/>
</a>

:::

<style scoped>
  :deep(.subtitle) {
    font-size: 15px;
    color: var(--vp-c-text-2);
    margin-bottom: 36px;
  }
</style>
