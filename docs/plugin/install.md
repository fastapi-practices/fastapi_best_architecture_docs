---
title: 插件安装
---

## 后端

::: warning
后端插件安装和卸载操作仅在开发环境可用，生产环境建议通过部署流程提前内置并验证插件
:::

:::: tabs
@tab CLI

1. 在后端项目根目录打开终端（确保已激活虚拟环境）
2. 输入 `fba add -h` 获取相关信息
3. 使用 ZIP 压缩包安装：`fba add --path /path/to/plugin.zip`
4. 使用 Git 仓库安装：`fba add --repo-url https://github.com/username/plugin.git`
5. 如不需要自动执行插件 SQL，添加 `--no-sql`
6. 根据插件说明（README.md）检查并修正自动追加的环境变量和相关配置
7. 重启服务

CLI 安装会自动安装插件依赖、同步插件模型表、执行匹配当前数据库和主键模式的初始化 SQL，并将插件 `.env.example` 追加到 `backend/.env`

@tab ZIP

1. 获取打包好的插件 zip 压缩包 <Badge type="warning" text="二选一" />
   - 下载插件仓库为 zip 压缩包

     ::: details GitHub 示例
     ![zip](/images/plugin_zip.png)
     :::

   - 通过 fba 插件下载接口下载的 zip 压缩包

2. 确认压缩包根目录内包含 `plugin.toml` 和 `README.md`
3. 将 zip 压缩包通过 fba zip 插件安装接口进行安装
4. 根据插件说明（README.md）检查并修正自动追加的环境变量和相关配置
5. 根据插件 SQL 说明完成数据库初始化
6. 重启服务

ZIP 文件名会作为插件目录名的来源，建议与插件名或仓库名保持一致，并避免使用短横线等不能作为 Python 包名的字符

@tab Git

1. 获取插件 Git 仓库地址
2. 通过 fba Git 插件安装接口或 `fba add --repo-url <repo-url>` 进行安装
3. 根据插件说明（README.md）检查并修正自动追加的环境变量和相关配置
4. 如果通过接口安装，根据插件 SQL 说明完成数据库初始化
5. 重启服务

@tab 手动

1. 获取插件仓库源码并下载
2. 将下载的源码文件夹拷贝到 `backend/plugin` 目录下（插件文件夹需要与仓库名保持一致）
3. 执行 `fba deps --plugin <plugin>` 安装插件依赖
4. 根据插件说明（README.md）添加环境变量和相关配置
5. 根据当前数据库类型和主键模式执行插件 `sql` 目录下对应的初始化脚本
6. 同步插件模型表或生成迁移文件
7. 重启服务

::::

::: warning
对于私有仓库，需要将 Token 嵌入 URL 中进行认证：`https://<TOKEN>@github.com/username/private-repo.git`
:::

## 前端

:::: tabs
@tab CLI

1. 在后端项目根目录打开终端（确保已激活虚拟环境）
2. 输入 `fba add -h` 获取相关信息
3. 使用 Git 仓库安装：`fba add --frontend --repo-url https://github.com/username/plugin_ui.git`
4. 按提示输入前端项目根路径
5. 根据插件说明（README.md）进行相关配置
6. 重启前端服务

前端插件 CLI 当前仅支持 Git 仓库安装，仓库名中的 `_ui` 后缀会在安装到本地插件目录时自动移除

@tab 手动

1. 获取插件仓库源码并下载
2. 将下载的源码文件夹拷贝到 `apps/web-antdv-next/src/plugins` 目录下（插件文件夹需要删除 `_ui` 后缀）
3. 根据插件说明（README.md）进行相关配置
4. 重启前端服务

::::
