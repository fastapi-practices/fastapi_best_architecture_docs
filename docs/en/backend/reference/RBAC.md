---
title: RBAC
---

We implemented easy RBAC integration through custom dependency components that work with FastAPI Depends.

::: caution
Starting from v1.2.0, the default RBAC is [Role-Menu](#role-menu). [Casbin-RBAC](#casbin) is distributed as an external plugin.
:::

## Role-Menu

To enable this RBAC authorization, configure the following:

::: steps

1. Add the API dependency

   This authorization method is only invoked automatically when the following dependency is added to the API:

   ```py{5-6}
   @router.post(
       '',
       summary='xxx',
       dependencies=[
           Depends(RequestPermission('sys:api:add')),  # usually xxx:xxx:xxx
           DependsRBAC,
       ],
   )
   ```

2. Add the permission identifier in the system menu

   In the API dependency you will see values such as `sys:api:add`. These correspond to the permission identifier field on menus. Only when they match exactly and the user has the corresponding menu will they receive the related operation permission.

:::

## Casbin

This is a popular solution in the Go ecosystem. It is very flexible and can define many control rules through models.

To enable this RBAC authorization, first [get the plugin](../../marketplace.md), then:

::: steps

1. Install the plugin

2. Enable authorization

   Set `RBAC_ROLE_MENU_MODE` in `backend/core/conf.py` to `False`

:::

## Decoupling

In real projects you will not keep multiple RBAC solutions at the same time. You can remove the Role-Menu integration as follows:

- Delete the `RequestPermission` class and all its call sites in `backend/common/security/permission.py`
- Delete `RBAC_ROLE_MENU_MODE` and `RBAC_ROLE_MENU_EXCLUDE` from `backend/core/conf.py`
- Delete the `if settings.RBAC_ROLE_MENU_MODE:` branch and related code in the `rbac_verify` method in `backend/common/security/rbac.py`
- Delete the menu `perms` column and related schema fields and SQL scripts
- Delete the button type under the menu `type` column and related code logic and SQL scripts
