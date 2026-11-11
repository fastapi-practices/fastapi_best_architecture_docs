---
title: CRUD
---

::: tip
编写 Service / CRUD 层时，可以让 AI 先读取 <FbaSkillInstall /> 中的命名、编码风格和架构参考，避免把业务逻辑下沉到 CRUD 或把查询细节散落到 API 层
:::

我们在 fba 中使用 sqlalchemy-crud-plus 作为数据库操作基类，
它是一款由我们自主构建的基于 SQLAlchemy 2.0 的高级异步 CRUD SDK，它可适用于任何 FastAPI + SQLAlchemy 项目

<LinkCard
title="sqlalchemy-crud-plus"
description="基于 SQLAlchemy 2.0 构建的高级异步 CRUD SDK"
href="https://github.com/fastapi-practices/sqlalchemy-crud-plus"
icon="https://wu-clan.github.io/picx-images-hosting/logo/fba.png"
/>

## 函数命名

fba 遵循以下命名规范：

- 获取/查询详情：`get()`
- 通过 xxx 获取/查询详情：`get_by_xxx()`
- 获取/查询列表表达式：`get_select()`
- 获取/查询所有：`get_all()`
- 连接查询（join）：`get_join()`
- 子查询：`get_children()`
- 创建：`create()`
- 批量创建：`bulk_create()`
- 更新：`update()`
- 删除：`delete()`
- 批量删除：`delete_all()`

::: tip
CRUD 层依赖 `sqlalchemy-crud-plus` 提供的底层能力，例如 `select_model()`、`select_model_by_column()`、`select_models()`、`select_order()`、`update_model_by_column()`、`delete_model_by_column()` 等
:::

::: tip
分页列表通常由 Service 层组织，方法名统一为 `get_list()`，内部先调用 CRUD 层的 `get_select()` 获取查询表达式，再交由 `paging_data()` 生成分页数据，详情：[分页](./pagination.md)
:::

::: tip
Service 层如何调用 CRUD 层，详见：[Service](./service.md)
:::
