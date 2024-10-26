---
title: Mixin
---

我们默认提供的所有模型都是没有操作人员信息的，在很多项目中，可能会添加每条数据的创建人、更新人，
虽然我们没有实行这一特性，但是，我们提供了非常简易的集成方式

## 如何应用？

在 `common/model.py` 文件中，我们提供了用户 Mixin 类

```py
class UserMixin(MappedAsDataclass):
    """用户 Mixin 数据类"""

    create_user: Mapped[int] = mapped_column(sort_order=998, comment='创建者')
    update_user: Mapped[int | None] = mapped_column(init=False, default=None, sort_order=998, comment='修改者')
```

通常情况下，你会在自定义模型类中继承 `Base` 父类，要想灵活的应用操作人员信息，你只需在继承 `Base` 父类的同时，也继承
`UserMixin` 类，这样就将自动添加操作人员列到模型

## 如何使用？

应用操作人员信息后，首先，你要在接口参数中，传递 `request: Request`，并作为第一个参数（在 Django，flask 等框架中，这可能很常见）

然后，在执行创建或更新操作时，可通过 `request.user.id` 直接获取操作人员 id，并进行数据库写入

我们之所以没有默认应用此功能，是因为我们不想所有接口重复调用 `request` 参数（作者强迫症）
