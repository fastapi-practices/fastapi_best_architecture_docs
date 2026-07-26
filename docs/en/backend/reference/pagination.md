---
title: Pagination
---

fba wraps unified pagination on top of `fastapi-pagination`. The core implementation lives in `backend/common/pagination.py`.

## Offset Pagination

Offset pagination is suitable for common admin list pages. Add `DependsPagination` at the API layer and use `ResponseSchemaModel[PageData[XxxDetail]]` as the return type.

```python
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
) -> ResponseSchemaModel[PageData[GetUserInfoWithRelationDetail]]:
    page_data = await user_service.get_list(db=db)
    return response_base.success(data=page_data)
```

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
    async def get_list(*, db: AsyncSession) -> dict[str, Any]:
        user_select = await user_dao.get_select(dept=None, username=None, phone=None, status=None)
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
