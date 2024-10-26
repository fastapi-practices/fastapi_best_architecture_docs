---
title: 事务
---

我们可以通过两种方式实现数据库事务

## session 生成器

这是官方一种比较流行的方法，通过迭代 session 控制隔离，并通过上下文异常进行回滚，最后关闭 session

这种方式应用于接口函数，通过依赖注入实现 session 传递，在 session 应用方面，它被认为是线程安全的

```py{3}
@router.get('')
async def get_pagination_apis(
  db: CurrentSession
) -> ResponseModel:
  ...
```

## `begin()`

这种方式由 SQLAlchemy 官方实现，相对第一种方式来说，更加原生，在线程安全方面，由于同一个接口中，可能存在多次调用，所以没有第一种方式更加严谨，
不过呢，对于此架构来说，它更加符合架构风格

```py{2}
async def create(*, obj: CreateIns) -> None:
    async with async_db_session.begin() as db:
        await xxx_dao.create(db, obj)
```

## 如何选择？

对于两种事务方法，我们更推荐第二种；

通常情况下，第一种方法我们更多用于分页查询接口，理论上来说，查询接口我们无需使用事务，但由于分页查询我们使用了第三方库，并且，为了尊重
fastapi 官方教程，我们仍将它保留

而第二种，对于无需使用事务的数据库操作，我们只需将 `begin()` 方法去掉，改为 `async with async_db_session() as db:`
即可，这种方式更加灵活，并且也能减少千篇一律的接口参数（纯作者强迫症），同时，它也是 sqlalchemy 2.0+ 的官方推荐使用方法
