---
title: 跨域
---

当进行前后端项目联调或服务器部署时，你通常会遇到跨域问题，不过没关系，你只需修改后端配置，就可以轻松解决 CORS 相关问题

## 本地

进入 `core/conf.py` 文件，修改 `CORS_ALLOWED_ORIGINS` 配置即可

```py
CORS_ALLOWED_ORIGINS: list[str] = [
        'http://localhost:5173',  # 前端访问地址，末尾不要带 '/'
    ]
```

## 服务器

进入 `core/conf.py` 文件，修改 `CORS_ALLOWED_ORIGINS` 配置即可

1. 非 https 部署

    ```py
    # [!code word:http]
    CORS_ALLOWED_ORIGINS: list[str] = [
            'http://服务器ip:端口号',  # 前端访问地址，末尾不要带 '/'
        ]
    ```

2. https 部署

    ```py
    # [!code word:https]
    CORS_ALLOWED_ORIGINS: list[str] = [
            'https://域名',  # 前端访问地址，末尾不要带 '/'
        ]
    ```
