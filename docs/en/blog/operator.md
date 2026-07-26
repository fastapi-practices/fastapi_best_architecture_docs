---
title: How to Add Operator Info in FastAPI
createTime: 2024-12-13 12:15
tags:
  - FastAPI
permalink: /blog/fbmjk8ke/
---

In common admin systems you often see fields like created-by and updated-by. How are they implemented? Below is how we integrate operator info in fba.

## How to Integrate?

Open the fba project and go to `backend/common/model.py`. You will see the `UserMixin` class sitting there coldly — fba does not use it; it is only reserved:

```python
class UserMixin(MappedAsDataclass):
    """User Mixin dataclass"""

    created_by: Mapped[int] = mapped_column(sort_order=998, comment='Creator')
    updated_by: Mapped[int | None] = mapped_column(init=False, default=None, sort_order=998, comment='Updater')
```

## How to Use?

First, `UserMixin` stores only the user id — a common approach. Then: how do I get the user id and store it? And when showing in the admin UI, I surely cannot display raw ids? Let's answer one by one.

## How to Get the User ID?

fba stores user info in each request's context via JWT middleware. You can easily read user info from the request object (in Django, Flask, and similar web frameworks, request is always present).

## How to Store?

### Manual

In the route function, accept a `request` parameter, preferably typed as `request: Request`. Then get the current operator id via `request.user.id` and pass it for storage.

To simplify further, you can also store using `ctx.user_id` directly.

### Automatic

With SQLAlchemy event listeners, this is easy.

First adjust `UserMixin`:

```python{4}
class UserMixin(MappedAsDataclass):
    """User Mixin dataclass"""

    created_by: Mapped[int] = mapped_column(init=False, sort_order=998, comment='Creator')
    updated_by: Mapped[int | None] = mapped_column(init=False, default=None, sort_order=998, comment='Updater')
```

Then add these listeners at the bottom of `backend/common/model.py`:

```python
@event.listens_for(UserMixin, 'before_insert', propagate=True)
def _inject_created_by(mapper, connection, target) -> None:  # noqa: ANN001
    user_id = ctx.user_id
    if user_id is None:
        return
    if hasattr(target, 'created_by') and target.created_by is None:
        target.created_by = ctx.user_id


@event.listens_for(Session, 'do_orm_execute', propagate=True)
def _inject_updated_by(orm_execute_state: ORMExecuteState) -> None:
    if (
        orm_execute_state.is_update
        and orm_execute_state.is_orm_statement
        and orm_execute_state.statement.is_update
        and orm_execute_state.bind_mapper.c.get('updated_by') is not None
    ):
        orm_execute_state.statement = orm_execute_state.statement.values(updated_by=ctx.user_id)
```

::: warning
The before_insert event needs `flush()` to fire!

Event listener conditions are strict. If listeners do not run as expected, see: [sqlalchemy#12724](https://github.com/sqlalchemy/sqlalchemy/discussions/12724)
:::

## How to Display?

Of course not as raw ids. What then? Although we only store user ids in the database, on single or list queries we intercept data and replace ids with usernames.

That raises another question: where does username come from? Querying the database for every id on each request would add a lot of IO. Instead, cache all user id → username mappings in Redis at points such as after registration or when loading the user list, then read cache for replacement.

## Would Storing username Directly Be Better?

You can. Change `UserMixin` to store a string and save via `request.user.username`. Queries then return usernames directly with no replacement.

## What Should You Store?

Use id or username depending on the business. If you always need the latest user info and want to avoid updating all historical data after a username change, use id. If username is unique and you need historical traces, store username directly.
