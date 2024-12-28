---
title: 代码生成
---

> [!TIP]
> 当前版本仅包含后端代码生成，代码生成器使用 api 调用实现，设计可能存在缺陷，相关问题请直接提交 issues

> [!WARNING]
> api 调用无法直观的预览代码生成结果，它必须配合前端项目使用，查看 [效果预览](#效果预览)

## 概念

代码生成包含【业务】和【模型】两个模块

### 业务

包含代码生成的相关配置，详情查看：`generator/model/gen_business.py`

### 模型

包含代码生成所需要的模型列信息，就像正常定义模型列一样，目前支持的功能有限

## 工作模式

目前包含两种工作模式，分别为手动和自动，手动已被标记为弃用，推荐使用自动模式

### 手动

1. 通过创建业务接口手动添加一项业务数据
2. 通过模型创建接口手动添加模型列
3. 访问 `preview`（预览）、`generate`（磁盘写入）、`download`（下载）接口

### 自动

1. 访问 `tables` 接口，自动获取数据库表名列表
2. 访问 `import` 接口，导入数据库已有的数据库表，自动创建业务表数据和模型表数据
3. 访问 `preview`（预览）、`generate`（磁盘写入）、`download`（下载）接口

## 效果预览

::: details Arco Desgin Vue
![cg1](/images/code-generator1.png)

![cg2](/images/code-generator2.png)

![cg3](/images/code-generator3.png)
:::
