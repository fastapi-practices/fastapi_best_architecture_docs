---
title: FastAPI 如何从物理删除迁移到逻辑删除
createTime: 2026-05-30 17:30
tags:
  - FastAPI
---

在后台管理系统中，删除通常不是简单的 `delete from table where id = ?`。

业务数据一旦被物理删除，就很难再做审计、恢复、关联排查和历史追踪。对于用户、角色、菜单、部门、字典、任务调度这类核心数据来说，物理删除的成本往往高于它带来的“干净”。

因此，fba 将核心业务表从物理删除迁移到了逻辑删除。

这次迁移看起来只是多了两个字段：`deleted` 和 `deleted_time`，但真正需要处理的是一整条链路：模型、CRUD、业务校验、唯一约束、关联查询、调度任务和迁移脚本都必须保持一致。

## 逻辑删除字段

fba 在 `backend/common/model.py` 中定义了 `LogicalDeleteMixin`：

```python
class LogicalDeleteMixin(MappedAsDataclass):
    """逻辑删除 Mixin 数据类"""

    deleted: Mapped[int] = mapped_column(
        BigInteger,
        init=False,
        default=0,
        server_default='0',
        sort_order=999,
        comment='是否已删除（0：否；id：是）',
    )
    deleted_time: Mapped[datetime | None] = mapped_column(
        TimeZone,
        init=False,
        default=None,
        sort_order=999,
        comment='删除时间',
    )
```

这里没有使用常见的 `is_deleted: bool`，而是使用了 `deleted: int`：

- `deleted = 0`：未删除
- `deleted = id`：已删除

这个设计是为了配合唯一约束。

如果使用布尔值，删除一条用户名为 `admin` 的用户后，再创建一个新的 `admin` 用户没有问题；但如果再次删除新的 `admin`，表里会出现多条
`username = admin, deleted = 1` 的记录，唯一约束仍然会冲突。

使用自身 `id` 作为删除标记后，每条已删除记录的 `deleted` 值都不同，因此可以同时满足两个目标：

- 未删除数据保持唯一
- 已删除数据保留历史，不影响新数据创建

## 哪些模型启用逻辑删除

fba 的 `Base` 继承了 `DateTimeMixin` 和 `LogicalDeleteMixin`：

```python
class Base(DataClassBase, DateTimeMixin, LogicalDeleteMixin):
    """声明式数据类基类"""

    __abstract__ = True
```

因此，所有继承 `Base` 的模型都会自动拥有 `created_time`、`updated_time`、`deleted`、`deleted_time`。

当前采用逻辑删除的典型模型包括：

- `User`：用户
- `Role`：角色
- `Menu`：菜单
- `Dept`：部门
- `DataScope`：数据范围
- `DataRule`：数据规则
- `TaskScheduler`：任务调度
- `Config`：参数配置
- `DictType`：字典类型
- `DictData`：字典数据
- `Notice`：通知公告
- `UserSocial`：OAuth2 社交账号绑定
- `GenBusiness`：代码生成业务

日志、任务结果、代码生成列等模型没有继承 `Base`，它们不参与逻辑删除。

## 删除操作

逻辑删除不是删除记录，而是更新记录。

在 CRUD 层，删除操作通过 `delete_model_by_column()` 完成：

```python
return await self.delete_model_by_column(
    db,
    logical_deletion=True,
    deleted_flag_column='deleted',
    deleted_flag_value=self.model.id,
    deleted_at_column='deleted_time',
    deleted_at_factory=timezone.now(),
    id=pk,
    deleted=0,
)
```

这里有几个关键点：

- `logical_deletion=True`：启用逻辑删除
- `deleted_flag_column='deleted'`：删除标记字段
- `deleted_flag_value=self.model.id`：删除后写入当前记录 ID
- `deleted_at_column='deleted_time'`：记录删除时间
- `deleted=0`：只允许删除未删除数据

最后一个条件很重要。它可以避免重复删除，也能防止把已删除数据再次参与业务操作。

## 查询必须过滤 deleted=0

逻辑删除完成后，查询层必须统一遵守一个规则：业务查询只看未删除数据。

例如用户详情：

```python
return await self.select_model(db, user_id, deleted=0)
```

角色名称查重：

```python
return await self.select_model_by_column(db, name=name, deleted=0)
```

列表查询：

```python
filters = {'deleted': 0}
return await self.select_order('id', **filters)
```

关联查询也一样。比如用户关联部门、角色、菜单时，关联表本身可能没有逻辑删除，但被关联的业务模型需要过滤：

```python
JoinConfig(
    model=Dept,
    join_on=and_(Dept.id == self.model.dept_id, Dept.deleted == 0),
    fill_result=True,
)
```

逻辑删除最容易遗漏的地方往往不是单表查询，而是关联查询、批量查询、权限缓存查询和后台任务查询。

## 唯一约束要和逻辑删除一起改

如果表中仍然保留单列唯一约束，逻辑删除是不完整的。

例如用户表原本可能有这样的约束：

```python
username: Mapped[str] = mapped_column(sa.String(64), unique=True)
```

删除用户后，旧记录仍然留在表里，新用户就无法继续使用相同用户名。

因此需要改成联合唯一约束：

```python
__table_args__ = (
    sa.UniqueConstraint('username', 'deleted', name='uk_sys_user_username_deleted'),
    sa.UniqueConstraint('email', 'deleted', name='uk_sys_user_email_deleted'),
    {'comment': '用户表'},
)
```

这样，数据库只会限制未删除数据中的用户名和邮箱唯一。已删除数据因为 `deleted` 值不同，不会影响新数据。

同样的思路也适用于角色、部门、数据范围、数据规则、任务调度、参数配置、字典类型、代码生成业务等模型。

## 迁移中的几个坑

### 1. 菜单标题这类规则不能强行套联合唯一

并不是所有业务查重都适合直接加数据库唯一约束。

例如菜单标题的业务规则是：非按钮菜单标题唯一。也就是说按钮类型可以重复，但目录、菜单、内嵌、外链不允许重复。

这种规则不是简单的 `title + deleted` 能表达的。如果直接加约束，就会改变现有业务语义。

跨 MySQL 和 PostgreSQL 时，部分索引、表达式索引、条件唯一索引的能力也不同。因此这类规则更适合先保留在业务层，等规则稳定后再设计数据库层的约束方案。

### 2. 加唯一约束前要清理历史重复数据

迁移脚本创建唯一约束前，数据库中不能存在冲突数据。

例如添加：

```python
sa.UniqueConstraint('name', 'deleted', name='uk_sys_dept_name_deleted')
```

如果表中已经有多条未删除的同名部门，迁移会失败。

因此正式迁移前应该先检查历史数据：

```sql
select name, deleted, count(*)
from sys_dept
group by name, deleted
having count(*) > 1;
```

如果有重复数据，需要先清理或合并，再执行迁移。

## 检查清单

从物理删除迁移到逻辑删除时，可以按下面的顺序检查：

1. 模型是否继承 `Base`
2. 唯一字段是否改成 `业务字段 + deleted`
3. CRUD 查询是否默认过滤 `deleted=0`
4. 更新和删除是否只操作未删除数据
5. 关联查询是否过滤被关联业务表的 `deleted=0`
6. 业务查重是否排除了已删除数据
7. 更新查重是否避免把当前记录误判为重复
8. 批量删除是否写入 `deleted=id` 和 `deleted_time`
9. 缓存、权限、调度任务是否仍会读到已删除数据
10. 构造 ORM 对象时是否误传 `deleted`、`deleted_time`
11. 迁移前是否清理了历史重复数据

逻辑删除不是一个字段改造，而是一套数据生命周期约定。只有模型、查询、约束和业务校验都对齐，删除后的数据才不会继续污染业务，同时也不会阻止新数据正常创建。

