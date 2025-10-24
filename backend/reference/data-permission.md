---
url: /fastapi_best_architecture_docs/backend/reference/data-permission.md
---
数据权限是为了给数据添加权限而建立的，我们最常见的实现方式是仅本人数据，本部门数据...
这些就是所谓的数据权限，你可以控制不同的角色拥有不同的数据权限，从而实现用户和数据的隔离

## 弊端

如上所述，我们常见的这种数据权限，在大多数情况下，也能够满足日常场景所需，但是，这种常见的方式存在严重的弊端。由于数据权限的数据过滤是通过
SQL 语句拼接进行实现的，而这些固定权限，直接写死了数据权限的要求，例如：业务表必须包含 dept\_id 和 created\_by 字段，
如果没有这些业务字段，你就无法通过 SQL 来控制数据权限，下面是我对这种常规数据权限的实现，仅供参考：

@[code python](../../code/data_perm.py)

请注意，当前 fba 中已删除此集成方式，你需要自行更新角色 model、schema，添加数据权限控制标识字段 data\_scope 等相关代码

## 想法

有没有一种更加灵活的方案呢，答案是，当然有，目前，我们在 fba
中实现的正式超灵活方案，但是相对于常见方案来讲，可配更加复杂，但我们仍有很大的优化空间

你可以直接查看代码源文件 `backend/common/security/permission.py`，其中，filter\_data\_permission
方法正是我们使用灵活方案，它与常规数据权限使用近乎相同的方式实现数据过滤，但由于其复杂性，下面，我们将通过视频进行讲解： [数据权限管理](https://www.bilibili.com/video/BV13hioY1EQU/?share_source=copy_web\&vd_source=ccb2aae47e179a51460c20d165021cb7)
