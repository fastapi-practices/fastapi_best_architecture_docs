---
title: OAuth 2.0
---

In fba we integrate OAuth 2.0 with [fastapi-oauth20](https://github.com/fastapi-practices/fastapi-oauth20). You can find our official implementation example under `backend/plugin/oauth2`.

This authorization method is for third-party platform login. After third-party authorization succeeds, a local user is created automatically based on the third-party profile and logged in automatically. Users only need to approve the third-party authorization.

::: note
The built-in `oauth2` plugin already provides official examples for GitHub and Google. To integrate other OAuth 2.0 platforms, you still need to understand OAuth 2.0, follow the third-party platform requirements, obtain authorization credentials, and extend based on the built-in plugin.
:::
