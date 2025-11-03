---
title: 事务
---

默认情况下，如果将数据库引擎参数 `echo` 设置为 True，你将会看到事务总是被开启，即便那是一个查询语句。但这并不是因为我们错误的使用了
SQLAlchemy，你可以查看 [#6921](https://github.com/sqlalchemy/sqlalchemy/discussions/6921)、[#12782](https://github.com/sqlalchemy/sqlalchemy/discussions/12782)
了解详情

::: details 简要总结
任何遵循 [PEP-429](https://peps.python.org/pep-0249) 进行设计的 Python 数据库连接器或 ORM，都将默认开启事务

在 SQLAlchemy 中，你可以选择不使用它自身的事务模式，但这需要将数据库本身的事务隔离级别设置为 `AUTOCOMMIT`
，详情请查看: [了解 DBAPI 级别的 Autocommit 隔离级别](https://docs.sqlalchemy.org.cn/en/20/core/connections.html#understanding-the-dbapi-level-autocommit-isolation-level)
:::

## CurrentSession

这是一种类似于官方文档的使用方法，但这种方法并没有真正开启事务，它通常仅用于查询操作

```python
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """获取数据库会话"""
    async with async_db_session() as session:
        yield session
        
# Session Annotated
CurrentSession = Annotated[AsyncSession, Depends(get_db)]
```

这种方法通常直接应用于接口函数，在 session 应用方面，它被认为是线程安全的

```python
@router.get('')
async def get_pagination_apis(db: CurrentSession) -> ResponseModel:
    ...
```

## CurrentSessionTransaction

与 `CurrentSession` 不同，此方法将直接自动开启事务，你可以将它用于增删改操作

```python
async def get_db_transaction() -> AsyncGenerator[AsyncSession, None]:
    """获取带有事务的数据库会话"""
    async with async_db_session.begin() as session:
        yield session

# Session Annotated
CurrentSessionTransaction = Annotated[AsyncSession, Depends(get_db_transaction)]
```

使用方法与 `CurrentSession` 相同

```python
@router.post('')
async def get_pagination_apis(db: CurrentSession) -> ResponseModel:
    ...
```

## `begin()`

这种方式由 SQLAlchemy 官方实现，在线程安全方面，由于在同一个函数中，可能存在多次调用，所以没有 `CurrentSession` 和
`CurrentSessionTransaction` 更加严谨，但此方式可以在任意地方使用

```python{2}
async def create(*, obj: CreateIns) -> None:
    async with async_db_session.begin() as db:
        await xxx_dao.create(db, obj)
```
