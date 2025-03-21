---
title: schema
---

在 fba 中，我们为 Schema 进行了大量量身定制，详情请查看源代码：`backend\common\schema.py`

## 类定义

针对 schema 类，fba 遵循以下规范：

- 基础 schema: `XxxSchemaBase(SchemaBase)`
- 接口入参：`XxxParam(XxxSchemaBase)`
- 新增入参：`CreateXxxParam(XxxSchemaBase)`
- 更新入参：`UpdateXxxParam(XxxSchemaBase)`
- 查询详情：`GetXxxDetail(XxxSchemaBase)`
- 查询详情（包含关系）：`GetXxxWithRelationDetail(XxxSchemaBase)`

## Field

fba 内部暂未大量使用 Field，它后期可能被添加，但最也仅仅是将其用于添加描述，这很有助于接口文档字段说明，但也有可能因此
PR 改变计划
：[Allow to have multiple Query parameter models](https://github.com/fastapi/fastapi/pull/12944#pullrequestreview-2588580175)

## 驼峰返回

详见：[接口响应](response.md#驼峰返回)
