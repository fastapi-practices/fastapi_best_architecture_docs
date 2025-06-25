---
title: 跨域
---

当进行前后端项目联调或服务器部署时，你通常会遇到跨域问题，不过没关系，你只需进入 `core/conf.py` 文件，修改
`CORS_ALLOWED_ORIGINS` 配置即可，就可以轻松解决 CORS 相关问题

## 本地

```py
CORS_ALLOWED_ORIGINS: list[str] = [
        'http://localhost:5173',  # 前端访问地址，末尾不带 '/'
    ]
```

## 服务器

::: code-tabs
@tab <Icon name="arcticons:http-custom" />HTTP

```py
# [!code word:http]
CORS_ALLOWED_ORIGINS: list[str] = [
      'http://服务器ip:端口号',  # 前端访问地址，末尾不带 '/'，当端口号为 80 时，不要添加端口号
  ]
```

@tab <Icon name="ic:outline-https" /> HTTPS

```py
# [!code word:https]
CORS_ALLOWED_ORIGINS: list[str] = [
      'https://域名',  # 前端访问地址，末尾不带 '/'
  ]
```

:::

## 局域网

此方式取决于前端项目是否配置了局域网服务

```py
CORS_ALLOWED_ORIGINS: list[str] = ['*']
```

## 注意事项

::: warning
当将 `CORS_ALLOWED_ORIGINS` 配置为 `['*']` 时，socketio 将无法正常工作，这是由于它们的配置方式不同所导致的

这里有一个相关 PR: [python-engineio/pull/410](https://github.com/miguelgrinberg/python-engineio/pull/410)

虽然它已被合并，但是并没有发布新版本，截至目前，您需要在 `backend/common/socketio/server.py` 文件中修改以下内容：

`cors_allowed_origins=settings.CORS_ALLOWED_ORIGINS` -> `cors_allowed_origins='*'`
:::