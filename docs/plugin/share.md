---
title: 插件分享
---

## 后端

:::: steps

1. 创建个人插件仓库

   推荐使用插件模板仓库 [fba_plugin_template](https://github.com/fastapi-practices/fba_plugin_template) 创建个人插件仓库

   ::: warning 插件仓库命名规则
   `个人插件仓库名 == 插件名`

   假如你的个人插件仓库命名为 `sms`，安装此插件后，`backend/plugin` 目录下就会新增一个 `sms` 文件夹

   插件总是独一无二的，不允许安装同名插件，所以我们在对插件进行命名时，应尽量保持其独特性
   :::

   ![repo](/images/plugin_template.png)

2. 上传代码

   将在 fba 中开发好的所有插件代码拷贝到个人插件仓库中

   ::: caution
   应拷贝插件目录中的所有文件，而不是直接拷贝插件目录
   :::

::::

## 前端

:::: steps

1. 创建个人插件仓库

   使用插件模板仓库 [fba_ui_plugin_template](https://github.com/fastapi-practices/fba_ui_plugin_template) 创建个人插件仓库

   ::: warning 插件仓库命名规则
   `个人插件仓库名 == 插件名_ui`

   假如你的个人插件仓库命名为 `sms_ui`，安装此插件后，`apps/web-antd/src/plugins` 目录下就会新增一个 `sms` 文件夹

   插件总是独一无二的，不允许安装同名插件，所以我们在对插件进行命名时，应尽量保持其独特性
   :::

2. 上传代码

   将在 fba_ui 中开发好的所有插件代码拷贝到个人插件仓库中，==仅限 Vben Admin Antd 工程=={.warning}

   ::: caution
   应拷贝插件目录中的所有文件，而不是直接拷贝插件目录
   :::

::::

## 发布

我们创建了一个简易的 [插件市场](../market.md)，用于插件展示和导航

如果您开发的插件与 fba 兼容，欢迎在 Discord
社区的 [插件系统](https://discord.com/channels/1185035164577972344/1349951379560599572) 频道与我们分享
