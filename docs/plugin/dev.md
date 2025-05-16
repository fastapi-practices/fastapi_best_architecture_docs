---
title: 插件开发
---

## 后端

::: steps

1. 拉取最新的 fba 项目到本地并配置好开发环境
2. 通过 [插件分类](#插件分类)、[插件路由结构](#插件路由结构)、[插件配置](#插件配置)、[数据库兼容性](#数据库兼容性)
   了解插件系统的运作机制
3. 根据 [插件目录结构](#插件目录结构) 进行插件开发
4. 完成插件开发

5. [插件分享](./share.md) <Badge type="warning" text="可选" />

:::

### 插件分类

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件
在 [项目结构](../backend/summary/intro.md#项目结构) 中，app
目录下的一级文件夹被视为应用，此原理同样应用于插件系统。也就是说，如果插件被开发为应用，那么它们将会像应用一样被注入到系统中，我们称这类插件为【应用级插件】

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件
与【应用级插件】相反，如果插件不被开发为应用，那么它们将被开发为 app 目录下已存在应用的扩展功能，我们称这类插件为【扩展级插件】
:::

### 插件路由结构

如果插件符合插件开发的要求，则插件中的所有路由都将自动注入到 FastAPI 应用中。但值得注意的是，启动时间可能会随着插件数量的递增而增加，因为
fba 会在启动前对所有插件进行解析

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件
插件路由结构应完全遵循 [路由结构](../backend/reference/router.md#路由结构) 进行开发

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件
插件路由结构必须根据现有应用中的目录结构进行 1:1 复制，可参考 fba
中的内置插件 [notice](https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend/plugin/notice/api)
:::

### 插件配置

`plugin.toml` 是插件的配置文件，每个插件都必须包含此文件

::: caution
此配置文件自 fba v1.3.0 版本起发生重大变更，仅向后兼容（低于此版本开发的插件将不可用）
:::

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件

```toml
# 插件信息
[plugin]
# 摘要（简短描述）
summary = ''
# 插件版本号
version = ''
# 插件描述
description = ''
# 插件作者
author = ''

# 应用配置
[app]
# 插件路由器实例，可参考源码：backend/app/admin/api/router.py，通常默认命名为 v1
router = ['']
```

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件

```toml
# 插件信息
[plugin]
# 摘要（简短描述）
summary = ''
# 插件版本号
version = ''
# 插件描述
description = ''
# 插件作者
author = ''

# 应用配置
[app]
# 此插件属于哪个 app
include = ''

# 接口配置
# xxx 对应的是插件 api 目录下的接口文件名（不包含后缀）
# 例如接口文件名为 notice.py，则 xxx 应该为 notice
# 如果包含多个接口文件，则应存在多个相应的 api 配置
[api.xxx]
# xxx 路由前缀，必须以 '/' 开头
prefix = ''
# 标签，用于 FastAPI 接口文档
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
    - crud/ CRUD <Badge type="warning" text="非必须" />
    - model 模型 <Badge type="warning" text="非必须" />
        - __init__.py 在此文件内导入所有模型类 <Badge type="danger" text="必须" />
        - …
    - schema/ 数据传输 <Badge type="warning" text="非必须" />
    - service/ 服务 <Badge type="warning" text="非必须" />
    - utils/ 工具包 <Badge type="warning" text="非必须" />
    - __init__.py 作为 python 包保留 <Badge type="danger" text="必须" />
    - … 更多内容，例如 enums.py... <Badge type="warning" text="非必须" />
    - plugin.toml 插件配置文件 <Badge type="danger" text="必须" />
    - README.md 插件使用说明和您的联系方式 <Badge type="danger" text="必须" />
    - requirements.txt 依赖包文件 <Badge type="warning" text="非必须" />

:::

## 前端

::: warning
暂无此计划...
:::
