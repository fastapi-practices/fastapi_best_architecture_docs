---
title: RBAC
---

我们通过自定义依赖组件，实现了 RBAC 的轻松集成，在 Java 或其他语言中，常见的方式可能是注解，但在 FastAPI 中，依赖是它的亮点，也是核心

## RBAC

fba 内置了两种解决方案，分别为【角色菜单】、【Casbin】

### 角色菜单

::: tip
fba 中默认未启用此鉴权方式
:::

此方案是各类语言 web 开发中比较常见的解决方案，它可以设置按钮级别的控制规则

要想实现此 RBAC 鉴权，需要修改以下相关配置

::: steps

1. 更新 RBAC 鉴权配置

   在 `core/conf.py` 文件中找到以下配置，并更新 `RBAC_ROLE_MENU_MODE` 为 `True`

    ```py
    # Permission (RBAC)
    RBAC_ROLE_MENU_MODE: bool = False
    ```

2. 添加接口依赖

   只有在接口中添加以下依赖时，才能自动调用此鉴权方式

    ```py{5-6}
    @router.post(
        '',
        summary='xxx',
        dependencies=[
            Depends(RequestPermission('sys:api:add')),  # 通常为 xxx:xxx:xxx
            DependsRBAC,
        ],
    )
    ```

3. 在系统菜单中添加权限标识

   我们在接口依赖中可以看到 `sys:api:add` 之类的值，这些值正是对应着菜单中的权限标识，
   只有它们完全一致，并且用户拥有对应的菜单时，才会获得相应的操作权限

:::

### Casbin

::: tip
fba 中默认使用此鉴权方式
:::

此方案是 Go 语言中比较流行的解决方案，它非常灵活，可以通过模型定义多种控制规则

要想使用此 RBAC 鉴权，需要学习以下几点

::: steps

1. 了解 Casbin

   我们在最初架构设计时，参考了 go-admin，gin-vue-admin... 等优秀的开源项目，同时引入了 Casbin，它在众多 python web
   开源项目中可能是极为罕见的，并且，它的学习成本非常高，如果你对此感兴趣，可以通过 [Casbin 官网](https://casbin.org/docs/get-started)
   进行学习，另外，可参考视频教程 [半小时彻底弄懂Casbin基础模型](https://www.bilibili.com/video/BV1qz4y167XP/?spm_id_from=333.999.0.0&vd_source=958c4d7f9243c68a0ec9dcd327bad930)、[Casbin的代码使用、api调用、自定义比较方法](https://www.bilibili.com/video/BV13r4y1M7AC/?spm_id_from=333.999.0.0&vd_source=958c4d7f9243c68a0ec9dcd327bad930)
   ，讲的是非常好

2. 了解规则

   通过以上学习之后，我们再来看内置规则（不学习 == 天书），你可以通过[编辑器](https://casbin.org/zh/docs/online-editor)
   进行模型规则验证

   内置模型 `backend/plugin/casbin/utils/rbac.py`：

    ```text:no-line-numbers
    [request_definition]
    r = sub, obj, act
    
    [policy_definition]
    p = sub, obj, act
    
    [role_definition]
    g = _, _
    
    [policy_effect]
    e = some(where (p.eft == allow))
    
    [matchers]
    m = g(r.sub, p.sub) && (keyMatch(r.obj, p.obj) || keyMatch3(r.obj, p.obj)) && (r.act == p.act || p.act == "*")
    ```

3. 了解策略
   ::: tabs
   @tab p 策略
    - 添加基于角色的访问权限（推荐）

      需要配合添加 g 策略才能实现用户访问权限，适合配置所有用户接口访问策略，拥有此角色的用户便能拥有相应的访问权限<br>

      格式：`角色 role + 访问路径 path + 访问方法 method`

    - 添加基于用户的访问权限（不推荐）

      不需要配合添加 g 策略就能实现用户访问权限，适合配置指定用户接口访问策略<br>

      格式：`用户 uuid + 访问路径 path + 访问方法 method`

   @tab g 策略
   当 p 策略为【添加基于角色的访问权限】时，需要此策略

   格式：`用户 uuid + 角色 role`

4. 添加策略

   在文件 `backend/plugin/casbin/api/v1/sys/casbin.py` 中，包含策略相关接口，依据模型和策略规则添加相关策略即可

5. 检查接口依赖

   只有在接口中添加以下依赖时，才能自动调用此鉴权方式

    ```python{1}
    @router.post('/hello', summary='你好', dependencies=[DependsRBAC])
    async def hello():
        ....
    ```

:::

## 解耦

在实际项目开发中，不可能同时存在两种 RBAC 解决方案，我们可以通过以下方式删除其中一种集成

### 角色菜单

- 删除 `backend/common/security/permission.py` 文件中的 `RequestPermission` 类及所有类调用
- 删除 `backend/core/conf.py` 文件中的 `RBAC_ROLE_MENU_MODE` 和 `RBAC_ROLE_MENU_EXCLUDE`
- 删除 `backend/common/security/rbac.py` 文件中 `rbac_verify` 方法里面的 `if settings.RBAC_ROLE_MENU_MODE:`
  条件及相关代码

### Casbin

删除 `backend/plugin/casbin` 文件夹
