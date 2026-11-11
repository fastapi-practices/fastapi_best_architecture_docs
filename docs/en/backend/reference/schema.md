---
title: schema
---

::: tip
When having AI generate request/response models, first reference <FbaSkillInstall /> to keep SchemaBase, Field(description=...), optional update fields, and camelCase response conventions consistent.
:::

In fba, Schema has been heavily customized. See: `backend\common\schema.py`

## Class Naming

Follow these naming conventions:

- Base schema: `XxxSchemaBase(SchemaBase)`
- Query params: `XxxQueryParam(SchemaBase)`
- Create params: `CreateXxxParam()`; user related params use `AddXxxParam()`
- Update params: `UpdateXxxParam()`
- Batch delete params: `DeleteXxxParam()`
- Detail query: `GetXxxDetail()`
- Detail query (relationship): `GetXxxWithRelationDetail()`
- Tree query: `GetXxxTree()`

## Field Definitions

- Do not set required field defaults to `...`. See: [Required fields](https://docs.pydantic.dev/latest/concepts/models/#required-fields)
- Add a `description` parameter to every field — it is very useful for API documentation

## CamelCase Responses

[**API response**](response.md#camelcase-responses){.read-more}
