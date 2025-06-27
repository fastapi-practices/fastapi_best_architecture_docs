---
title: 插件安装
---

::: caution
切勿在线上环境直接安装插件，以免带来不必要的损失
:::

## 后端

:::: tabs
@tab 手动

1. 获取插件仓库源码并下载
2. 将下载的源码文件夹直接拷贝到 `backend/plugin` 目录下
3. 如果插件包含依赖（requirements.txt），执行 `backend/scripts/init_plugin.py` 文件安装依赖
4. 根据插件说明（README.md）进行相关配置
5. 重启服务

@tab ZIP

1. 获取打包好的插件 zip 压缩包 <Badge type="warning" text="二选一" />

    - 下载插件仓库为 zip 压缩包

      ::: details GitHub 示例
      ![zip](/images/plugin_zip.png)
      :::

    - 通过 fba 插件下载接口下载的 zip 压缩包

2. 将 zip 压缩包通过 zip 插件安装接口进行安装
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

@tab GIT

1. 获取插件 git 仓库地址，理论上支持任何平台（GitHub、Gitlab、Gitee、Gitea...）
2. 通过 git 插件安装接口进行安装
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

::::

::: warning
任意方式安装插件后，在重启 fba 服务前，务必检查插件内的 sqlalchemy model
文件（如果存在）中的主键模式是否与你当前正在使用的主键模式相匹配，参考：[切换主键](../backend/reference/pk.md)
:::

## 前端

1. 获取插件仓库源码并下载
2. 将下载的源码文件夹直接拷贝到 `apps/web-antd/src/plugins` 目录下
3. 重启服务
