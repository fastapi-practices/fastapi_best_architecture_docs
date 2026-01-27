---
title: 插件安装
---

## 后端

:::: tabs
@tab CLI

1. 通过在命令行输入 `fba add -h` 获取相关信息
2. 通过 `fba add` 命令进行安装
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

@tab GIT

1. 获取插件 git 仓库地址，理论上支持任何平台（GitHub、Gitlab、Gitee、Gitea...）
2. 通过 fba git 插件安装接口进行安装
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

@tab ZIP

1. 获取打包好的插件 zip 压缩包 <Badge type="warning" text="二选一" />

    - 下载插件仓库为 zip 压缩包

      ::: details GitHub 示例
      ![zip](/images/plugin_zip.png)
      :::

    - 通过 fba 插件下载接口下载的 zip 压缩包

2. 将 zip 压缩包通过 fba zip 插件安装接口进行安装
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

@tab 手动

1. 获取插件仓库源码并下载
2. 将下载的源码文件夹直接拷贝到 `backend/plugin` 目录下
3. 根据插件说明（README.md）进行相关配置
4. 重启服务

::::

::: warning 私有仓库
对于私有仓库，需要将 Token 嵌入 URL 中进行认证：`https://<TOKEN>@github.com/username/private-repo.git`
:::

## 前端

1. 获取插件仓库源码并下载
2. 将下载的源码文件夹直接拷贝到 `apps/web-antd/src/plugins` 目录下
3. 重启服务
