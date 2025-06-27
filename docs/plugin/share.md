---
title: 插件分享
---

## 后端

:::: steps

1. 创建个人插件仓库

   使用插件模板仓库 [fba_plugin_template](https://github.com/fastapi-practices/fba_plugin_template)
   创建个人插件仓库，个人插件仓库命名请遵循以下规则：

   `个人插件仓库名 == 插件名`

   ::: warning
   创建个人插件仓库的时候，应将 `backend/plugin` 目录下的插件（文件夹）名作为仓库名使用

   插件总是独一无二的，不允许安装同名插件，所以我们在对插件进行命名时，应尽量保持其独特性
   :::

   ![repo](/images/plugin_template.png)

2. 上传代码

   将本地插件文件夹中的所有文件拷贝到个人插件仓库中

   ::: caution
   应拷贝插件文件夹中的所有文件，而不是直接拷贝插件目录
   :::

::::

## 前端

:::: steps

1. 创建个人插件仓库

   使用插件模板仓库 [fba_ui_plugin_template](https://github.com/fastapi-practices/fba_ui_plugin_template)
   创建个人插件仓库，个人插件仓库命名请遵循以下规则：

   `个人插件仓库名 == 插件名_ui`

   ::: warning
   创建个人插件仓库的时候，应将 `apps/web-antd/src/plugins` 目录下的插件（文件夹）名作为仓库名使用

   插件总是独一无二的，不允许安装同名插件，所以我们在对插件进行命名时，应尽量保持其独特性
   :::

2. 上传代码

   将本地插件文件夹中的所有文件拷贝到个人插件仓库中

   ::: caution
   应拷贝插件文件夹中的所有文件，而不是直接拷贝插件目录
   :::

::::

## 公开

我们为插件创建了一个 [插件市场](../market.md)，用于展示和导航

如果您开发的插件与 fba 兼容，欢迎在 Discord
社区的 [插件系统](https://discord.com/channels/1185035164577972344/1349951379560599572) 频道与我们分享

> [!IMPORTANT]
> 发布插件必须满足以下要求：
>
> - 提供插件 GitHub 仓库地址
> - 在插件仓库内提供至少一种您的（任意）联系方式用于技术支持
