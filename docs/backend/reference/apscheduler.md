---
title: APScheduler
---

我们在最初的框架实现中，使用的是 APScheduler，但后来我们迁移到了
Celery，详情请查看：[#225](https://github.com/fastapi-practices/fastapi_best_architecture/discussions/225)

FastAPI + APScheduler 现已作为独立仓库发行，它的优势在于其灵活性与动态任务，如果你没有繁重的任务需求，它将是一个不错的选择

<RepoCard repo="fastapi-practices/fastapi_scheduler" />

::: warning
此仓库 master 分支使用 APScheduler 4.x 版本进行开发，但由于 APScheduler 迟迟未发布 4.x 版本，所以请切换 apscheduler-3.x
分支，它是目前比较流行的版本分支，也相对比较稳定
:::
