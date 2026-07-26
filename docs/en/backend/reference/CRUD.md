---
title: CRUD
---

::: tip
When writing the Service / CRUD layer, have AI first read the naming, coding style, and architecture references in [fba skills](https://skills.sh/fastapi-practices/skills/fba) so business logic does not sink into CRUD and query details do not leak into the API layer.
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
- Get/query list: `get_list()`
- Get/query all: `get_all()`
- Join query: `get_with_join()`
- Relationship query: `get_with_relation()`
- Subquery / children: `get_children()`
- Create: `create()`
- Update: `update()`
- Delete: `delete()`
