---
title: APScheduler
---

In the initial framework implementation we used APScheduler, but later migrated to Celery. Details: [#225](https://github.com/fastapi-practices/fastapi-best-architecture/discussions/225)

FastAPI + APScheduler is now published as a standalone repository. Its strengths are ease of use, flexibility, and real-time dynamic tasks. If you do not have heavy task requirements, it is a solid choice.

<LinkCard
title="fastapi_scheduler"
description="Scheduled task management platform built with FastAPI + APScheduler"
href="https://github.com/fastapi-practices/fastapi_scheduler"
icon="https://wu-clan.github.io/picx-images-hosting/logo/fba.png"
/>

::: warning
We plan to package APScheduler as an fba plugin, but need to wait for the [4.0](https://github.com/agronholm/apscheduler/issues/465#issuecomment-2818889743) release.
:::
