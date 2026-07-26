---
title: CORS
---

When integrating frontend and backend projects or deploying to a server, you will often hit cross-origin issues. Just open `backend/core/conf.py` and update the `CORS_ALLOWED_ORIGINS` setting to resolve CORS-related problems.

## Local

```py
CORS_ALLOWED_ORIGINS: list[str] = [
        'http://localhost:5173',  # Frontend access URL, without trailing '/'
    ]
```

## Server

::: code-tabs
@tab <Icon name="arcticons:http-custom" />HTTP

```py
# [!code word:http]
CORS_ALLOWED_ORIGINS: list[str] = [
      'http://server-ip:port',  # Frontend access URL, without trailing '/'. When the port is 80, omit the port.
  ]
```

@tab <Icon name="ic:outline-https" /> HTTPS

```py
# [!code word:https]
CORS_ALLOWED_ORIGINS: list[str] = [
      'https://domain',  # Frontend access URL, without trailing '/'
  ]
```

:::

## LAN

This depends on whether the frontend project is configured for LAN access.

```py
CORS_ALLOWED_ORIGINS: list[str] = ['*']
```
