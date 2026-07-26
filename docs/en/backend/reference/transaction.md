---
title: Transactions
---

By default, if you set the database engine parameter `echo` to True, you will see that transactions are always opened — even for query statements. This is not because we misuse SQLAlchemy. See [#6921](https://github.com/sqlalchemy/sqlalchemy/discussions/6921) and [#12782](https://github.com/sqlalchemy/sqlalchemy/discussions/12782) for details.

::: details Brief summary
Any Python database connector or ORM designed around [PEP 249](https://peps.python.org/pep-0249/) usually opens transactions by default.

In SQLAlchemy you can choose not to use its own transaction mode, but that requires setting the database isolation level to `AUTOCOMMIT`. See: [Understanding the DBAPI-level Autocommit isolation level](https://docs.sqlalchemy.org/en/20/core/connections.html#understanding-the-dbapi-level-autocommit-isolation-level)
:::

## CurrentSession

This usage is close to the official FastAPI examples. It provides a normal database session, typically used for query operations.

```python
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """获取数据库会话"""
    async with async_db_session() as session:
        yield session
        
# Session Annotated
CurrentSession = Annotated[AsyncSession, Depends(get_db)]
```

This approach is usually applied directly to API functions. The session lifecycle is managed by dependency injection and is suitable for request-scoped database access.

```python
@router.get('')
async def get_pagination_apis(db: CurrentSession) -> ResponseModel:
    ...
```

## CurrentSessionTransaction

Unlike `CurrentSession`, this method automatically opens a transaction via `async_db_session.begin()`, making it suitable for create/update/delete operations.

```python
async def get_db_transaction() -> AsyncGenerator[AsyncSession, None]:
    """获取带有事务的数据库会话"""
    async with async_db_session.begin() as session:
        yield session

# Session Annotated
CurrentSessionTransaction = Annotated[AsyncSession, Depends(get_db_transaction)]
```

Usage is the same as `CurrentSession`:

```python
@router.post('')
async def create_api(db: CurrentSessionTransaction) -> ResponseModel:
    ...
```

## `begin()`

This approach is provided by SQLAlchemy and can be used anywhere — services, utility functions, and so on. Compared with request dependencies, you must control call boundaries yourself to avoid opening unnecessary transactions repeatedly in the same business flow.

```python{2}
async def create(*, obj: CreateIns) -> None:
    async with async_db_session.begin() as db:
        await xxx_dao.create(db, obj)
```
