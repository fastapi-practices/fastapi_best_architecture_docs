---
title: Pydantic 字段验证方法全解析
createTime: 2026-1-18 22:30
tags:
  - Pydantic
---

## 内置约束参数

这些是最常用的简单约束，直接在 `Field` 中传递

| 参数名              | 描述                | 适用类型                           | 示例用法                         |
|------------------|-------------------|--------------------------------|------------------------------|
| `min_length`     | 最小长度              | str, bytes, list, tuple, set 等 | `Field(min_length=3)`        |
| `max_length`     | 最大长度              | str, bytes, list, tuple, set 等 | `Field(max_length=50)`       |
| `pattern`        | 正则表达式匹配（等同 regex） | str                            | `Field(pattern=r'^[a-z]+$')` |
| `gt`             | 大于（greater than）  | int, float, Decimal            | `Field(gt=0)`                |
| `ge`             | 大于等于              | int, float, Decimal            | `Field(ge=18)`               |
| `lt`             | 小于                | int, float, Decimal            | `Field(lt=100)`              |
| `le`             | 小于等于              | int, float, Decimal            | `Field(le=120)`              |
| `multiple_of`    | 必须是指定值的倍数         | int, float, Decimal            | `Field(multiple_of=5)`       |
| `min_items`      | 序列最小元素数           | list, tuple, set 等             | `Field(min_items=1)`         |
| `max_items`      | 序列最大元素数           | list, tuple, set 等             | `Field(max_items=10)`        |
| `strict`         | 严格模式（禁止类型自动转换）    | 所有类型                           | `Field(strict=True)`         |
| `max_digits`     | Decimal 最大位数      | Decimal                        | `Field(max_digits=10)`       |
| `decimal_places` | Decimal 小数位数      | Decimal                        | `Field(decimal_places=2)`    |

## 约束类型

更声明式的写法，等价于上面的 `Field` 参数

| 约束标记             | 描述         | 适用类型                 | 示例用法                                   |
|------------------|------------|----------------------|----------------------------------------|
| `Gt(value)`      | 大于 value   | int, float, Decimal  | `Annotated[int, Gt(0)]`                |
| `Ge(value)`      | 大于等于 value | int, float, Decimal  | `Annotated[int, Ge(18)]`               |
| `Lt(value)`      | 小于 value   | int, float, Decimal  | `Annotated[int, Lt(100)]`              |
| `Le(value)`      | 小于等于 value | int, float, Decimal  | `Annotated[int, Le(120)]`              |
| `Len(min, max)`  | 长度范围       | str, bytes, list 等序列 | `Annotated[str, Len(3, 50)]`           |
| `Pattern(regex)` | 正则匹配       | str                  | `Annotated[str, Pattern(r'^[a-z]+$')]` |

其他常用 Annotated 工具：

- `InstanceOf[T]`：检查是否为指定类的实例
- `SkipValidation`：跳过验证（用于已信任数据）

## 自定义字段验证器

| 类型/方式                   | 模式（mode）选项                          | 描述                | 示例场景          |
|-------------------------|-------------------------------------|-------------------|---------------|
| `@field_validator`      | `after`（默认）、`before`、`plain`、`wrap` | 装饰器式，针对单个或多个字段    | 密码哈希、复杂格式检查   |
| `BeforeValidator(func)` | before                              | 函数式：在解析前运行        | 输入预处理、None 处理 |
| `AfterValidator(func)`  | after                               | 函数式：在类型验证后运行      | 业务规则检查        |
| `PlainValidator(func)`  | plain                               | 函数式：完全自定义，跳过内置验证  | 自定义类型解析       |
| `WrapValidator(func)`   | wrap                                | 函数式：最灵活，可手动调用内置验证 | 复杂逻辑、自定义错误    |

## 模型级验证器

| 类型                 | 模式（mode）选项              | 描述           | 示例场景        |
|--------------------|-------------------------|--------------|-------------|
| `@model_validator` | `after`、`before`、`wrap` | 针对整个模型的跨字段验证 | 密码确认、字段依赖检查 |

## 可选字段（非必填）的验证注意事项

可选字段通常这样定义：

```python
username: str | None = None
# 或
username: str | None = Field(default=None, ...)
```

### 默认行为

- **内置约束**：当值为 `None` 时，完全跳过约束检查；只有提供非 `None` 值时才验证
- **自定义验证器**（`@field_validator` 或函数式）：默认在值为 `None` 或使用默认值时**不运行**

### 常见坑点

1. 以为 `min_length=3` 会对 `None` 报错 → 其实不会
2. 自定义验证器不触发，导致逻辑遗漏（尤其是想对 `None` 做特殊处理时）
3. 从 V1 迁移：V1 有 `always=True`，V2 已移除

### 推荐解决方案

1. 大多数情况直接用默认行为（推荐）：
   ```python
   username: str | None = Field(None, min_length=3)
   ```

2. 想对 `None` 做自定义处理 → 用 `WrapValidator`（最灵活）：
   ```python
   from pydantic import WrapValidator

   def optional_validator(v: str | None, handler):
       if v is None:
           return None  # 或 raise ValueError("不能为空") / return "default"
       return handler(v)  # 调用内置验证

   username: Annotated[str | None, WrapValidator(optional_validator)] = None
   ```

3. 强制验证默认值（少用）：
   ```python
   model_config = {"validate_default": True}
   ```

4. **预处理 None** → 用 `BeforeValidator`：
   ```python
   def none_to_empty(v: str | None) -> str:
       return v or ""

   username: Annotated[str, BeforeValidator(none_to_empty), Field(min_length=1)] = ''
   ```

## 总结

Pydantic V2 的验证系统强大而灵活：

- 简单场景 → 内置约束 + Annotated
- 复杂逻辑 → 函数式/装饰器验证器 + Wrap 模式
- 可选字段 → 默认行为已很智能，需要特殊处理时用 WrapValidator
