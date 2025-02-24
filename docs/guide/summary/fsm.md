---
title: 精简版本
---

::: warning
FastAPI 三层架构脚手架精简版的更新可能并不同步，你可能无法及时的在这些版本中获得新功能支持和问题修复
:::

> [!IMPORTANT]
> 我们在积极寻找这些版本的维护人员，如果你对此感兴趣，请直接在对应仓库创建 ISSUES 或通过 Discord 与我们联系

## SQLAlchemy

==推荐== 如果您正在使用 SQLAlchemy，请使用以下版本，并且它的维护频率较高，且由 fba 作者积极维护

<RepoCard repo="fastapi-practices/fastapi_sqlalchemy_mysql" />

## Tortoise-ORM

==不太推荐=={.note} 如果您正在使用 Tortoise-ORM（或您是一位 Django 资深用户，并深爱 Django-ORM），请使用以下版本，但此版本缺少维护人员

<RepoCard repo="fastapi-practices/fastapi_tortoise_mysql" />

## SQLModel

==不推荐=={.warning} SQLModel 是 FastAPI 作者创建的 ORM 框架，整合了 SQLAlchemy 和 Pydantic，如果您喜欢强耦合开发，请使用以下版本，但此版本基本没有维护

<RepoCard repo="fastapi-practices/fastapi_sqlmodel_mysql" />
