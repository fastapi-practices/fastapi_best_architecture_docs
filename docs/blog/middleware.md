---
title: FastAPI 如何编写自定义中间件
createTime: 2024-10-31 18:30
tags:
  - FastAPI
---

在编写中间件之前，我们首先要对中间件有一些了解

## 什么是中间件？

中间件是一种可以自定义处理请求和响应的机制，这种机制可以自动应用于每个请求;

工作机制：当在应用程序中发送一个请求时，会在接口路径（可以理解为接口函数）代码执行前获取它，你可以对此请求进行自定义逻辑处理，然后将处理过的请求再交给接口路径继续执行，在接口响应返回前，你也可以提前获取响应，并对响应进行自定义逻辑处理

在编写自定义中间件时，很多佬可能存在误区，比如：我编写了一个处理请求的普通日志函数，并放到了中间件目录作为中间件；错！这并不是一个中间件，而只是一个工具！它不应该被放到中间件目录，而是应该放到中间件文件中或工具目录中

## 如何编写？

中间件的编写方法有三种

### BaseHTTPMiddleware

这种编写方法相对简单

```python
class AccessMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        start_time = timezone.now()
        response = await call_next(request)
        end_time = timezone.now()
        print(f'time: {end_time - start_time}')
        return response
```

编写此类中间件，首先，你要继承 `BaseHTTPMiddleware`，然后重写异步函数：`dispatch()`，在此函数中，`call_next(request)`
之前的代码就是接口路径代码执行前的逻辑处理，之后的代码就是在响应被返回前的逻辑处理，最后，返回响应，至此，你已完成编写自定义中间件

### 纯 ASGI

这种编写方式相对比较复杂

```python
class ASGIMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        await self.app(scope, receive, send)
```

这里包含 [ASGI 规范](https://www.starlette.io/middleware/#pure-asgi-middleware)
，除非经过系统性学习，否则，你不能完成编写此类自定义中间件

### 装饰器

这种方式看起来很好，并且是 fastapi 的官方教程，但这不适用于 fba

```python
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = timezone.now()
    response = await call_next(request)
    end_time = timezone.now()
    print(f'time: {end_time - start_time}')
    return response
```

## 如何使用

进入 fba 项目，找到 `backend/core/registrar.py`，在此文件中找到 `register_middleware()` 函数，这是 fba 的中间件注册函数

在此函数中，==中间件按照从上往下的顺序依次执行==，因此，中间件的顺序非常重要

上面我们提到过使用装饰器编写中间件，但不适用于 fba，经过查看 fastapi 源码，我们发现，此装饰器的本质就是在内部调用了
`add_middleware()` 函数，所以，我们可以直接通过 `app.add_middleware()` 将中间件类添加到应用程序中，这种方式也更符合 fba
当前的编码风格
