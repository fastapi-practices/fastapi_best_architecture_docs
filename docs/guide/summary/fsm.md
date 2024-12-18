---
title: 精简版本
---

我们有一些简化版本的 fastapi 三层架构脚手架，但是它们的更新可能并不同步，这意味着，你可能无法及时在便捷版中获得新功能支持和问题修复

> [!IMPORTANT]
> 我们积极寻找这些版本仓库的维护人员，如果你对此感兴趣，请直接在对应仓库创建 ISSUES 或通过 Discord 与我们联系

## SQLAlchemy

==推荐== 如果您正在使用 SQLAlchemy，请使用以下版本，并且它的维护频率较高，且由 FBA 作者积极维护

<RepoCard repo="wu-clan/fastapi_sqlalchemy_mysql" />

## Tortoise-ORM

==不太推荐== 如果您正在使用 Tortoise-ORM（或您是一位 Django 资深用户，并深爱 Django-ORM），请使用以下版本，但此版本缺少维护人员

<RepoCard repo="wu-clan/fastapi_tortoise_mysql" />

## SQLModel

==不推荐== SQLModel 是 FastAPI 作者创建的 ORM 框架，整合了 SQLAlchemy 和 Pydantic，如果您喜欢强耦合开发，请使用以下版本，但此版本基本没有维护

<RepoCard repo="wu-clan/fastapi_sqlmodel_mysql" />
