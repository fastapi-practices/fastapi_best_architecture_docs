---
title: Service
---

::: tip
When writing the Service layer, have AI first read the architecture and coding style references in <FbaSkillInstall /> so business logic does not sink into CRUD and request validation or response building does not leak into Service.
:::

The Service layer is the middle of the fba three-layer architecture: it receives calls from the API layer, orchestrates the CRUD layer, and owns business logic, data processing, and exception handling.

## Responsibility Boundaries

| Concern | Layer | Notes |
|-------|-------|-------|
| Routing, dependency declarations, parameter binding | API | Keep route handlers thin |
| Request/response data structures | Schema | Pydantic models |
| Business logic, business validation, orchestration | Service | This page |
| Database reads and writes | CRUD | Returns ORM objects, scalars, or Select objects |
| ORM table definitions | Model | SQLAlchemy models |

In short: the API layer only receives and returns, the Service layer only decides and organizes, and the CRUD layer only stores and loads data.

::: warning
Do not call the CRUD layer directly from the API layer. Bypassing Service scatters business validation, cache invalidation, and exception semantics across route handlers.
:::

## Directory Structure

::: file-tree

- backend # Backend
    - app # Application
        - admin # Admin system
            - service # Service
                - dept_service.py # Department service
                - user_service.py # User service
                - ...
            - crud # CRUD
            - model # Model
            - schema # Data transfer
            - api # API
        - ...
    - ...

:::

## Naming Conventions

- File name: `xxx_service.py`
- Class name: `XxxService`
- Instance: export a singleton at the bottom of the service module and import it directly in the API layer

```python
dept_service: DeptService = DeptService()
```

Service, Schema, CRUD, and Model share the same stem, for example `Dept` maps to `dept.py`, `DeptService`, `CRUDDept`, `DeptSchemaBase`, and `sys_dept`.

## Method Naming

| Method | Purpose |
|-------|---------|
| `get_all()` | Get all |
| `get()` | Get detail |
| `get_list()` | Get list (paginated) |
| `create()` | Create |
| `update()` | Update |
| `delete()` | Delete |

Define methods in this order: get all → get detail → get list → create → update → delete.

## Method Signature

Service methods always use keyword-only arguments and declare types.

```python
from sqlalchemy.ext.asyncio import AsyncSession


class DeptService:
    """Department service class"""

    @staticmethod
    async def get(*, db: AsyncSession, pk: int) -> Dept:
        """
        Get department detail

        :param db: Database session
        :param pk: Department ID
        :return:
        """
        ...
```

::: tip
Use `@staticmethod` when the method does not depend on instance state. Use an instance method and call sibling methods through `self` when it does.
:::

## Examples

### Get Detail

Validate the result and raise a custom exception when the resource does not exist.

```python
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_dept import dept_dao
from backend.app.admin.model import Dept
from backend.common.exception import errors
from backend.common.i18n import t


class DeptService:
    """Department service class"""

    @staticmethod
    async def get(*, db: AsyncSession, pk: int) -> Dept:
        """
        Get department detail

        :param db: Database session
        :param pk: Department ID
        :return:
        """
        dept = await dept_dao.get(db, pk)
        if not dept:
            raise errors.NotFoundError(msg=t('error.dept.not_found'))
        return dept
```

### Paginated List

Pagination is organized in the service layer: ask CRUD for the query expression, then hand it to `paging_data()`.

```python
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_user import user_dao
from backend.common.pagination import paging_data


class UserService:
    """User service class"""

    @staticmethod
    async def get_list(*, db: AsyncSession, dept: int, username: str, status: int) -> dict[str, Any]:
        """
        Get user list

        :param db: Database session
        :param dept: Department ID
        :param username: Username
        :param status: Status
        :return:
        """
        user_select = await user_dao.get_select(dept=dept, username=username, status=status)
        return await paging_data(db, user_select)
```

### Create

Business validation before creation (uniqueness, referenced records) belongs to the Service layer.

```python
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_dept import dept_dao
from backend.app.admin.schema.dept import CreateDeptParam
from backend.common.exception import errors
from backend.common.i18n import t


class DeptService:
    """Department service class"""

    @staticmethod
    async def create(*, db: AsyncSession, obj: CreateDeptParam) -> None:
        """
        Create department

        :param db: Database session
        :param obj: Department creation params
        :return:
        """
        if await dept_dao.get_by_name(db, obj.name):
            raise errors.ConflictError(msg=t('error.dept.name_exists'))
        if obj.parent_id is not None and not await dept_dao.get(db, obj.parent_id):
            raise errors.NotFoundError(msg=t('error.dept.parent_not_found'))
        await dept_dao.create(db, obj)
```

### Update and Delete

Update returns the number of affected rows, and the API layer decides whether to report success or failure. Relation checks before deletion also belong to the Service layer.

```python
class DeptService:
    """Department service class"""

    @staticmethod
    async def delete(*, db: AsyncSession, pk: int) -> int:
        """
        Delete department

        :param db: Database session
        :param pk: Department ID
        :return:
        """
        dept = await dept_dao.get_join(db, pk)
        if not dept:
            raise errors.NotFoundError(msg=t('error.dept.not_found'))
        if dept.users:
            raise errors.ConflictError(msg=t('error.dept.has_users'))
        children = await dept_dao.get_children(db, pk)
        if children:
            raise errors.ConflictError(msg=t('error.dept.has_children'))
        count = await dept_dao.delete(db, pk)
        return count
```

## Exceptions and i18n

Business exceptions use the custom exception classes in `backend/common/exception/errors.py`. The global exception handler converts them into the standard response.

```python
from backend.common.exception import errors
from backend.common.i18n import t

raise errors.NotFoundError(msg=t('error.dept.not_found'))
raise errors.ConflictError(msg=t('error.dept.name_exists'))
```

::: tip
Do not hard-code exception text in core code. Use `t()` to read it from the language packs in `backend/locale`, and add every new key to both `zh-CN.yml` and `en-US.json`.
:::

Common exception classes:

| Exception | When |
|-----------|------|
| `RequestError` | Request params or business conditions are not satisfied |
| `NotFoundError` | The resource does not exist |
| `ConflictError` | Resource conflict, such as uniqueness or occupancy |
| `ForbiddenError` | No permission |
| `AuthorizationError` | Authenticated but the current state does not allow the operation |
| `TokenError` | Invalid or expired token |

## Transactions

Transaction boundaries are declared by the API layer through session dependencies, so the Service layer does not open a transaction again.

| Session dependency | Usage |
|-----------|-------|
| `CurrentSession` | Read-only endpoints, use it directly |
| `CurrentSessionTransaction` | Create, update, delete, and other writes, committed or rolled back automatically in function scope |

```python
from backend.database.db import CurrentSession, CurrentSessionTransaction
```

::: warning
Only use `async with async_db_session.begin() as db:` when a service or task must open its own transaction boundary.
:::

## Cache Invalidation

Cache reads are handled by the `cache()` dependency in the API layer. After a successful write, clear the business cache explicitly in the Service layer.

```python
from backend.app.admin.utils.cache import user_cache_manager

count = await user_dao.update(db, user.id, obj)
await user_cache_manager.clear([user.id])
return count
```

See [Cache](./cache.md) for more details.

## Background Tasks

Dispatching background tasks that belong to a business workflow belongs in the Service layer, not in the route handler.

```python
from backend.app.task.tasks.tasks import task_demo_params

task_demo_params.delay(hello='hello', world='world')
```

Tasks are defined under `backend/app/task/tasks` and registered with the `celery_app.task` decorator.

See [Celery](./celery.md) for more details.

## Common Anti-patterns

| Anti-pattern | Problem | Correct approach |
|-----|------|---------|
| Calling `xxx_dao.get()` directly in the API layer | Bypasses business validation and cache invalidation | API → Service → CRUD |
| Building `Select` filters in the Service layer | Query details leak into the business layer | Push filters down to the CRUD `get_select()` |
| Assembling HTTP response payloads in the Service layer | Couples the response contract to business logic | Use `response_base.success()` in the API layer |
| Passing `CreateXxxParam` straight through to the Service | Couples the Service to the request model | Unpack params in the API layer before calling the Service |
