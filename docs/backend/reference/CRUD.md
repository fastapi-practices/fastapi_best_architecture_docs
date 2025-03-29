---
title: CRUD
---

我们在 fba 中使用 sqlalchemy-crud-plus 作为数据库操作基类，
它是一款由我们自主构建的基于 SQLAlchemy 2.0 的高级异步 CRUD SDK，它可适用于任何 FastAPI + SQLAlchemy 项目

<RepoCard repo="fastapi-practices/sqlalchemy-crud-plus" />

## 函数命名

fba 遵循以下命名规范：

- 获取/查询详情： `get()`
- 通过 xxx 获取/查询详情：`get_by_xxx()`
- 获取/查询列表：`get_list()`
- 获取/查询所有：`get_all()`
- 字查询：`get_children()`
- 关系查询：`get_with_relation()`
- 创建：`create()`
- 更新：`update()`
- 删除：`delete()`

## Mixin

CRUD Mixin 位于 `backend/common/model.py` 文件中

### 主键

我们未提供自动主键模式，而是必须通过手动定义的方式进行主键声明

```python
# 通用 Mapped 类型主键, 需手动添加，参考以下使用方式
# MappedBase -> id: Mapped[id_key]
# DataClassBase && Base -> id: Mapped[id_key] = mapped_column(init=False)
id_key = Annotated[
    int, mapped_column(primary_key=True, index=True, autoincrement=True, sort_order=-999, comment='主键id')
]
```

### 日期时间

日期时间 Mixin 将自动集成到 Base 类中，如果模型父类为 Base，将自动应用

```python
class DateTimeMixin(MappedAsDataclass):
    """日期时间 Mixin 数据类"""

    created_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), init=False, default_factory=timezone.now, sort_order=999, comment='创建时间'
    )
    updated_time: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), init=False, onupdate=timezone.now, sort_order=999, comment='更新时间'
    )
```

### 数据类基类

[MappedAsDataclass](https://docs.sqlalchemy.org/en/20/orm/dataclasses.html#orm-declarative-native-dataclasses)

声明性数据类基类, 它将带有数据类集成, 允许使用更高级配置；此基类适用于==不包含日期时间的模型=={.note}

```python
class DataClassBase(MappedAsDataclass, MappedBase):
    __abstract__ = True
```

### Base 基类

包含基础表结构的数据类基类；此基类适用于大多数模型

```python
class Base(DataClassBase, DateTimeMixin):
    __abstract__ = True
```
