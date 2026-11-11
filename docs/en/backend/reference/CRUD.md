---
title: CRUD
---

::: tip
When writing the Service / CRUD layer, have AI first read the naming, coding style, and architecture references in <FbaSkillInstall /> so business logic does not sink into CRUD and query details do not leak into the API layer.
:::

In fba we use sqlalchemy-crud-plus as the database operation base class.
It is an advanced async CRUD SDK we built on SQLAlchemy 2.0 and works with any FastAPI + SQLAlchemy project.

<LinkCard
title="sqlalchemy-crud-plus"
description="Advanced async CRUD SDK built on SQLAlchemy 2.0"
href="https://github.com/fastapi-practices/sqlalchemy-crud-plus"
icon="https://wu-clan.github.io/picx-images-hosting/logo/fba.png"
/>

## Function Naming

fba follows these naming conventions:

- Get/query detail: `get()`
- Get/query detail by xxx: `get_by_xxx()`
- Get/query list expression: `get_select()`
- Get/query all: `get_all()`
- Join query: `get_join()`
- Subquery / children: `get_children()`
- Create: `create()`
- Bulk create: `bulk_create()`
- Update: `update()`
- Delete: `delete()`
- Bulk delete: `delete_all()`

::: tip
The CRUD layer relies on the capabilities provided by `sqlalchemy-crud-plus`, such as `select_model()`, `select_model_by_column()`, `select_models()`, `select_order()`, `update_model_by_column()`, and `delete_model_by_column()`
:::

::: tip
Paginated lists are usually organized in the service layer, where the method is named `get_list()`. It calls the CRUD layer's `get_select()` to build the query expression and then hands it to `paging_data()`. See [Pagination](./pagination.md) for details
:::

::: tip
How the Service layer calls the CRUD layer is described in [Service](./service.md)
:::
