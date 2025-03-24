---
title: JWT
---

我们编写了自定义的 JWT 授权中间件，使其可以在每次请求发起时，自动调用此中间件实现自动授权，并且，通过 Redis 和 Rust
库对用户信息进行缓存和解析，使其性能影响尽可能降到最低

@[code python](../../code/jwt.py)

## Token

内置 token 授权方式遵循 [rfc6750](https://datatracker.ietf.org/doc/html/rfc6750)，如果您想通过自定义请求头添加 token
进行授权，可以查看文章 [Header Token](../../planet.md#fastapi)

## 验证码登录

你可以通过此方式获取 token，在大多数情况下，这更适用于配合前端实现登录授权

我们在 fba 中使用 [fast_captcha](https://github.com/wu-clan/fast-captcha) 生成 base64 验证码，然后通过接口进行数据返回；您可以通过在线
base64 转图片或配合前端项目将其转为图片进行预览，以下使其工作流程：

```sequence 验证码登录逻辑
actor 客户端
客户端 ->> 路由: GET<br/>/api/v1/auth/captcha
路由 ->> 频率限制器: 校验请求频率
频率限制器 -->> 路由: 允许
路由 ->> fast_captcha: 生成随机验证码
fast_captcha ->> Redis: 缓存验证码
客户端 ->> 路由: POST<br/>/api/v1/auth/login
路由 ->> 频率限制器: 校验请求频率
频率限制器 -->> 路由: 允许
路由 ->> 用户名: 校验用户名是否在系统中存在
用户名 -->> 路由: 通过
路由 ->> 验证码: 校验验证码（缓存和图片内容）
验证码 -->> 路由: 通过
路由 ->> Token: 生成 Token
Token -->> 客户端: 成功
```

## Swagger 登录

这是一种快捷的授权方式，仅用于调试目的，在服务启动后，进入 Swagger 文档，可通过此调试接口快速获取 token（无需验证码）

## OAuth 2.0

这种授权方式通常适用于第三方平台认证登录，第三方授权成功后，将依据第三方平台信息自动创建本地用户并自动授权登录，这一切都是用户无感知的

但是，想要使用此方式进行授权，你需要先了解 OAuth 2.0 相关知识，并遵循第三方平台认证要求，获取平台应用相关密钥，最终，手动编码完成集成

我们在 fba 中使用 [fastapi-oauth20](https://github.com/fastapi-practices/fastapi-oauth20) 集成 OAuth 2.0，您可以在代码路径
`backend/app/admin/api/v1/oauth2` 中查看我们的官方实现示例
