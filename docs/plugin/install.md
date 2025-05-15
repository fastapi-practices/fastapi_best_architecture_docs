---
title: 快速开始
---

您可以将 [插件市场](./market.md) 中的插件通过以下方式进行安装：

:::: tabs
@tab 手动

1. 获取插件仓库源码并下载
2. 拷贝插件代码

   ::: tabs
   @tab 后端

   将下载的源码文件夹直接拷贝到 `backend/plugin` 目录下

   @tab 前端

   暂无此计划...
   :::

3. 如果插件包含依赖（requirements.txt），执行 `backend/scripts/init_plugin.py` 文件安装依赖
4. 根据插件说明（README.md）进行相关配置
5. 重启服务

@tab ZIP

1. 获取打包好的插件 zip 压缩包 <Badge type="warning" text="二选一" />

    - 下载插件仓库为 zip 压缩包，例如 GitHub

      ![zip](/images/plugin_zip.png)

    - 通过 fba 插件打包接口下载的 zip 压缩包

2. 将 zip 压缩包通过 zip 插件安装接口进行安装

   ::: warning
   通过插件仓库下载的 zip 压缩包可能带有分支名，例如：`aliyun_oss-master.zip`，目前 fba 仅自动处理 master、main、dev 分支名，如果
   zip 压缩包名中包含其他分支名，请自行手动删除
   :::

3. 根据插件说明（README.md）进行相关配置
4. 重启服务

@tab GIT

1. 获取插件 git 仓库地址，理论上支持任何平台（GitHub、Gitlab、Gitee、Gitea...）
2. 通过 git 插件安装接口进行安装
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

::::

::: caution
无论采用哪种安装方式，fba 服务都不会实时热重载，您必须重新启动，插件功能才能被正确加载到 FastAPI 应用中

原因：

1. 实时热重载是非线程安全模式，它会影响正在处理中的任务
2. 插件可能包含环境变量配置，增加安全风险
3. 频繁热重载可能引发内存泄漏

:::
