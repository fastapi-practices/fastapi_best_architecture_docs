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
4. 常见插件仓库

   ::: warning
   使用插件模板仓库创建个人仓库，并将插件代码更新至个人仓库！请不要将插件代码以 PR 的方式进行提交！
   :::

   ::: note
   我们鼓励大家将插件源码进行开源，但并不强制，如果您的插件需要付费，则无需上传源码，但必须保留个人仓库，并添加相关付费说明
   :::

5. [申请发布插件](publish.md)

::::

### 插件目录结构

::: file-tree

- backend fba 目录
    - plugin fba 目录
        - xxx 插件名
            - api/ 接口，务必查看下方【插件接口附加说明】
            - crud/ CRUD
            - model 模型
                - \_\_init__.py 必须在此文件内导入所有模型类
                - …
            - schema/ 数据传输
            - service/ 服务
            - utils/ 工具包，如果插件无需独立工具，则无需此目录
            - \_\_init__.py 作为 python 包保留（必须项）
            - conf.py 常量配置，如果插件不需要独立常量配置，则无需此文件
            - plugin.toml 插件配置文件（必填项）
            - README.md 插件使用说明
            - requirements.txt 依赖包文件（非必须项）如果插件不需要安装额外依赖，则无需此文件

:::

### 插件接口

- 如果插件作为独立 app 发布（在 `backend/app` 目录下的应用，视为独立
  app），则插件路由应完全遵循 [路由结构](../guide/reference/router.md#路由结构) 进行定义
- 如果插件作为现有 app 扩展功能发布，则插件路由必须根据现有 app 中的路由结构进行 1:1 结构复制，可参考 fba
  源码中的内置插件 [notice](https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend/plugin/notice/api)

### 插件路由

如果插件符合插件开发的要求，则插件的所有路由都将自动注入到 FastAPI 应用中，无需任何其他操作，但值得注意的是，启动时间可能会随着插件数量的递增而增加，因为
fba 会在启动前对所有插件进行解析

### 插件配置

`plugin.toml` 是插件的配置文件，它必须存在，此配置文件根据插件的属性进行定义

- 非独立 app

    ```toml
    # app 配置 
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

- 独立 app

    ```toml
    # app 配置
    [app]
    # 插件路由器版本，默认为 v1（可参考源码 `backend/app/admin/api/router.py`）
    router = ['v1']
    ```

## 前端

一旦 [Vben Admin Antd 下一代实施](https://github.com/fastapi-practices/fba_ui) 生产可用，我们将开启此计划...
