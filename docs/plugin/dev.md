---
title: 插件开发
---

::: info
在官方仓库中，包含多个内置插件，位于 `backend/plugin` 目录下，结合官方仓库阅读此文档，效果更佳
:::

## 后端

::: steps

1. 拉取最新的 fba 项目到本地并配置好开发环境
2. 通过 [插件类型](#插件类型)、[插件路由](#插件路由)、[数据库兼容性](#数据库兼容性) 了解插件系统的运作机制
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

### 数据库兼容性

fba 内所有官方实现都同时兼容 mysql 和 postgresql，但我们不对第三方插件进行强制要求，如果您对此感兴趣，请查看 SQLAlchemy 2.0
官方文档：[TypeDecorator](https://docs.sqlalchemy.org/en/20/core/custom_types.html#typedecorator-recipes)、
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
    - .env.example 环境变量
    - __init__.py 作为 python 包保留 <Badge type="danger" text="必须" />
    - … 更多内容，例如 enums.py...
    - plugin.toml 插件配置文件 <Badge type="danger" text="必须" />
    - README.md 插件使用说明和您的联系方式 <Badge type="danger" text="必须" />
    - requirements.txt 依赖包文件

:::

### 插件配置

`plugin.toml` 是插件的配置文件，每个插件都必须包含此文件

::: tabs#plugin
@tab <Icon name="carbon:app" />应用级插件

```toml
# 插件信息
[plugin]
# 图标（插件仓库内的图标路径或图标链接地址）
icon = 'assets/icon.svg'
# 摘要（简短描述）
summary = ''
# 版本号
version = ''
# 描述
description = ''
# 作者
author = ''
# 标签
# 当前支持：ai、mcp、agent、rag、permission、sso、rbac、auth、ldap、
# storage、notification、task、other
tags = ['']
# 数据库支持
# 当前支持：mysql、pgsql、postgresql
database = ['']

# 应用配置
[app]
# 路由器最终实例
# 可参考源码：backend/app/admin/api/router.py，通常默认命名为 v1
router = ['v1']

# 代码中的配置项（全大写）
# 该配置项为可选，详情请查看：热插拔
[settings]
XXX = X
```

@tab <Icon name="fluent:table-simple-include-16-regular" />扩展级插件

```toml
# 插件信息
[plugin]
# 图标（插件仓库内的图标路径或图标链接地址）
icon = 'assets/icon.svg'
# 摘要（简短描述）
summary = ''
# 版本号
version = ''
# 描述
description = ''
# 作者
author = ''
# 标签
# 当前支持：ai、mcp、agent、rag、permission、sso、rbac、auth、ldap、
# storage、notification、task、other
tags = ['']
# 数据库支持
# 当前支持：mysql、pgsql、postgresql
database = ['']

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

# 代码中的配置项（全大写）
# 该配置项为可选，详情请查看：热插拔
[settings]
XXX = X
```

:::

### 全局配置

fba 采用全局单配置文件（类似 Django），我们的标准做法是在 `backend/core/conf.py` 中统一添加插件的全局配置，示例如下：

```python
##################################################
# [ Plugin ] email
##################################################
# .env
EMAIL_USERNAME: str
EMAIL_PASSWORD: str

# 基础配置
EMAIL_HOST: str
EMAIL_PORT: int
EMAIL_SSL: bool
EMAIL_CAPTCHA_REDIS_PREFIX: str
EMAIL_CAPTCHA_EXPIRE_SECONDS: int
```

整个结构分为【插件配置说明注释】、【插件环境变量配置及注释】、【插件基础配置及注释】，但是，在发布的插件中，我们无法添加这些配置，只能通过
`README` 进行说明，提醒用户如何完成插件全局配置，可参考 fba 官方插件：[oss](https://github.com/fastapi-practices/oss)

::: caution
全局配置默认使用最高优先级赋值，优先级如下：

```mermaid
graph LR
    System("系统环境变量") --> DotEnv[".env"]
    DotEnv --> Settings["conf.py"]
    Settings --> Plugin["插件 settings 配置项"]
```

:::

### 热插拔

从 ==v1.13.0=={.warning} 开始，按以下要求进行配置，将自动适配热插拔特性

- 插件环境变量

  如果插件需要添加环境变量，则需在插件根目录添加 `.env.example` 文件，并添加环境变量配置，参考如下：

    ```dotenv:no-line-numbers
    # [ Plugin ] email
    EMAIL_USERNAME: str
    EMAIL_PASSWORD: str
    ```

- 插件基础配置

  如果插件需要添加基础配置，则需在 [插件配置](#插件配置) 中的 `settings` 配置项中添加基础配置，参考如下：

  ::: warning
  `plugin.toml` 和 `backend/core/conf.py` 中的配置方式完全不同。请格外注意，避免混淆
  :::

    ```toml:no-line-numbers
    [settings]
    EMAIL_HOST = 'smtp.qq.com'
    EMAIL_PORT = 465
    EMAIL_SSL = true
    EMAIL_CAPTCHA_REDIS_PREFIX = 'fba:email:captcha'
    EMAIL_CAPTCHA_EXPIRE_SECONDS = 180  # 3 分钟
    ```

完成以上配置后，如果插件无需更多修改，通过 [CLI 或 Git](./install.md) 方式安装插件后，将无损适配热插拔

::: tip
除此之外，我们仍强烈建议您在开发阶段添加 [全局配置](#全局配置)，并在发布的插件 README 中添加全局配置说明，如果你和你的插件用户想通过
IDE 获取全局配置键入提示，这是必需的，相反，你们将无法获取 IDE 键入提示
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

## 注意事项

::: caution
非必要情况下，插件代码中尽量不要引用架构中的现有方法，如果架构中的现有方法发生变更，则插件也必须同步变更，否则插件将被损坏
:::
