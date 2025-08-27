---
title: 常见问题
---

::: tip
如果以下解决方案未能帮助到您，请通过 [交流群](./group.md) 与我们联系
:::

## 返回数据跟数据库对不上

### 非首次部署或反复部署

若此前已调用过 fba 接口，相关数据可能已悄无声息地写入 Redis 缓存。随后，即便重新部署了 fba，整个部署过程并不会自动清除
Redis 中的缓存数据。

因此，调用重新部署后的 fba 接口时，若发现返回数据异常，而数据库检查又未发现问题，很可能是缓存未更新导致。此时，手动清理
Redis 中的 fba 缓存即可解决问题，系统将自动恢复正常

### 手动修改数据库数据

假设我们直接在数据库中修改了某些数据，但调用接口后发现返回结果未发生变化。返回数据可能来源于 Redis
缓存，而通过数据库直接修改的操作不会触发缓存的自动更新。

因此，返回数据看似未受影响。解决方法是手动清理 Redis 中的相关缓存，之后数据将正确反映修改结果

## Can't call await_only() here

```json
{
  "code": 500,
  "msg": "(sqlalchemy.exc.MissingGreenlet) greenlet_spawn has not been called; can't call await_only() here. Was IO attempted in an unexpected place?\n[SQL: SELECT sys_dict_data.id AS sys_dict_data_id, sys_dict_data.label AS sys_dict_data_label, sys_dict_data.value AS sys_dict_data_value, sys_dict_data.sort AS sys_dict_data_sort, sys_dict_data.status AS sys_dict_data_status, sys_dict_data.remark AS sys_dict_data_remark, sys_dict_data.type_id AS sys_dict_data_type_id, sys_dict_data.created_time AS sys_dict_data_created_time, sys_dict_data.updated_time AS sys_dict_data_updated_time \nFROM sys_dict_data \nWHERE %s = sys_dict_data.type_id]\n[parameters: [{'%(2071788311008 param)s': 1}]]\n(Background on this error at: https://sqlalche.me/e/20/xd2s)",
  "data": null,
  "trace_id": "89afd9b0f2b8442590661701e2b6b495"
}
```

![await_only](/images/sqlalchemy_await_only.png)

在 SQLAlchemy 2.0 中异步中，关系（relationship）表默认使用
[懒加载](https://docs.sqlalchemy.org/en/20/glossary.html#term-lazy-loading)，所以，如果你未在 ORM 语句中添加关联字段的
加载策略，那么关联字段可能被定义为错误（如上图所示），此时如果调用 pydantic / fastapi 序列化，那么将触发字段错误，因为字段本身就是个错误

可用的解决方案有多种，请阅读 SQLA 官方文档，fba 默认使用 `noload()` 对此进行处理，例如：

```python
return await self.select_order(  # [!code word:noload]
   'id',
   'desc',
   load_options=[
       selectinload(self.model.dept).options(noload(Dept.parent), noload(Dept.children), noload(Dept.users)),
       selectinload(self.model.roles).options(noload(Role.users), noload(Role.menus), noload(Role.scopes)),
   ],
   **filters,
)
```

## PostgreSQL 主键自增失败

当通过 sql 脚本执行插入数据后，由于 pg 特性，序列值不会与表中最大值同步，此时如果通过代码执行写入操作，可能触发
`DETAIL: Key (id)=(x) already exists` 的错误

解决方案请自行浏览器搜索：如何重置 pg 主键序列？

## 数据库时区陷阱

MySQL 不支持时区存储类型，而 PostgreSQL 拥有完美的时区类型，所以在数据库中存储时间列确实是一件令人头疼的事情，不过我们已经实现完美方案，兼容
pgsql 和 mysql，[查看详情](./backend/reference/timezone.md)
