---
title: 模型
---

通用模型位于 `backend/common/model.py` 文件中

## 主键

我们未提供自动主键模式，而是必须通过手动定义的方式进行主键声明

```python
# 通用 Mapped 类型主键, 需手动添加，参考以下使用方式
# MappedBase -> id: Mapped[id_key]
# DataClassBase && Base -> id: Mapped[id_key] = mapped_column(init=False)
id_key = Annotated[
    int, mapped_column(primary_key=True, index=True, autoincrement=True, sort_order=-999, comment='主键id')
]
```

## Mixin 类

[Mixin](https://en.wikipedia.org/wiki/Mixin) 是一种面向对象编程概念, 使结构变得更加清晰

### 操作人

用于集成操作人信息到数据库表，使用方法请查看[<Icon name="fluent-color:receipt-16" />操作人信息](../../planet.md)

```python
class UserMixin(MappedAsDataclass):
    """用户 Mixin 数据类"""

    created_by: Mapped[int] = mapped_column(sort_order=998, comment='创建者')
    updated_by: Mapped[int | None] = mapped_column(init=False, default=None, sort_order=998, comment='修改者')
```

### 日期时间

用于集成日期时间到数据库表，已集成在 [Base](#base-基类) 基类中

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

## 数据类基类

[MappedAsDataclass](https://docs.sqlalchemy.org/en/20/orm/dataclasses.html#orm-declarative-native-dataclasses)

声明性数据类基类，它将带有数据类集成，允许使用更高级配置，==不包含日期时间=={.note}

```python
class DataClassBase(MappedAsDataclass, MappedBase):

    __abstract__ = True
```

## Base 基类

声明性数据类基类, 带有数据类集成, 并包含日期时间

```python
class Base(DataClassBase, DateTimeMixin):

    __abstract__ = True
```
