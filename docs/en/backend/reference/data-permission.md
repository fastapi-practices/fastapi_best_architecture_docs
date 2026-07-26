---
title: Data Permission
---

Data permission is designed to attach permissions to data. Common implementations include "own data only", "department data only", and so on. These are data permissions. You can give different roles different data permissions to isolate users from data.

## Common Approaches

::: caution
fba has removed this integration. The code is kept only as an example.
:::

@[code python](../../code/data_perm.py)

### Drawbacks

This common style of data permission can cover many everyday scenarios, but it has serious drawbacks. Data filtering is implemented by concatenating SQL statements, and these fixed permissions hard-code the requirements.

For example, business tables must include `dept_id` and `created_by` fields. Without those fields, you cannot control data permission via SQL.

## Built-in Approach

fba includes a flexible data permission solution that combines DataScope and DataRule for dynamic, configurable data filtering — without requiring business tables to have specific fields.

### Architecture

Data permission is implemented through this relationship chain:

```
User → Role → DataScope → DataRule
```

### Data Scope

A DataScope is a logical group of data rules. One data scope can contain multiple data rules.

### Data Rule

A DataRule defines a concrete filter condition. Each rule consists of a model, column, operator, expression, and value.

### Template Variables

To support dynamic scenarios, data rules support template variables that are resolved to actual values at runtime.

#### Model Template Variables

Used in the data rule `model` field:

| Variable | Description |
|-----------|--------|
| `__ALL__` | Match all models |

#### Column Template Variables

Used in the data rule `column` field:

| Variable | Description |
|------------------|-----------------------------|
| `__dept_id__` | Department ID (resolved to the model's `dept_id` field) |
| `__created_by__` | Creator (resolved to the model's `created_by` field) |

#### Value Template Variables

Used in the data rule `value` field:

| Variable | Description |
|--------------|-------------|
| `${user_id}` | Current logged-in user ID |
| `${dept_id}` | Current logged-in user's department ID |
| `${now}` | Current time |

### Usage

#### API Dependency Injection

Inject data permission filter conditions into APIs via the `DataPermissionFilter` class, passing the model class that needs filtering:

```python
from backend.common.security.permission import DataPermissionFilter

@router.get('')
async def get_dept_tree(
    db: CurrentSession,
    data_filter: Annotated[ColumnElement[bool], Depends(DataPermissionFilter(Dept))],  # [!code highlight]
) -> ResponseSchemaModel[list[GetDeptTree]]:
    dept = await dept_service.get_tree(db=db, data_filter=data_filter, ...)
    return response_base.success(data=dept)
```

#### CRUD Data Filtering

In the CRUD layer, pass `data_filter` as a query filter condition:

```python
async def get_all(
    self,
    db: AsyncSession,
    data_filter: ColumnElement[bool],  # [!code highlight]
    ...
) -> Sequence[Dept]:
    return await self.select_models_order(db, 'sort', 'asc', data_filter, **filters)
```

### Filter Flow

```
User requests API
    ↓
FastAPI resolves Depends(DataPermissionFilter)
    ↓
filter_data_permission() runs
    ├── Super admin → no filter, view all data
    ├── Role is_filter_scopes=False → no filter
    ├── Data permission filtering enabled but no available rules → no visible data
    └── Rules exist → build SQLAlchemy conditions
        ├── Resolve model template variables (__ALL__, etc.)
        ├── Resolve column template variables (__dept_id__, etc.)
        ├── Resolve value template variables (${user_id}, etc.)
        ├── Build conditions by expression (==, !=, >, in, etc.)
        └── Combine conditions by operator (AND / OR)
    ↓
Return ColumnElement[bool] filter condition
    ↓
CRUD layer queries the database with the filter
```
