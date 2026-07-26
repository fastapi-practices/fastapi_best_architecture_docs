---
title: Complete Guide to Pydantic Field Validation
createTime: 2026-1-18 22:30
tags:
  - Pydantic
permalink: /blog/cbvoejtq/
---

## Built-in Constraint Parameters

These are the most common simple constraints, passed directly to `Field`.

| Parameter | Description | Applicable types | Example |
|------------------|-------------------|--------------------------------|------------------------------|
| `min_length` | Minimum length | str, bytes, list, tuple, set, etc. | `Field(min_length=3)` |
| `max_length` | Maximum length | str, bytes, list, tuple, set, etc. | `Field(max_length=50)` |
| `pattern` | Regex match (same as regex) | str | `Field(pattern=r'^[a-z]+$')` |
| `gt` | Greater than | int, float, Decimal | `Field(gt=0)` |
| `ge` | Greater than or equal | int, float, Decimal | `Field(ge=18)` |
| `lt` | Less than | int, float, Decimal | `Field(lt=100)` |
| `le` | Less than or equal | int, float, Decimal | `Field(le=120)` |
| `multiple_of` | Must be a multiple of the value | int, float, Decimal | `Field(multiple_of=5)` |
| `min_items` | Minimum sequence items | list, tuple, set, etc. | `Field(min_items=1)` |
| `max_items` | Maximum sequence items | list, tuple, set, etc. | `Field(max_items=10)` |
| `strict` | Strict mode (no auto type coercion) | All types | `Field(strict=True)` |
| `max_digits` | Decimal max digits | Decimal | `Field(max_digits=10)` |
| `decimal_places` | Decimal places | Decimal | `Field(decimal_places=2)` |

## Constraint Types

A more declarative style, equivalent to the `Field` parameters above.

| Constraint | Description | Applicable types | Example |
|------------------|------------|----------------------|----------------------------------------|
| `Gt(value)` | Greater than value | int, float, Decimal | `Annotated[int, Gt(0)]` |
| `Ge(value)` | Greater than or equal to value | int, float, Decimal | `Annotated[int, Ge(18)]` |
| `Lt(value)` | Less than value | int, float, Decimal | `Annotated[int, Lt(100)]` |
| `Le(value)` | Less than or equal to value | int, float, Decimal | `Annotated[int, Le(120)]` |
| `Len(min, max)` | Length range | str, bytes, list, and other sequences | `Annotated[str, Len(3, 50)]` |
| `Pattern(regex)` | Regex match | str | `Annotated[str, Pattern(r'^[a-z]+$')]` |

Other common Annotated tools:

- `InstanceOf[T]`: check whether the value is an instance of a given class
- `SkipValidation`: skip validation (for already-trusted data)

## Custom Field Validators

| Type / approach | Mode options | Description | Example scenarios |
|-------------------------|-------------------------------------|-------------------|---------------|
| `@field_validator` | `after` (default), `before`, `plain`, `wrap` | Decorator style for one or more fields | Password hashing, complex format checks |
| `BeforeValidator(func)` | before | Functional: runs before parsing | Input preprocessing, None handling |
| `AfterValidator(func)` | after | Functional: runs after type validation | Business rule checks |
| `PlainValidator(func)` | plain | Functional: fully custom, skips built-in validation | Custom type parsing |
| `WrapValidator(func)` | wrap | Functional: most flexible; can manually call built-in validation | Complex logic, custom errors |

## Model-Level Validators

| Type | Mode options | Description | Example scenarios |
|--------------------|-------------------------|--------------|-------------|
| `@model_validator` | `after`, `before`, `wrap` | Cross-field validation for the whole model | Password confirmation, field dependency checks |

## Notes for Optional (Non-Required) Fields

Optional fields are usually defined like this:

```python
username: str | None = None
# or
username: str | None = Field(default=None, ...)
```

### Default Behavior

- **Built-in constraints**: fully skipped when the value is `None`; validated only when a non-`None` value is provided
- **Custom validators** (`@field_validator` or functional): by default **do not run** when the value is `None` or the default is used

### Common Pitfalls

1. Expecting `min_length=3` to error on `None` → it will not
2. Custom validators not firing, causing missed logic (especially when you want special handling for `None`)
3. Migrating from V1: V1 had `always=True`; V2 removed it

### Recommended Solutions

1. Most cases: use default behavior (recommended):
   ```python
   username: str | None = Field(None, min_length=3)
   ```

2. Need custom handling for `None` → use `WrapValidator` (most flexible):
   ```python
   from pydantic import WrapValidator

   def optional_validator(v: str | None, handler):
       if v is None:
           return None  # or raise ValueError("cannot be empty") / return "default"
       return handler(v)  # call built-in validation

   username: Annotated[str | None, WrapValidator(optional_validator)] = None
   ```

3. Force-validate defaults (use sparingly):
   ```python
   model_config = {"validate_default": True}
   ```

4. **Preprocess None** → use `BeforeValidator`:
   ```python
   def none_to_empty(v: str | None) -> str:
       return v or ""

   username: Annotated[str, BeforeValidator(none_to_empty), Field(min_length=1)] = ''
   ```

## Summary

Pydantic V2's validation system is powerful and flexible:

- Simple cases → built-in constraints + Annotated
- Complex logic → functional/decorator validators + Wrap mode
- Optional fields → default behavior is already smart; use WrapValidator for special cases
