---
title: RBAC
---

我们通过两个自定义依赖组件，实现了 RBAC 的轻松集成，在 Java 或其他语言中，常见的方式可能是注解，但在 FastAPI 中，依赖是它的亮点，也是核心

## RBAC

RBAC 提供了两种解决方案，分别为【角色菜单】、【Casbin】

【角色菜单】是各类语言 web 开发中比较常见的解决方案，它可以设置按钮级别的控制规则

【Casbin】是 Go 语言中比较流行的解决方案，它非常灵活，可以通过模型定义多种控制规则

### 角色菜单

要想实现此 RBAC 调用，涉及到三处相关配置

::: steps

1. 更新 RBAC 鉴权配置

   在 `core/conf.py` 文件中找到以下配置，并更新 `PERMISSION_MODE` 为 `role-menu`

    ```py
    # Permission (RBAC)
    PERMISSION_MODE: Literal['casbin', 'role-menu'] = 'role-menu'
    ```

2. 添加接口依赖

   只有在接口中填加以下相关依赖时，才能自动应用此鉴权方式

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

3. 在菜单中添加权限标识

   我们在接口依赖中可以看到 `sys:api:add` 之类的值，这些值正是对应着菜单中的权限标识，
   只有它们完全一致，并且用户拥有对应的菜单时，才会获得相应的操作权限

:::

### Casbin

我们在最初架构设计时，参考了 go-admin，gin-vue-admin... 等优秀的开源项目，同时引入了
Casbin，它在众多 python web 开源项目中可能是极为罕见的，并且，它的学习成本非常高，如果你对此感兴趣，可以通过
[Casbin 官网](https://casbin.org/docs/get-started) 进行学习，另外，可参考视频教程
[半小时彻底弄懂Casbin基础模型](https://www.bilibili.com/video/BV1qz4y167XP/?spm_id_from=333.999.0.0&vd_source=958c4d7f9243c68a0ec9dcd327bad930)、
[Casbin的代码使用、api调用、自定义比较方法](https://www.bilibili.com/video/BV13r4y1M7AC/?spm_id_from=333.999.0.0&vd_source=958c4d7f9243c68a0ec9dcd327bad930)
，讲的是非常好

通过以上学习之后，我们再来看内置规则（不学习 == 天书），
你可以通过[编辑器](https://casbin.org/zh/docs/online-editor)进行模型规则验证

模型：

```
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

p 策略：

- 推荐添加基于角色的访问权限, 需配合添加 g 策略才能真正拥有访问权限，适合配置全局接口访问策略<br>
  **格式**: 角色 role + 访问路径 path + 访问方法 method

- 如果添加基于用户的访问权限, 不需配合添加 g 策略就能真正拥有权限，适合配置指定用户接口访问策略<br>
  **格式**: 用户 uuid + 访问路径 path + 访问方法 method

g 策略 (**依赖 p 策略**)：

- 如果在 p 策略中添加了基于角色的访问权限, 则还需要在 g 策略中添加基于用户组的访问权限, 才能真正拥有访问权限<br>
  **格式**: 用户 uuid + 角色 role

- 如果在 p 策略中添加了基于用户的访问权限, 则不添加相应的 g 策略能直接拥有访问权限，但是拥有的不是用户角色的所有权限,
  而只是单一的对应的 p 策略所添加的访问权限

## 解耦

在实际项目开发中，不可能同时存在两种 RBAC 解决方案，我们可以通过以下方式删除其中一种集成

### 角色菜单

- 删除 `backend/common/security/permission.py` 文件中的 `RequestPermission` 类及所有类调用
- 删除 `backend/core/conf.py` 文件中的 `PERMISSION_MODE` 和 `RBAC_ROLE_MENU_EXCLUDE`
- 删除 `backend/common/security/rbac.py` 文件中 `rbac_verify` 方法里面的 `if settings.PERMISSION_MODE == 'role-menu':`
  条件及相关代码

### Casbin

- 删除 `backend/app/admin/api/v1/sys/casbin.py`、`backend/app/admin/crud/crud_casbin.py`、
  `backend/app/admin/model/casbin_rule.py`、`backend/app/admin/schema/casbin_rule.py`、
  `backend/app/admin/service/casbin_service.py` 文件
- 删除 `backend/core/conf.py` 文件中的 `RBAC_CASBIN_EXCLUDE`
- 删除 `backend/common/security/rbac.py` 文件中 `enforcer` 方法
- 删除 `backend/common/security/rbac.py` 文件中 `rbac_verify` 方法里面的 `if settings.PERMISSION_MODE == 'role-menu':`
  条件和 else 条件中的相关代码
- 删除 casbin 相关依赖包
