---
title: CRUD
---

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

- 获取/查询详情： `get()`
- 通过 xxx 获取/查询详情：`get_by_xxx()`
- 获取/查询列表：`get_list()`
- 获取/查询所有：`get_all()`
- 子查询：`get_children()`
- 关系查询：`get_with_relation()`
- 创建：`create()`
- 更新：`update()`
- 删除：`delete()`
