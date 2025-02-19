---
title: 鉴权
---

在 fba 中，我们主要通过 [JWT](./jwt.md) 和 [RBAC](./RBAC.md) 实现鉴权，但它们的控制方式有所不同

## JWT

在文件 `backend/common/security/jwt.py` 中，包含以下代码

```python
# JWT authorizes dependency injection
DependsJwtAuth = Depends(HTTPBearer())
```

我们通过在接口函数中添加此依赖实现 JWT 快速校验，它可以帮助我们检查请求头中是否包含 Bearer Token，使用方式参考如下：

```python{1}
@router.get('/hello', summary='你好', dependencies=[DependsJwtAuth])
async def hello():
    ...
```

## RBAC

请参考 [RBAC](./RBAC.md#角色菜单) 相关内容
