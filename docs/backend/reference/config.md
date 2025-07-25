---
title: 配置
---

配置文件位于 `backend/core/conf.py`，fba 内的所有应用和插件配置都应统一放置在此文件内

## 环境变量配置

### `ENVIRONMENT` <Badge type="info" text="Literal['dev', 'pro']" />

指定环境模式，仅允许 `dev` 和 `pro`。当设置为 `pro` 时，openapi 相关在线文档将被禁止访问

### `DATABASE_TYPE` <Badge type="info" text="Literal['mysql', 'postgresql']" />

指定数据库类型，仅支持 `mysql` 和 `postgresql`，需注意第三方插件兼容性

### `DATABASE_HOST` <Badge type="info" text="str" />

提供数据库的主机地址

### `DATABASE_PORT` <Badge type="info" text="int" />

提供数据库的主机端口号

### `DATABASE_USER` <Badge type="info" text="str" />

连接数据库所使用的用户名

### `DATABASE_PASSWORD` <Badge type="info" text="str" />

连接数据库所使用的密码

### `REDIS_HOST` <Badge type="info" text="int" />

连接 Redis 数据库的主机地址

### `REDIS_PORT` <Badge type="info" text="str" />

连接 Redis 数据库的主机端口号

### `REDIS_PASSWORD` <Badge type="info" text="int" />

连接 Redis 数据库的密码

### `REDIS_DATABASE` <Badge type="info" text="str" />

全局默认使用的 Redis 逻辑数据库（0 - 15）

### `TOKEN_SECRET_KEY` <Badge type="info" text="str" />

token 生成和解析密钥，用于防止 token 被恶意篡改，请妥善保管此配置内容，密钥生成：`secrets.token_urlsafe(32)`

### `OPERA_LOG_ENCRYPT_SECRET_KEY` <Badge type="info" text="" />

操作日志指定字段加密密钥，当使用对称加密算法对指定字段进行加密时，这将十分重要，请妥善保管此配置内容，密钥生成：
`os.urandom(32).hex()`

## FastAPI 配置

### `FASTAPI_API_V1_PATH` <Badge type="info" text="str" />

API 版本号配置

### `FASTAPI_TITLE` <Badge type="info" text="str" />

openapi 相关在线文档标头配置

### `FASTAPI_VERSION` <Badge type="info" text="str" />

openapi 相关在线文档版本号配置

### `FASTAPI_DESCRIPTION` <Badge type="info" text="str" />

openapi 相关在线文档描述信息

### `FASTAPI_DOCS_URL` <Badge type="info" text="str" />

docs 在线文档地址

### `FASTAPI_REDOC_URL` <Badge type="info" text="str" />

redoc 在线文档地址

### `FASTAPI_OPENAPI_URL` <Badge type="info" text="str" />

openapi JSON 数据在线地址

### `FASTAPI_STATIC_FILES` <Badge type="info" text="bool" />

是否开启 FastAPI 静态文件服务

## 数据库基础配置

### `DATABASE_ECHO` <Badge type="info" text="bool | Literal['debug']" />

是否输出 sqlalchemy 操作日志

### `DATABASE_POOL_ECHO` <Badge type="info" text="bool | Literal['debug']" />

是否输出 sqlalchemy 线程池操作日志

### `DATABASE_SCHEMA` <Badge type="info" text="str" />

需要连接的数据库

### `DATABASE_CHARSET` <Badge type="info" text="str" />

数据库字符集，仅用于 mysql

## Redis 基础配置

### `REDIS_TIMEOUT` <Badge type="info" text="int" />

连接 Redis 数据库超时时长

## Token 基础配置

### `TOKEN_ALGORITHM` <Badge type="info" text="str" />

token 加密算法

### `TOKEN_EXPIRE_SECONDS` <Badge type="info" text="int" />

token 过期秒数

### `TOKEN_REFRESH_EXPIRE_SECONDS` <Badge type="info" text="int" />

刷新 token 过期秒数

### `TOKEN_REDIS_PREFIX` <Badge type="info" text="str" />

token 存储到 Redis 时的前缀

### `TOKEN_EXTRA_INFO_REDIS_PREFIX` <Badge type="info" text="str" />

token 扩展信息存储到 Redis 时的前缀

### `TOKEN_ONLINE_REDIS_PREFIX` <Badge type="info" text="str" />

token 在线状态存储到 Redis 时的前缀

### `TOKEN_REFRESH_REDIS_PREFIX` <Badge type="info" text="str" />

刷新 token 存储到 Redis 时的前缀

### `TOKEN_REQUEST_PATH_EXCLUDE` <Badge type="info" text="list[str]" />

JWT / RBAC 路由白名单，在此配置内的请求地址将不会校验 token 的真伪性

::: warning
fba 内通过 JWT 中间件解析 token 获取用户信息，并将用户信息赋值给 FastAPI request 对象，如果路由包含在此配置中，
`request.user` 将不可用
:::

### `TOKEN_REQUEST_PATH_EXCLUDE_PATTERN` <Badge type="info" text="list[Pattern[str]]" />

JWT / RBAC 路由白名单正则模式，从路由头部开始匹配，与之匹配的请求地址将不会校验 token 真伪性，注意项同上

## JWT 配置

### `JWT_USER_REDIS_PREFIX` <Badge type="info" text="str" />

JWT 中间件存储用户信息到 Redis 时的前缀

## RBAC 配置

更多详情：[RBAC](./RBAC.md)

### `RBAC_ROLE_MENU_MODE` <Badge type="info" text="bool" />

是否开启 RBAC 角色菜单模式

### `RBAC_ROLE_MENU_EXCLUDE` <Badge type="info" text="list[str]" />

开启 RBAC 角色菜单模式时，跳过 RBAC 鉴权（当接口权限标识和菜单权限标识相同时）

## Cookie 配置

### `COOKIE_REFRESH_TOKEN_KEY` <Badge type="info" text="str" />

将刷新 token 存储到 cookie 时的键名

### `COOKIE_REFRESH_TOKEN_EXPIRE_SECONDS` <Badge type="info" text="int" />

将刷新 token 存储到 cookie 时的过期时间

## 数据权限配置

更多详情：[数据权限](../../planet)

### `DATA_PERMISSION_MODELS` <Badge type="info" text="dict[str, str]" />

允许进行数据过滤的 SQLA 模型，模型值必须以模块字符串的方式定义

### `DATA_PERMISSION_COLUMN_EXCLUDE` <Badge type="info" text="list[str]" />

排除允许进行数据过滤的 SQLA 模型列，例如 id, password 等

## Socket.IO 配置

### `WS_NO_AUTH_MARKER` <Badge type="info" text="str" />

连接 socket.io 服务时跳过验证的标记，应将其直接定义为 token 值进行传输，请妥善保管此值，以免遭受恶意攻击

## CORS 配置

### `CORS_ALLOWED_ORIGINS` <Badge type="info" text="list[str]" />

跨域请求时允许的来源，末尾不带 `/`，例如：`http <Badge type="info" text="" />//127.0.0.1 <Badge type="info" text="" />8000`

### `CORS_EXPOSE_HEADERS` <Badge type="info" text="list[str]" />

跨域公开标头，允许将此标头添加到请求标头中

## 中间件配置

### `MIDDLEWARE_CORS` <Badge type="info" text="bool" />

是否启用跨域中间件

## 请求限制配置

### `REQUEST_LIMITER_REDIS_PREFIX` <Badge type="info" text="str" />

记录请求频率信息到 Redis 时的前缀

## 时间配置

### `DATETIME_TIMEZONE` <Badge type="info" text="str" />

全局时区配置，这将影响所有应用的时区设置

### `DATETIME_FORMAT` <Badge type="info" text="str" />

接口返回时，将时间字段转为指定字符串格式

## 文件上传配置

::: warning
部分配置可能被 nginx 覆盖
:::

### `UPLOAD_READ_SIZE` <Badge type="info" text="int" />

上传文件时，每次读取文件内容的缓冲大小

### `UPLOAD_IMAGE_EXT_INCLUDE` <Badge type="info" text="list[str]" />

允许上传的图片文件类型

### `UPLOAD_IMAGE_SIZE_MAX` <Badge type="info" text="int" />

允许上传的图片文件大小

### `UPLOAD_VIDEO_EXT_INCLUDE` <Badge type="info" text="list[str]" />

允许上传的视频文件类型

### `UPLOAD_VIDEO_SIZE_MAX` <Badge type="info" text="int" />

允许上传的视频文件大小

## 演示模式配置

### `DEMO_MODE` <Badge type="info" text="bool" />

是否开启演示模式，开启时，仅允许访问 `GET` 和 `OPTIONS` 请求

### `DEMO_MODE_EXCLUDE` <Badge type="info" text="set[tuple[str, str]]" />

开启演示模式时，不进行请求限制的接口

## IP 定位配置

### `IP_LOCATION_PARSE` <Badge type="info" text="Literal['online', 'offline', 'false']" />

定位信息获取模式

### `IP_LOCATION_REDIS_PREFIX` <Badge type="info" text="str" />

定位信息存储到 Redis 时的前缀

### `IP_LOCATION_EXPIRE_SECONDS` <Badge type="info" text="int" />

定位信息缓存时长

## 日志（Trace ID)

### `TRACE_ID_REQUEST_HEADER_KEY` <Badge type="info" text="str" />

跟踪 ID 请求头键名

### `TRACE_ID_LOG_DEFAULT_VALUE` <Badge type="info" text="str" />

跟踪 ID 未生成时的默认值

### `TRACE_ID_LOG_UUID_LENGTH` <Badge type="info" text="int" />

跟踪 ID 长度，必须小于等于 32

## 日志（控制台）

### `LOG_STD_LEVEL` <Badge type="info" text="str" />

日志记录级别

### `LOG_STD_FORMAT` <Badge type="info" text="str" />

日志内容格式化

## 日志（文件）

### `LOG_ACCESS_FILE_LEVEL` <Badge type="info" text="str" />

访问日志记录级别

### `LOG_ERROR_FILE_LEVEL` <Badge type="info" text="str" />

错误日志记录级别

### `LOG_ACCESS_FILENAME` <Badge type="info" text="str" />

访问日志文件名

### `LOG_ERROR_FILENAME` <Badge type="info" text="str" />

错误日志文件名

### `LOG_FILE_FORMAT` <Badge type="info" text="str" />

日志内容格式化

## 操作日志

### `OPERA_LOG_PATH_EXCLUDE` <Badge type="info" text="list[str]" />

操作日志路径排除，在此配置内的请求地址不会记录操作日志

### `OPERA_LOG_ENCRYPT_TYPE` <Badge type="info" text="int" />

操作日志加密类型

- 0：AES (性能损耗)
- 1：md5
- 2：ItsDangerous
- 3：不加密
- others：直接将内容替换为 ******

### `OPERA_LOG_ENCRYPT_KEY_INCLUDE` <Badge type="info" text="list[str]" />

将操作日志中的指定字段值进行加密

## 插件配置

### `PLUGIN_PIP_CHINA` <Badge type="info" text="bool" />

是否开启 pip 下载插件依赖国内加速

### `PLUGIN_PIP_INDEX_URL` <Badge type="info" text="str" />

通过 pip 下载插件依赖时的索引地址，与 `PLUGIN_PIP_CHINA` 配置相辅相成

### `PLUGIN_REDIS_PREFIX` <Badge type="info" text="str" />

插件信息存储到 Redis 时的前缀

## 验证码配置

### `CAPTCHA_LOGIN_REDIS_PREFIX` <Badge type="info" text="str" />

验证码登录时，验证码存储到 Redis 数据库时的前缀

### `CAPTCHA_LOGIN_EXPIRE_SECONDS` <Badge type="info" text="int" />

验证码登录时，验证码过期时间

## 应用：Task

### 环境变量配置

#### `CELERY_BROKER_REDIS_DATABASE` <Badge type="info" text="int" />

celery 代理使用的 Redis 逻辑数据库

#### `CELERY_RABBITMQ_HOST` <Badge type="info" text="str" />

连接 RabbitMQ 服务的主机地址

#### `CELERY_RABBITMQ_PORT` <Badge type="info" text="int" />

连接 RabbitMQ 服务的主机端口号

#### `CELERY_RABBITMQ_USERNAME` <Badge type="info" text="str" />

连接 RabbitMQ 服务的用户名

#### `CELERY_RABBITMQ_PASSWORD` <Badge type="info" text="str" />

连接 RabbitMQ 服务的密码

### 基础配置

#### `CELERY_BROKER` <Badge type="info" text="Literal['rabbitmq', 'redis']" />

代理模式，开发模式默认使用 redis，线上模式强制切换为 rabbitmq

#### `CELERY_REDIS_PREFIX` <Badge type="info" text="str" />

任务应用默认使用的 Redis 逻辑数据库

#### `CELERY_TASK_MAX_RETRIES` <Badge type="info" text="int" />

任务执行失败时的最大重试次数

## 插件：OAuth2

### 环境变量配置

#### `OAUTH2_GITHUB_CLIENT_ID` <Badge type="info" text="str" />

GitHub 客户端 ID

#### `OAUTH2_GITHUB_CLIENT_SECRET` <Badge type="info" text="str" />

GitHub 客户端密钥

#### `OAUTH2_LINUX_DO_CLIENT_ID` <Badge type="info" text="str" />

Linux Do 客户端 ID

#### `OAUTH2_LINUX_DO_CLIENT_SECRET` <Badge type="info" text="str" />

Linux Do 客户端密钥

### 基础配置

#### `OAUTH2_FRONTEND_REDIRECT_URI` <Badge type="info" text="str" />

登陆成功后，重定向到前端的地址

## 插件：Code Generator

### 基础配置

#### `CODE_GENERATOR_DOWNLOAD_ZIP_FILENAME` <Badge type="info" text="str" />

下载代码压缩包时的文件名称
