---
title: 插件开发
---

## 后端

我们创建了一个插件模板仓库 [fba_plugin_template](https://github.com/fastapi-practices/fba_plugin_template)
用于插件开发，开发步骤参考如下：

:::: steps

1. clone 最新 fba 项目到本地并配置好开发环境
2. 根据插件模板的 [目录结构](#插件目录结构) 和其他配置说明进行插件开发
3. 完成插件开发
4. 创建插件仓库

   ::: warning
   使用插件模板仓库创建个人仓库，并将插件代码更新至个人仓库！请不要将插件代码以 PR 的方式进行提交！
   :::

   ::: note
   我们鼓励大家将插件源码进行开源，但并不强制，如果您的插件需要付费，则无需上传源码，但必须保留个人仓库，并添加相关付费说明
   :::

5. [申请发布插件](publish.md)

::::

### 插件分类

与插件相关的部分文档中，可能高频次出现以下两个词

- ==应用级插件=={.note}

  在 [项目结构](../guide/summary/intro.md#项目结构) 中，app
  目录下的一级文件夹被视为应用，此原理同样应用于插件系统。也就是说，如果插件被开发为应用，那么它们将会像应用一样被注入到系统中，我们称这类插件为【应用级插件】

- ==扩展级插件=={.note}

  与【应用级插件】相反，如果插件不被开发为应用，那么它们将被开发为 app 目录下已存在应用的扩展功能，并做为扩展 API
  被注入应用中，我们称这类插件为【扩展级插件】

### 插件目录结构

::: file-tree

- backend 固定目录
    - plugin 固定目录
        - xxx 插件名
            - api/ 接口，务必查看下方 [接口路由](#插件路由)
            - crud/ CRUD <Badge type="warning" text="非必须" />
            - model 模型 <Badge type="warning" text="非必须" />
                - \_\_init__.py 必须在此文件内导入所有模型类
                - …
            - schema/ 数据传输 <Badge type="warning" text="非必须" />
            - service/ 服务 <Badge type="warning" text="非必须" />
            - utils/ 工具包 <Badge type="warning" text="非必须" />
            - \_\_init__.py 作为 python 包保留 <Badge type="danger" text="必须" />
            - conf.py 常量配置 <Badge type="warning" text="非必须" />
            - plugin.toml 插件配置文件 <Badge type="danger" text="必须" />
            - README.md 插件使用说明 <Badge type="danger" text="必须" />
            - requirements.txt 依赖包文件 <Badge type="warning" text="非必须" />
              如果插件需要安装依赖，则为 <Badge type="danger" text="必须" />

:::

### 插件路由

如果插件符合插件开发的要求，则插件中的所有路由都将自动注入到 FastAPI 应用中，无需任何其他操作，但值得注意的是，启动时间可能会随着插件数量的递增而增加，因为
fba 会在启动前对所有插件进行解析

- 应用级插件

  插件路由应完全遵循 [路由结构](../guide/reference/router.md#路由结构) 进行定义

- 扩展级插件

  插件路由必须根据现有应用中的目录结构进行 1:1 复制，可参考 fba
  中的内置插件 [notice](https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend/plugin/notice/api)

### 插件配置

`plugin.toml` 是插件的配置文件，它必须存在，此配置文件需根据插件的属性进行定义

- 应用级插件

    ```toml
    # 应用配置
    [app]
    # 插件路由器版本，默认为 v1，可参考源码：backend/app/admin/api/router.py
    router = ['v1']
    ```

- 扩展级插件

    ```toml
    # 应用配置 
    [app]
    # 此插件属于哪个 app
    include = ''
    
    # api 配置
    # xxx 对应的是插件 api 目录下的接口文件名（不包含后缀）
    # 例如接口文件名为 notice.py，则 xxx 应该为 notice
    # 如果包含多个接口文件，则应存在多个相应的 api 配置
    [api.xxx]
    # 路由前缀，必须以 '/' 开头
    prefix = ''
    # 标签，用于接口文档
    tags = ''
    ```

## 前端

暂无此计划...
