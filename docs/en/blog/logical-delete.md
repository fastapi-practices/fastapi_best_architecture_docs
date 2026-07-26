---
title: Migrating FastAPI from Physical Delete to Logical Delete
createTime: 2026-05-30 17:30
tags:
  - FastAPI
permalink: /blog/s6ygw32m/
---

In admin systems, delete is rarely a simple `delete from table where id = ?`.

Once business data is physically deleted, audit, recovery, related investigation, and history tracking become hard. For core data such as users, roles, menus, departments, dictionaries, and task schedules, the cost of physical delete often outweighs the “cleanliness” it provides.

Therefore, fba migrated core business tables from physical delete to logical delete.

The migration looks like adding only two fields — `deleted` and `deleted_time` — but what really needs alignment is the full chain: model, CRUD, business validation, unique constraints, join queries, schedulers, and migration scripts must all stay consistent.

## Logical Delete Fields

fba defines `LogicalDeleteMixin` in `backend/common/model.py`:

```python
class LogicalDeleteMixin(MappedAsDataclass):
    """Logical delete Mixin dataclass"""

    deleted: Mapped[int] = mapped_column(
        BigInteger,
        init=False,
        default=0,
        server_default='0',
        sort_order=999,
        comment='Whether deleted (0: no; id: yes)',
    )
    deleted_time: Mapped[datetime | None] = mapped_column(
        TimeZone,
        init=False,
        default=None,
        sort_order=999,
        comment='Deletion time',
    )
```

Instead of the common `is_deleted: bool`, we use `deleted: int`:

- `deleted = 0`: not deleted
- `deleted = id`: deleted

This design works with unique constraints.

With a boolean, after deleting a user named `admin` you can create a new `admin` fine; but if you delete the new `admin` again, the table can hold multiple `username = admin, deleted = 1` rows and the unique constraint still conflicts.

Using the row's own `id` as the delete flag makes every deleted row's `deleted` value different, so both goals are met:

- Undeleted data stays unique
- Deleted data keeps history without blocking new creates

## Which Models Use Logical Delete

fba's `Base` inherits `DateTimeMixin` and `LogicalDeleteMixin`:

```python
class Base(DataClassBase, DateTimeMixin, LogicalDeleteMixin):
    """Declarative dataclass base"""

    __abstract__ = True
```

So every model inheriting `Base` automatically gets `created_time`, `updated_time`, `deleted`, and `deleted_time`.

Typical models using logical delete today:

- `User`: users
- `Role`: roles
- `Menu`: menus
- `Dept`: departments
- `DataScope`: data scopes
- `DataRule`: data rules
- `TaskScheduler`: task schedules
- `Config`: parameter config
- `DictType`: dictionary types
- `DictData`: dictionary data
- `Notice`: notices
- `UserSocial`: OAuth2 social account bindings
- `GenBusiness`: code generation businesses

Logs, task results, code-gen columns, and similar models do not inherit `Base` and do not use logical delete.

## Delete Operations

Logical delete does not remove the row — it updates it.

At the CRUD layer, delete goes through `delete_model_by_column()`:

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

Key points:

- `logical_deletion=True`: enable logical delete
- `deleted_flag_column='deleted'`: delete flag field
- `deleted_flag_value=self.model.id`: write the current row ID after delete
- `deleted_at_column='deleted_time'`: record deletion time
- `deleted=0`: only allow deleting undeleted data

The last condition matters. It prevents double-deletes and keeps already-deleted data out of business operations.

## Queries Must Filter deleted=0

After logical delete, the query layer must follow one rule: business queries only see undeleted data.

User detail example:

```python
return await self.select_model(db, user_id, deleted=0)
```

Role name uniqueness check:

```python
return await self.select_model_by_column(db, name=name, deleted=0)
```

List query:

```python
filters = {'deleted': 0}
return await self.select_order('id', **filters)
```

Join queries too. When users join departments, roles, or menus, join tables themselves may not use logical delete, but related business models need filtering:

```python
JoinConfig(
    model=Dept,
    join_on=and_(Dept.id == self.model.dept_id, Dept.deleted == 0),
    fill_result=True,
)
```

The easiest places to miss logical delete are usually not single-table queries, but joins, batch queries, permission cache queries, and background task queries.

## Unique Constraints Must Change with Logical Delete

If tables still keep single-column unique constraints, logical delete is incomplete.

For example, a user table might originally have:

```python
username: Mapped[str] = mapped_column(sa.String(64), unique=True)
```

After deleting a user, the old row remains, so a new user cannot reuse the same username.

Change to composite unique constraints:

```python
__table_args__ = (
    sa.UniqueConstraint('username', 'deleted', name='uk_sys_user_username_deleted'),
    sa.UniqueConstraint('email', 'deleted', name='uk_sys_user_email_deleted'),
    {'comment': 'User table'},
)
```

The database then only enforces uniqueness of username and email among undeleted rows. Deleted rows have different `deleted` values and do not block new data.

The same approach applies to roles, departments, data scopes, data rules, task schedules, parameter config, dictionary types, code-gen businesses, and similar models.

## Migration Pitfalls

### 1. Rules like menu titles should not force composite uniqueness

Not every business uniqueness rule fits a database unique constraint.

For example, menu title rules may be: non-button menu titles must be unique. Buttons may repeat, but directories, menus, iframes, and external links may not.

That rule is not a simple `title + deleted`. Adding a constraint would change existing business semantics.

Across MySQL and PostgreSQL, partial indexes, expression indexes, and conditional unique indexes also differ. Such rules are better kept in the business layer until stable, then designed at the database layer.

### 2. Clean historical duplicates before adding unique constraints

Before a migration creates a unique constraint, the database must not contain conflicting data.

For example, adding:

```python
sa.UniqueConstraint('name', 'deleted', name='uk_sys_dept_name_deleted')
```

If multiple undeleted departments already share a name, migration fails.

Check historical data first:

```sql
select name, deleted, count(*)
from sys_dept
group by name, deleted
having count(*) > 1;
```

If duplicates exist, clean or merge them before migrating.

## Checklist

When migrating from physical to logical delete, check in this order:

1. Does the model inherit `Base`?
2. Are unique fields changed to `business field + deleted`?
3. Do CRUD queries default to filtering `deleted=0`?
4. Do updates and deletes only operate on undeleted data?
5. Do join queries filter related business tables with `deleted=0`?
6. Do business uniqueness checks exclude deleted data?
7. Do update uniqueness checks avoid treating the current row as a duplicate?
8. Do batch deletes write `deleted=id` and `deleted_time`?
9. Can cache, permissions, and schedulers still read deleted data?
10. Are `deleted` / `deleted_time` incorrectly passed when constructing ORM objects?
11. Was historical duplicate data cleaned before migration?

Logical delete is not a field change — it is a data lifecycle convention. Only when model, query, constraints, and business validation align will deleted data stop polluting business flows without blocking new data creation.
