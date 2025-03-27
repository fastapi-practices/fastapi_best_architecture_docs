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

- 不建议将必填字段默认值设置为 `...`，参考：[必填字段](https://docs.pydantic.dev/latest/concepts/models/#required-fields)
- 建议为所有字段至少添加 `description`，这对于 API 文档来说非常有用

## 驼峰返回

详见：[接口响应](response.md#驼峰返回)
