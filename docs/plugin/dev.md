---
title: 插件开发
---

## 后端

::: steps

1. 拉取最新的 fba 项目到本地并配置好开发环境
2. 通过 [插件类型](#插件类型)、[插件路由](#插件路由)、[插件配置](#插件配置)、[数据库兼容性](#数据库兼容性)
   了解插件系统的运作机制
3. 根据 [插件目录结构](#插件目录结构) 进行插件开发
4. 完成插件开发

5. [插件分享](./share.md) <Badge type="warning" text="可选" />

:::

### 插件类型

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件
在 [项目结构](../backend/summary/intro.md#项目结构) 中，app
目录下的一级文件夹被视为应用，此原理同样应用于插件系统。

此类插件会像应用一样被注入到系统中，我们称这类插件为【应用级插件】

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件
此类插件会被注入到 app 目录下已存在的应用中，我们称这类插件为【扩展级插件】
:::

### 插件路由

如果插件符合插件开发的要求，则插件中的所有路由都将自动注入到 FastAPI 应用中。但值得注意的是，启动时间可能会随着插件数量的递增而增加，因为
fba 会在每次启动前对所有插件进行实时解析

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件
应完全遵循 [路由结构](../backend/reference/router.md#路由结构) 进行开发

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件
必须将应用中的 api 目录结构进行 1:1 复制，可参考 fba
中的内置插件 [notice](https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend/plugin/notice/api)
:::

### 插件配置

`plugin.toml` 是插件的配置文件，每个插件都必须包含此文件

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件

```toml
# 插件信息
[plugin]
# 摘要（简短描述）
summary = ''
# 版本号
version = ''
# 描述
description = ''
# 作者
author = ''

# 应用配置
[app]
# 路由器最终实例
# 可参考源码：backend/app/admin/api/router.py，通常默认命名为 v1
router = ['v1']
```

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件

```toml
# 插件信息
[plugin]
# 摘要（简短描述）
summary = ''
# 版本号
version = ''
# 描述
description = ''
# 作者
author = ''

# 应用配置
[app]
# 扩展的哪个应用
extend = '应用文件夹名称'

# 接口配置
[api.xxx]
# xxx 对应的是插件 api 目录下接口文件的文件名（不包含后缀）
# 例如接口文件名为 notice.py，则 xxx 应该为 notice
# 如果包含多个接口文件，则应存在多个接口配置
# 路由前缀，必须以 '/' 开头
prefix = ''
# 标签，用于 Swagger 文档
tags = ''
```

:::

### 数据库兼容性

fba 内所有官方实现都同时兼容 mysql 和 postgresql，但我们不对第三方插件进行强制要求，如果您对此感兴趣，请查看 SQLAlchemy 2.0
官方文档:
[with_variant](https://docs.sqlalchemy.org/en/20/core/type_api.html#sqlalchemy.types.TypeEngine.with_variant)

### 插件目录结构

插件统一放置在 `backend/plugin` 目录下，以下是插件的目录结构

::: file-tree

- xxx 插件名 <Badge type="danger" text="必须" />
    - api/ 接口 <Badge type="danger" text="必须" />
    - crud/ CRUD
    - model 模型
        - __init__.py 在此文件内导入所有模型类 <Badge type="danger" text="目录存在则必须" />
        - …
    - schema/ 数据传输
    - service/ 服务
    - sql 如果插件需要执行 SQL 则建议
        - mysql
            - init.sql 自增 id 模式
            - init_snowflake.sql 雪花 id 模式
        - postgresql
            - init.sql 自增 id 模式
            - init_snowflake.sql 雪花 id 模式
    - utils/ 工具包
    - __init__.py 作为 python 包保留 <Badge type="danger" text="必须" />
    - … 更多内容，例如 enums.py...
    - plugin.toml 插件配置文件 <Badge type="danger" text="必须" />
    - README.md 插件使用说明和您的联系方式 <Badge type="danger" text="必须" />
    - requirements.txt 依赖包文件

:::

::: warning
非必要情况下，不建议引用架构中的现有方法，如果现有方法变更，则插件也必须同步变更，否则插件将不可用
:::

## 前端

::: steps

1. 拉取最新的 fba_ui 项目到本地并配置好开发环境
2. 根据 [插件目录结构](#插件目录结构-1) 进行插件开发
3. 完成插件开发

4. [插件分享](./share.md) <Badge type="warning" text="可选" />

:::

### 插件目录结构

插件统一放置在 `apps/web-antd/src/plugins` 目录下，以下是插件的目录结构

::: file-tree

- xxx 插件名
    - api 接口
        - index.ts
    - langs 多语言
        - en-US
            - 插件名.json
        - zh-CN
            - 插件名.json
    - routes 路由
        - index.ts
    - views 视图
        - index.vue
        - …
    - … 更多内容

:::