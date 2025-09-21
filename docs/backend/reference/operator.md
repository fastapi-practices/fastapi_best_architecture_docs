---
title: 操作人
---

我们常见的后台管理系统中，经常会有一些比如创建人，更新人这类的信息，那这些信息是如何做的呢？下面我们就来讲一讲我们在 fba
中应该如何集成操作人信息

在 fba 中，并没有默认集成操作人员信息到各个数据库表，但是我们提供了非常简易的集成方式：Mixin 类

## 如何集成？

打开 fba 项目 backend 目录，进入 `common/model.py` 文件中，你会看到 `UserMixin` 类就冰冷冷的站在那里，因为 fba
没有使用它，而只是保留它；

```python
class UserMixin(MappedAsDataclass):
    """用户 Mixin 数据类"""

    created_by: Mapped[int] = mapped_column(sort_order=998, comment='创建者')
    updated_by: Mapped[int | None] = mapped_column(init=False, default=None, sort_order=998, comment='修改者')
```

## 如何使用？

首先，`UserMixin` 类所存储的信息只是用户的 id ，这也是一种常见的做法，那么问题来了：我该如何获取用户 id 并存储？
我在后台展示的时候，肯定不能展示 id 吧？容我一一解答

### 如何获取用户 id 并存储

我们 fba 的绝明之处，就是充分利用了请求上下文功能，我们通过 JWT 中间件将用户信息存储到了每个请求的上下文中，后面我们会展开详细讲解
JWT 中间件，然后，我们就可以很轻松的通过 request 对象读取用户信息，在 Django，flask 等 Web 框架中， request 都是常驻嘉宾

首先，在接口函数中，我们要像 Django/flask 一样，第一个参数写为 request，最好，我们加上参数类型：`request: Request`
，然后我们可以在接口函数中通过 `request.user.id` 轻松获取当前操作人员 id ，这样，在存储的时候，此 id 就可以作为存储数据被添加到
schema 或字典中

### 我在后台展示的时候，肯定不能展示 id 吧

当然不能，那该怎么办呢？虽然我们只存储了用户 id 到数据库，但当我们单查询或列表查询的时候，我们需要进行数据拦截，将 id 替换为
username；

这会涉及到另外的问题，username 从哪里来？考虑到性能影响，我们如果每次都遍历这些 id 去查询数据库进行替换，无疑是增加了大量 IO
操作，因此，我们可以埋点（新用户注册后，查询用户列表时...）将所有用户 id 和 username 缓存到 redis，替换的时候就直接读取缓存

## 直接存成 username 不更好么？

当然可以，你可以直接修改 `UserMixin` 存为字符串，然后直接通过 `request.user.username` 存储用户名，这样查询出来就直接是用户名，从而无需再进行替换操作

## 到底存什么？

用 id 还是用 username，取决于业务场景；如果需要总是显示最新用户信息，避免用户更新用户名之后还需要更新所有历史数据，则使用
id，如果 username 是唯一的，并且需要保留历史痕迹，直接用 username 即可
