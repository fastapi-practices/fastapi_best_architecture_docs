---
title: 如何使用自定义 header token 实现授权？
createTime: 2025-03-09 18:00
sticky: true
tags:
  - FastAPI
---

在 FastAPI 官方高级安全教程中，为我们介绍了两种授权方式，分别是 OAuth2 scopes 和 HTTP Basic Auth，两种方式都可以实现
Swagger 文档授权，并且可以在文档界面通过直接登录的方式进行快捷授权

以上两种方式虽然可以实现文档内快捷验证，但是它们都使用了表单登录方式，这对于我们来说，并不是一个理想的方案，所以我们在 fba
中使用了 HTTPBearer，这种方式相对于前两种，不够便捷，但同样可以实现文档内自动授权，需要我们先访问登录接口获取 token，然后填入即可

## 为什么是 Bearer Token?

在实际工作中，诸多情况可能都不会使用 bearer token 这种方式，虽然，很多的系统也在使用 token 进行授权，但往往授权方式五花八门，那为什么是
bearer
token？答案是，没有为什么，这只是一种标准方案，可参考文档：[Authentication Schemas ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes)

对于我们常规使用的接口工具，例如 Postman、APIfox 等来讲，它们也都实现了 bearer 这种标准授权方式，可以轻松实现自动授权，具体请以官方教程为准

## 自定义 Token 授权方式

好了，上面扯了那么多，回到正题，如何使用非 bearer token 这种方式，而是设置一个自定义请求头实现授权（这里插一句，本身，怎么实现对于后端来说无所谓，如果前端要求
xxx 实现授权才行，那纯属它们懒，如果是技术规格要求，那就再议）

首先，进入 `backend/common/security/jwt.py` 文件中，找到 `DependsJwtAuth = Depends(HTTPBearer())`，将 `HTTPBearer()` 替换为
`APIKeyHeader(name='xxx')`，name 就是我们的自定义请求头 key；由于我们使用的是 bearer 方式，你还需要修改同文件下的
`get_token()` 方法，如下所示：

```python
def get_token(request: Request) -> str:
    authorization = request.headers.get('xxx')  # name
    if not authorization:
        raise TokenError(msg='Token 无效')
    return token
```

修改 JWT 中间件，如下所示：

```python
# 删除以下代码
scheme, token = get_authorization_scheme_param(token)
if scheme.lower() != 'bearer':
    return
```

至此，你已完成自定义 token 授权，在文档中进行授权时，同样需要你需要先登录获取 token，然后填入

但是这种授权方式，对于接口工具来讲，我们则需要手动在请求头中加入 token，而无法实现自动授权，所以，个人还是比较建议使用标准实施
