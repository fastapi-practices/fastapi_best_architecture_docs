---
title: Model
---

::: tip
Before designing models or migrations, use [fba skills](https://skills.sh/fastapi-practices/skills/fba) to check Base, id_key, field types, primary-key mode, and plugin SQL initialization requirements.
:::

Common models live in `backend/common/model.py`.

## Primary Key

We do not provide automatic primary-key mode. Primary keys must be declared manually.

### Auto-increment ID

```python
# Common Mapped-type primary key; must be added manually. Usage examples:
# MappedBase -> id: Mapped[id_key]
# DataClassBase && Base -> id: Mapped[id_key] = mapped_column(init=False)
id_key = Annotated[
    int,
    mapped_column(
        BigInteger,
        primary_key=True,
        unique=True,
        index=True,
        autoincrement=True,
        sort_order=-999,
        comment='主键 ID',
    ),
]
```

### Snowflake ID

[**Switch primary key**](pk.md){.read-more}

## Mixin Classes

[Mixin](https://en.wikipedia.org/wiki/Mixin) is an object-oriented programming concept that keeps structure clearer.

### Operator

Used to integrate operator information into database tables.

::: warning
In fba, operator information is not integrated by default, but we provide a very simple way to add it.

[**Operator blog post**](../../blog/operator.md){.read-more}
:::

### DateTime

Used to integrate datetime fields into database tables. Already integrated in the [Base](#base-class) base class.

```python
class DateTimeMixin(MappedAsDataclass):
    """日期时间 Mixin 数据类"""

    created_time: Mapped[datetime] = mapped_column(
        TimeZone, init=False, default_factory=timezone.now, sort_order=999, comment='创建时间'
    )
    updated_time: Mapped[datetime | None] = mapped_column(
        TimeZone, init=False, onupdate=timezone.now, sort_order=999, comment='更新时间'
    )
```

### Soft Delete

Used to integrate soft-delete flags into database tables. Already integrated in the [Base](#base-class) base class.

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

::: warning
Soft delete is more than adding fields to the model. You also need to handle CRUD query conditions, delete operations, unique constraints, related queries, and more.

[**Soft delete blog post**](../../blog/logical-delete.md){.read-more}
:::

## Dataclass Base

A declarative dataclass base with dataclass integration, allowing more advanced configuration. ==Does not include datetime fields=={.note}

Learn about [MappedAsDataclass](https://docs.sqlalchemy.org/en/20/orm/dataclasses.html#orm-declarative-native-dataclasses).

```python
class DataClassBase(MappedAsDataclass, MappedBase):

    __abstract__ = True
```

## Base Class

A declarative dataclass base with dataclass, datetime, and soft-delete integration.

```python
class Base(DataClassBase, DateTimeMixin, LogicalDeleteMixin):

    __abstract__ = True
```

## String Types

For long text, fba provides a built-in PostgreSQL- and MySQL-compatible type `UniversalText`.

For common text fields, fba typically uses these length units: `32`, `64`, `128`, `256`, `512`.
