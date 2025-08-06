---
title: APScheduler
---

我们在最初的框架实现中，使用的是 APScheduler，但后来我们迁移到了
Celery，详情请查看：[#225](https://github.com/fastapi-practices/fastapi_best_architecture/discussions/225)

FastAPI + APScheduler 现已作为独立仓库发行，它的优势在于其灵活性与实时动态任务，如果你没有繁重的任务需求，它将是一个不错的选择

<LinkCard
title="fastapi_scheduler"
description="使用 FastAPI + APScheduler 构建的定时任务管理平台"
href="https://github.com/fastapi-practices/fastapi_scheduler"
icon="https://wu-clan.github.io/picx-images-hosting/logo/fba.png"
/>

::: warning
我们计划将 APScheduler 制作为 fba
插件，但需要等待 [4.0](https://github.com/agronholm/apscheduler/issues/465#issuecomment-2818889743)
版本发布
:::