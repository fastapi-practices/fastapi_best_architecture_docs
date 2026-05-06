---
title: 多租户
---

fba 已新增多租户模式适配，但==当前主仓库提供的是“多租户运行模式支持”而不是完整的租户业务系统=={.note}

完整租户能力需安装 [tenant 插件](https://github.com/fastapi-practices/tenant)，该插件当前提供：

- 租户管理
- 套餐管理
- 行级数据隔离

::: caution
此能力当前仍处于实验性阶段，相关适配来自 [PR #1101](https://github.com/fastapi-practices/fastapi-best-architecture/pull/1101)
:::

## 常见隔离模型

参考 [django-tenants](https://github.com/django-tenants/django-tenants?tab=readme-ov-file#why-schemas)
对多租户的总结，常见方案通常有 3 类：

### 独立式方案

每个租户使用独立数据库，隔离性最强，但运维、迁移、资源管理和成本控制都会更复杂

### 半隔离式方案

所有租户共用一个数据库实例，但每个租户拥有独立 schema。它通常被视为一种折中方案：

- 相比独立数据库，更容易统一运维
- 相比共享 schema，隔离边界更清晰
- 能复用同一数据库连接、缓存和内存资源

### 共享方案

所有租户共用同一套表结构，通常在业务表中增加 `tenant_id` 一类字段，再通过查询条件、约束、上下文和中间件完成隔离

## Schema 方案

`django-tenants` 选择的是“半隔离式方案”，并认为它在简单性与性能之间取得了较好的平衡：

- 只需要维护一个数据库实例
- 对现有业务代码的入侵通常较小
- 租户之间的物理边界比 `tenant_id` 过滤更直观
- 在 PostgreSQL 中可借助 `search_path` 按请求切换到目标 schema

不过，这并不意味此方案一定优于其他方案。它同样有前提和边界，例如更依赖数据库能力、对 PostgreSQL 更友好、跨数据库兼容性也更受限制

## 方案应用

当前 fba 的多租户模式采用“共享方案”，这样做的主要目的是：

- 更容易兼容 PostgreSQL 与 MySQL
- 更容易复用现有模型、插件和初始化 SQL 体系
- 对现有单租户代码的改造路径更平滑

对应地，这种方案也要求开发者更加重视 `tenant_id` 注入、查询过滤、唯一约束和插件兼容性，否则更容易出现越权或串租户风险

## 启用方式

:::: steps

1. 安装 [tenant 插件](../../marketplace.md)

2. 修改 `backend/core/conf.py`

   ```py
   # 租户
   TENANT_ENABLED: bool = True
   TENANT_DEFAULT_ID: int = 0
   ```

3. 重新初始化数据库

   启用后，部分表会新增 `tenant_id` 字段，唯一约束和初始化 SQL 也会变化

   ::: warning
   由于数据库表变化，如果你从旧项目迁移，则必须进行 alembic 表迁移或否则重建所有表
   :::

::::

## 默认租户

`TENANT_DEFAULT_ID` 默认为 `0`，它主要用于：

- 默认租户兜底
- 非授权接口初始化上下文
- 日志记录中的默认租户 ID
- 登录接口未显式传入 `tenant_id` 时的默认值

## 注意事项

- 完整的租户后台、套餐管理、租户状态校验等业务能力由 `tenant` 插件提供，主仓库主要负责基础适配
- 当前实现为共享数据库下的租户模式适配，隔离能力以插件内的行级数据隔离实现为准
- 如果你同时使用 OAuth2、通知公告等插件，请确认对应插件版本已兼容多租户模式
