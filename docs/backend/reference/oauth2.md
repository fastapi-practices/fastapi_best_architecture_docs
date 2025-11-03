---
title: OAuth 2.0
---

我们在 fba 中使用 [fastapi-oauth20](https://github.com/fastapi-practices/fastapi-oauth20) 集成 OAuth 2.0，您可以在
`backend/plugin/oauth2` 目录中查看我们的官方实现示例

::: note
此授权方式适用于第三方平台认证登录，第三方授权成功后，将依据第三方平台信息自动创建本地用户并自动授权登录，用户只需同意第三方授权即可

但是，想要使用此方式进行授权，你需要先了解 OAuth 2.0 相关知识，并遵循第三方平台认证要求，获取第三方平台授权密钥，最终，手动编码完成集成
:::
