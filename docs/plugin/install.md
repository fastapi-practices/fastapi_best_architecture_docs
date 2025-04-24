---
title: 安装使用
---

插件安装方式包含以下两种：

:::: tabs
@tab 1. 手动

1. 获取插件仓库源码并下载
2. 将源码中的插件目录直接拷贝到 fba 项目对应的目录下

   ::: tabs
   @tab 后端

   将插件源码 `backend/plugin/` 目录下的一级文件夹拷贝到 fba 项目 `backend/plugin/` 目录下

   @tab 前端

   暂无此计划...
   :::

3. 如果插件包含依赖（requirements.txt），执行 `backend/scripts/init_plugin.py` 文件安装依赖
4. 根据插件使用说明完成安装

@tab 2. 自动

1. 获取打包好的插件 zip 压缩包 <Badge type="warning" text="二选一" />

    - 下载插件 GitHub 仓库为 zip 压缩包

      ::: details 示例
      ![cg1](/images/plugin_zip.png)
      :::

    - 通过 fba 插件打包接口创建的 zip 压缩包

2. 将压缩包通过 fba 插件安装接口进行安装
3. 根据插件使用说明完成安装

::::

::: caution
无论采用哪种安装方式，fba 服务都不会实时热重载，您必须重新启动，插件功能才能被正确加载到 FastAPI 应用中

原因：

1. 实时热重载是非线程安全模式，它会影响正在处理中的任务
2. 插件可能包含环境变量配置，增加安全风险
3. 频繁热重载可能引发内存泄漏

:::
