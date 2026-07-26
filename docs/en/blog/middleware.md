---
title: How to Write Custom Middleware in FastAPI
createTime: 2024-10-31 18:30
tags:
  - FastAPI
permalink: /blog/sj92xxdl/
---

Before writing middleware, we need a basic understanding of it.

## What Is Middleware?

Middleware is a mechanism for custom request and response handling that can apply automatically to every request.

How it works: when a request is sent in the application, it is obtained before the route path (the route function) runs. You can apply custom logic, then pass the processed request to the route. Before the response is returned, you can also obtain the response early and apply custom logic to it.

A common misconception when writing custom middleware: “I wrote a normal logging function for requests and put it in the middleware directory as middleware.” Wrong! That is not middleware — it is only a utility. It should not live in the middleware directory; put it inside a middleware file or a utilities directory.

## How to Write It?

There are three ways to write middleware.

### BaseHTTPMiddleware

This approach is relatively simple:

```python
class AccessMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        start_time = timezone.now()
        response = await call_next(request)
        end_time = timezone.now()
        print(f'time: {end_time - start_time}')
        return response
```

To write this kind of middleware, inherit `BaseHTTPMiddleware` and override the async function `dispatch()`. Code before `call_next(request)` runs before the route; code after runs before the response is returned. Finally return the response — you have written custom middleware.

### Pure ASGI

This approach is more complex:

```python
class ASGIMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        await self.app(scope, receive, send)
```

This involves the [ASGI specification](https://www.starlette.io/middleware/#pure-asgi-middleware). Without systematic study, you cannot complete this style of custom middleware.

### Decorator

This looks nice and is FastAPI's official tutorial, but it does not fit fba:

```python
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = timezone.now()
    response = await call_next(request)
    end_time = timezone.now()
    print(f'time: {end_time - start_time}')
    return response
```

## How to Use

In the fba project, open `backend/core/registrar.py` and find `register_middleware()` — fba's middleware registration function.

In this function, ==middleware runs from bottom to top=={.note}, so order is very important.

We mentioned decorator middleware above, but it does not fit fba. Looking at FastAPI source, the decorator essentially calls `add_middleware()` internally. So we can add middleware classes with `app.add_middleware()` directly — this better matches fba's coding style.
