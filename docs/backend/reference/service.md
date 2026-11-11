---
title: Service
---

::: tip
编写 Service 层时，可以让 AI 先读取 <FbaSkillInstall /> 中的架构与编码风格参考，避免把业务逻辑下沉到 CRUD，或把参数校验与响应拼装写进 Service
:::

Service 层是 fba 三层架构的中间层：向上承接 API 层的调用，向下编排 CRUD 层的数据库操作，负责业务逻辑、数据处理与异常处理

## 职责边界

| 关注点 | 归属层 | 说明 |
|-------|-------|------|
| 路由、依赖声明、参数绑定 | API | 保持路由处理器轻薄 |
| 请求/响应数据结构 | Schema | Pydantic 模型 |
| 业务逻辑、业务校验、流程编排 | Service | 本页 |
| 数据库读写 | CRUD | 返回 ORM 对象、标量或 Select |
| ORM 表结构 | Model | SQLAlchemy 模型 |

一句话概括：API 只做「接收与返回」，Service 只做「判断与组织」，CRUD 只做「存取数据」

::: warning
不要在 API 层直接调用 CRUD 层，绕过 Service 会让业务校验、缓存失效、异常语义散落在路由中
:::

## 目录结构

::: file-tree

- backend # 后端
    - app # 应用
        - admin # 系统后台
            - service # 服务
                - dept_service.py # 部门服务
                - user_service.py # 用户服务
                - ...
            - crud # CRUD
            - model # 模型
            - schema # 数据传输
            - api # 接口
        - ...
    - ...

:::

## 命名规范

- 文件名：`xxx_service.py`
- 类名：`XxxService`
- 实例：在服务模块底部导出单例，API 层直接导入使用

```python
dept_service: DeptService = DeptService()
```

Service 与 Schema、CRUD、Model 使用同一个词干（stem），例如 `Dept` 对应 `dept.py`、`DeptService`、`CRUDDept`、`DeptSchemaBase`、`sys_dept`

## 方法命名

| 方法 | 说明 |
|-----|-----|
| `get_all()` | 获取所有 |
| `get()` | 获取详情 |
| `get_list()` | 获取列表（分页） |
| `create()` | 创建 |
| `update()` | 更新 |
| `delete()` | 删除 |

建议按「获取所有 → 获取详情 → 获取列表 → 创建 → 更新 → 删除」的顺序定义方法

## 方法签名

Service 方法一律使用关键字传参（keyword-only），并标注类型

```python
from sqlalchemy.ext.asyncio import AsyncSession


class DeptService:
    """部门服务类"""

    @staticmethod
    async def get(*, db: AsyncSession, pk: int) -> Dept:
        """
        获取部门详情

        :param db: 数据库会话
        :param pk: 部门 ID
        :return:
        """
        ...
```

::: tip
方法没有依赖实例状态时使用 `@staticmethod`，需要调用同类其他方法时使用实例方法并通过 `self` 调用
:::

## 代码示例

### 查询详情

查询后做业务校验，不存在时抛出自定义异常

```python
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_dept import dept_dao
from backend.app.admin.model import Dept
from backend.common.exception import errors
from backend.common.i18n import t


class DeptService:
    """部门服务类"""

    @staticmethod
    async def get(*, db: AsyncSession, pk: int) -> Dept:
        """
        获取部门详情

        :param db: 数据库会话
        :param pk: 部门 ID
        :return:
        """
        dept = await dept_dao.get(db, pk)
        if not dept:
            raise errors.NotFoundError(msg=t('error.dept.not_found'))
        return dept
```

### 分页列表

分页由 Service 组织：先向 CRUD 取查询表达式，再交给 `paging_data()` 生成结果

```python
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_user import user_dao
from backend.common.pagination import paging_data


class UserService:
    """用户服务类"""

    @staticmethod
    async def get_list(*, db: AsyncSession, dept: int, username: str, status: int) -> dict[str, Any]:
        """
        获取用户列表

        :param db: 数据库会话
        :param dept: 部门 ID
        :param username: 用户名
        :param status: 状态
        :return:
        """
        user_select = await user_dao.get_select(dept=dept, username=username, status=status)
        return await paging_data(db, user_select)
```

### 创建

创建前的业务校验（唯一性、关联存在性）写在 Service 层

```python
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_dept import dept_dao
from backend.app.admin.schema.dept import CreateDeptParam
from backend.common.exception import errors
from backend.common.i18n import t


class DeptService:
    """部门服务类"""

    @staticmethod
    async def create(*, db: AsyncSession, obj: CreateDeptParam) -> None:
        """
        创建部门

        :param db: 数据库会话
        :param obj: 部门创建参数
        :return:
        """
        if await dept_dao.get_by_name(db, obj.name):
            raise errors.ConflictError(msg=t('error.dept.name_exists'))
        if obj.parent_id is not None and not await dept_dao.get(db, obj.parent_id):
            raise errors.NotFoundError(msg=t('error.dept.parent_not_found'))
        await dept_dao.create(db, obj)
```

### 更新与删除

更新返回影响行数，由 API 层决定返回成功还是失败；删除前的关联校验同样放在 Service 层

```python
class DeptService:
    """部门服务类"""

    @staticmethod
    async def delete(*, db: AsyncSession, pk: int) -> int:
        """
        删除部门

        :param db: 数据库会话
        :param pk: 部门 ID
        :return:
        """
        dept = await dept_dao.get_join(db, pk)
        if not dept:
            raise errors.NotFoundError(msg=t('error.dept.not_found'))
        if dept.users:
            raise errors.ConflictError(msg=t('error.dept.has_users'))
        children = await dept_dao.get_children(db, pk)
        if children:
            raise errors.ConflictError(msg=t('error.dept.has_children'))
        count = await dept_dao.delete(db, pk)
        return count
```

## 异常与国际化

业务异常统一使用 `backend/common/exception/errors.py` 中的自定义异常类，抛出后由全局异常处理器统一转换为标准响应

```python
from backend.common.exception import errors
from backend.common.i18n import t

raise errors.NotFoundError(msg=t('error.dept.not_found'))
raise errors.ConflictError(msg=t('error.dept.name_exists'))
```

::: tip
核心代码中的异常信息不要写死文案，使用 `t()` 从 `backend/locale` 语言包取值，新增的键需要同时补充 `zh-CN.yml` 与 `en-US.json`
:::

常用异常类：

| 异常类 | 场景 |
|-------|------|
| `RequestError` | 请求参数或业务条件不满足 |
| `NotFoundError` | 资源不存在 |
| `ConflictError` | 资源冲突（唯一性、占用） |
| `ForbiddenError` | 无权限 |
| `AuthorizationError` | 认证通过但状态不允许 |
| `TokenError` | 令牌无效或过期 |

## 事务

事务边界由 API 层通过会话依赖声明，Service 不重复开启事务

| 会话依赖 | 用途 |
|---------|------|
| `CurrentSession` | 只读接口，直接使用 |
| `CurrentSessionTransaction` | 新增、更新、删除等写操作，函数作用域内自动提交或回滚 |

```python
from backend.database.db import CurrentSession, CurrentSessionTransaction
```

::: warning
只有当 Service 或任务需要自己开启事务边界时，才使用 `async with async_db_session.begin() as db:`
:::

## 缓存失效

缓存读取在 API 层通过 `cache()` 依赖完成，写操作成功后需要在 Service 层显式清理业务缓存

```python
from backend.app.admin.utils.cache import user_cache_manager

count = await user_dao.update(db, user.id, obj)
await user_cache_manager.clear([user.id])
return count
```

更多缓存用法：[缓存](./cache.md)

## 异步任务

属于业务流程的异步任务派发写在 Service 层，而不是路由处理器中

```python
from backend.app.task.tasks.tasks import task_demo_params

task_demo_params.delay(hello='hello', world='world')
```

任务定义在 `backend/app/task/tasks` 下，通过 `celery_app.task` 装饰器注册

更多用法：[Celery](./celery.md)

## 常见反例

| 反例 | 问题 | 正确做法 |
|-----|------|---------|
| API 层直接调用 `xxx_dao.get()` | 绕过业务校验与缓存失效 | API → Service → CRUD |
| Service 里写 `Select` 过滤条件 | 查询细节泄漏到业务层 | 过滤条件下沉到 CRUD 的 `get_select()` |
| Service 里拼接 HTTP 响应结构 | 响应契约与业务耦合 | API 层使用 `response_base.success()` |
| 把 `CreateXxxParam` 直接透传给 Service 而不拆解 | Service 与入参模型强耦合 | API 层显式拆解参数后调用 Service |
