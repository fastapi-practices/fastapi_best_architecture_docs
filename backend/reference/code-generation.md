---
url: /fastapi_best_architecture_docs/backend/reference/code-generation.md
---
> \[!WARNING]
> API 调用无法直观的预览代码生成结果，它必须配合前端项目使用，请查看查看 [效果预览](#效果预览)

## 概念

代码生成包含【业务】和【模型】两个模块

### 业务

包含代码生成的相关配置，详情请查看：`backend/app/generator/model/gen_business.py`

### 模型

包含代码生成所需要的模型列信息，就像正常定义模型列一样，目前支持的功能有限

## 工作模式

目前包含两种工作模式，分别为手动和自动

### 手动

::: tip
此方法适用于直接通过前端定义数据库表和列
:::

1. 通过创建业务接口手动添加一项业务数据
2. 通过模型创建接口手动添加模型列
3. 访问 `preview`（预览）、`generate`（磁盘写入）、`download`（下载）接口

### 自动

::: tip
此方法适用于已在数据库中定义好数据库表和列
:::

1. 访问 `tables` 接口，自动获取数据库表名列表
2. 访问 `import` 接口，导入数据库已有的数据库表，自动创建业务数据和模型列数据
3. 访问 `preview`（预览）、`generate`（磁盘写入）、`download`（下载）接口

## 效果预览

![cg1](/images/code-generator1.png)

![cg2](/images/code-generator2.png)
