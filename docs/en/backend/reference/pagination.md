---
title: Pagination
---

fba wraps unified pagination on top of `fastapi-pagination`. The core implementation lives in `backend/common/pagination.py`.

## Offset Pagination

Offset pagination is suitable for common admin list pages. Add `DependsPagination` at the API layer and use `ResponseSchemaModel[PageData[XxxDetail]]` as the return type.

### Filter Parameter Models

Define filters in the Schema layer and bind them with a query parameter model.

```python
from pydantic import Field

from backend.common.schema import SchemaBase


class UserQueryParam(SchemaBase):
    """用户查询参数"""

    dept: int | None = Field(None, description='部门 ID')
    username: str | None = Field(None, description='用户名')
    phone: str | None = Field(None, description='手机号')
    status: int | None = Field(None, description='状态')
```

```python
from typing import Annotated

from fastapi import Query

from backend.app.admin.schema.user import UserQueryParam
from backend.common.pagination import DependsPagination, PageData
from backend.common.response.response_schema import ResponseSchemaModel, response_base
from backend.database.db import CurrentSession


@router.get(
    '',
    summary='分页获取用户',
    dependencies=[
        DependsPagination,
    ],
)
async def get_users_paginated(
    db: CurrentSession,
    query: Annotated[UserQueryParam, Query()],
) -> ResponseSchemaModel[PageData[GetUserInfoWithRelationDetail]]:
    page_data = await user_service.get_list(
        db=db,
        dept=query.dept,
        username=query.username,
        phone=query.phone,
        status=query.status,
    )
    return response_base.success(data=page_data)
```

When there are many filters, split them into multiple query models by responsibility and declare the models side by side in the route. FastAPI applies each model's defaults, field validators, and model validators independently. Parameters remain at the top level instead of being nested under `query` or `filters`. Header and cookie models follow the same rules.

`page` and `size` are provided by `DependsPagination` and should not be duplicated in the business query model.

`DependsPagination` provides the following query parameters by default:

| Parameter | Default | Description |
|------|-----|-----------|
| page | 1 | Page number, minimum 1 |
| size | 20 | Page size, maximum 200 |

The response includes:

| Field | Description |
|-------------|---------|
| items | Current page data list |
| total | Total number of records |
| page | Current page number |
| size | Page size |
| total_pages | Total number of pages |
| links | Pagination links |

## Service / CRUD

The Service layer usually calls the CRUD layer to obtain a SQLAlchemy `Select` object, then generates paginated data with `paging_data()`.

```python
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_user import user_dao
from backend.common.pagination import paging_data


class UserService:
    """用户服务类"""

    @staticmethod
    async def get_list(
        *,
        db: AsyncSession,
        dept: int | None,
        username: str | None,
        phone: str | None,
        status: int | None,
    ) -> dict[str, Any]:
        user_select = await user_dao.get_select(
            dept=dept,
            username=username,
            phone=phone,
            status=status,
        )
        return await paging_data(db, user_select)
```

## Cursor Pagination

Cursor pagination is suitable for infinite scroll, conversation lists, and other scenarios that continue loading based on a cursor. Use `DependsCursorPagination` at the API layer and `ResponseSchemaModel[CursorPageData[XxxDetail]]` as the return type.

```python
from backend.common.pagination import CursorPageData, DependsCursorPagination
from backend.common.response.response_schema import ResponseSchemaModel, response_base
from backend.database.db import CurrentSession


@router.get(
    '',
    summary='游标分页获取会话',
    dependencies=[
        DependsCursorPagination,
    ],
)
async def get_conversations(
    db: CurrentSession,
) -> ResponseSchemaModel[CursorPageData[GetAIConversationListDetail]]:
    page_data = await conversation_service.get_list(db=db)
    return response_base.success(data=page_data)
```

Cursor pagination responses include:

| Field | Description |
|-------------|----------|
| items | Current page data list |
| next_cursor | Cursor for the next page |
| has_more | Whether more data is available |
