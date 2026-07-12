---
url: /fastapi_best_architecture_docs/blog/jwt-middleware.md
---
在构建现代 Web 应用时，安全认证是不可或缺的一环。今天，让我们一起来看看 fba 项目中的 JWT 认证中间件：
`backend/middleware/jwt_auth_middleware.py` 的实现，这将是我们在企业级项目中可应用的最佳实践

## 它解决了什么问题？

如果你正在开发一个需要用户登录的 API 服务，你需要：

* 验证用户身份
* 保护敏感接口
* 在请求间保持用户状态
* 优雅地处理认证失败
* ......

传统方案往往需要你在每个接口中重复编写认证逻辑，或者使用装饰器来包装路由函数，而我们的 JWT 中间件则提供了一种更优雅的集成方式：一次配置，全局生效

## 如何使用它？

例如在 fba 中，我们提供了中间件的统一注册入口：

```python
def register_middleware(app: FastAPI) -> None:
    # ...其他中间件
    app.add_middleware(
        AuthenticationMiddleware,  # 来自 starlette 的认证中间件
        backend=JwtAuthMiddleware(),  # 重写为自定义中间件
        on_error=JwtAuthMiddleware.auth_exception_handler,  # 重写为自定义错误
    )
```

然后在你的路由函数中，就可以直接通过 `request.user` 获取当前登录用户的信息，如下所示：

```python
@router.get("/profile")
async def get_profile(request: Request):
    # 用户信息已经由中间件注入到请求对象中
    current_user = request.user
    return {"user": current_user}
```

我们可以看到，既没有繁琐的依赖注入，也没有重复的认证代码，一切都变得如此简洁

## 与 FastAPI 官方实现的不同之处

FastAPI 官方推荐使用 `OAuth2PasswordBearer` 和依赖注入系统来实现 JWT 认证

```python
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/users/me")
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user
```

这与我们的 JWT 认证中间件相比吗，看起来只是少了几行代码，但背后的差异却很大：

1. **全局一致性**  ：中间件确保了所有请求都经过相同的认证流程，避免了遗漏
2. **错误处理统一**  ：自定义的错误处理器确保了所有认证失败都返回一致的响应格式
3. **代码简洁**  ：路由函数不再需要显式依赖认证逻辑，关注点更加分离
4. **灵活扩展**  ：中间件架构使得添加新的认证方式或权限检查变得简单

## 为什么推荐 JWT 中间件？

在实际项目中，这种基于中间件的 JWT 认证方案有几个明显优势：

### 对开发者友好

fba 一向注重在这方面考量，而使用此中间件，新加入团队的开发者就不再需要了解复杂的认证机制，只需知道 `request.user`
中包含当前用户信息即可。这大大降低了入门门槛，减少了潜在的安全漏洞

### 统一的错误处理

所有认证相关的错误都通过同一个处理器处理，确保了 API 响应的一致性。无论是 Token 过期还是格式错误，客户端都能收到格式统一的错误信息

### 性能考量

中间件只在必要时执行认证逻辑，对于白名单中的路径（如登录接口、健康检查...）会自动跳过，避免了不必要的性能开销，并且还使用
Redis 和 Rust 库对用户信息进行缓存和解析，使其性能影响尽可能降到最低

## 注意事项

这个中间件设计得足够灵活，可以根据项目需求进行多种扩展，但中间件会应用于每个 API 请求（非认证请求和白名单 API
除外），所以一定要考虑扩展功能的适用性和性能
