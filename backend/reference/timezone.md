---
url: /fastapi_best_architecture_docs/backend/reference/timezone.md
---
我们为全局精心设计了统一时区，现在，这是一件非常轻松的工作，只需修改 `backend/core/conf.py` 中的时区配置即可改变全局时区

::: caution
时区一旦确定，强烈建议不要后期修改，否则可能造成持久化数据时间信息紊乱！
:::

## 架构应用

无论在架构何处调用时间模块，我们都应使用 `backend/utils/timezone.py` 中提供的现有方法，而不是直接调用 datetime 相关模块

## 数据库

在数据库中处理时区是一件令人头疼的事，常见的方式有以下 3 种：

* 全部存读为 UTC，前端转化（利于国际化管理）
* 全部存读当前时区时间，根据前端传入的时区进行转换（利于本地化管理）
* 全部存储为数值时间戳，前端转化（极其不易管理，但易操作）

::: warning
自 fba 2.0.0 起，fba 移除了 MySQL 支持，用于兼容 MySQL 无时区类型的自定义 `TimeZone` 类型同步下线，时间列统一使用 PostgreSQL 原生的 `TIMESTAMP WITH TIME ZONE`（即 `sa.DateTime(timezone=True)`）
:::

fba 采用第 2 种方案：数据库层的所有时间列统一使用 PostgreSQL 原生的 `TIMESTAMP WITH TIME ZONE` 类型（即 SQLAlchemy 的 `sa.DateTime(timezone=True)`），写入前由 `backend/utils/timezone.py` 统一转换为当前时区，读出时数据库返回带时区的时间戳
