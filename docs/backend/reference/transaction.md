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

## Session 生成器

这是一种类似于官方文档的使用方法，但这种方法并没有真正达到事务的目的，因为它不会自动执行提交，所以，你可以将它理解为仅适用于查询，否则，必须手动执行
`commit()` 方法

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

## `begin()`

这种方式由 SQLAlchemy 官方实现，在线程安全方面，由于在同一个函数中，可能存在多次调用，所以没有 Session 生成器严谨

```python{2}
async def create(*, obj: CreateIns) -> None:
    async with async_db_session.begin() as db:
        await xxx_dao.create(db, obj)
```

## 如何选择？

以上两种方法，我们更推荐使用 `begin()`，理由如下：

1. 对于 fba 来说，它更加符合架构风格，并且也能减少千篇一律的接口参数（纯作者强迫症）
2. 而对于无需使用自动提交的事务，我们只需将 `begin()` 方法去掉，直接使用 `async_db_session()` 即可
