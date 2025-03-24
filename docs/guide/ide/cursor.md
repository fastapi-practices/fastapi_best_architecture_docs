---
title: cursor
---

官网地址：[cursor](https://www.cursor.com/)

## 规则

我们在 cursor 中为 fba 量身打造了特定规则，它们可有效地帮助您生成高质量且符合规范的代码，如果您有更好的案例，请通过
Discord 社区与我们分享吧 🤗

::: warning
我们未对规则进行 token 消耗量测试，请根据实际情况自行选择
:::

首先，在 fba 根目录创建 `.cursor/rules` 目录，然后添加以下规则：

### Python 编码规范

::: note
此规则也可用于其他 Python 3.10+ 项目
:::

`python-code-standards.mdc`

@[code mdc](../../code/python-code-standards.mdc)

### FastAPI 特定规范

::: tip
此规则特定于 fba，不建议您将它用于其他 FastAPI 项目
:::

`fastapi-specific-standards-for-fba.mdc`

@[code mdc](../../code/fastapi-specific-standards-for-fba.mdc)