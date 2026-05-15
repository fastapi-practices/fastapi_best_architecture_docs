---
url: /fastapi_best_architecture_docs/backend/reference/data-permission.md
---
数据权限是为了给数据添加权限而建立的，我们最常见的实现方案是仅本人数据，本部门数据...
这些就是所谓的数据权限，你可以控制不同的角色拥有不同的数据权限，从而实现用户和数据的隔离

## 常见方案

::: caution
fba 已删除此集成方式，此代码仅作为示例保留
:::

@[code python](../../code/data_perm.py)

### 弊端

我们常见的这种数据权限，在大多数情况下，也能够满足日常场景所需，但是，这种方式存在严重的弊端。由于数据权限的数据过滤是通过
SQL 语句拼接进行实现的，而这些固定权限，直接写死了数据权限的要求

例如：业务表必须包含 dept\_id 和 created\_by 字段，如果业务表没有这些字段，你就无法通过 SQL 来控制数据权限

## 内置方案

fba 内置了一套灵活的数据权限方案，通过数据范围（DataScope）+ 数据规则（DataRule）的组合，实现动态、可配置的数据过滤，无需业务表满足特定字段要求

### 架构设计

数据权限通过以下关系链实现：

```
用户 → 角色 → 数据范围 → 数据规则
```

### 数据范围

数据范围（DataScope）是数据规则的逻辑分组，一个数据范围可以包含多条数据规则

### 数据规则

数据规则（DataRule）定义具体的过滤条件，每条规则由模型、字段、运算符、表达式和值组成

### 模板变量

为了适应动态场景，数据规则支持模板变量，在运行时自动解析为实际值

#### 模型模板变量

用于数据规则的 `model` 字段

| 变量        | 说明     |
|-----------|--------|
| `__ALL__` | 匹配所有模型 |

#### 字段模板变量

用于数据规则的 `column` 字段

| 变量               | 说明                          |
|------------------|-----------------------------|
| `__dept_id__`    | 部门 ID（解析为模型的 `dept_id` 字段）  |
| `__created_by__` | 创建者（解析为模型的 `created_by` 字段） |

#### 值模板变量

用于数据规则的 `value` 字段

| 变量           | 说明          |
|--------------|-------------|
| `${user_id}` | 当前登录用户 ID   |
| `${dept_id}` | 当前登录用户部门 ID |
| `${now}`     | 当前时间        |

### 使用

#### 接口依赖注入

通过 `DataPermissionFilter` 类在接口中注入数据权限过滤条件，传入需要进行数据过滤的模型类

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

#### CRUD 数据过滤

在 CRUD 层中，将 `data_filter` 作为查询过滤条件传入

```python
async def get_all(
    self,
    db: AsyncSession,
    data_filter: ColumnElement[bool],  # [!code highlight]
    ...
) -> Sequence[Dept]:
    return await self.select_models_order(db, 'sort', 'asc', data_filter, **filters)
```

### 过滤流程

```
用户请求 API
    ↓
FastAPI 解析 Depends(DataPermissionFilter)
    ↓
filter_data_permission() 执行
    ├── 超级管理员 → 无过滤，查看所有数据
    ├── 角色 is_filter_scopes=False → 无过滤
    ├── 无数据规则 → 无过滤
    └── 存在数据规则 → 构建 SQLAlchemy 条件
        ├── 解析模型模板变量（__ALL__ 等）
        ├── 解析字段模板变量（__dept_id__ 等）
        ├── 解析值模板变量（${user_id} 等）
        ├── 根据表达式构建条件（==, !=, >, in 等）
        └── 根据运算符组合条件（AND / OR）
    ↓
返回 ColumnElement[bool] 过滤条件
    ↓
CRUD 层使用过滤条件查询数据库
```
