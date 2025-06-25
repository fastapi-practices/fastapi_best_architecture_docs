---
title: 节流
---

fba 内部使用 [fastapi-limit](https://github.com/fastapi-practices/fastapi_best_architecture/discussions/70)
实现后端接口节流

```python{1,6,11-17,25,29}
@app.get("/", dependencies=[Depends(RateLimiter(times=2, seconds=5))])
async def index_get():
    return {"msg": "Hello World"}


@app.post("/", dependencies=[Depends(RateLimiter(times=1, seconds=5))])
async def index_post():
    return {"msg": "Hello World"}


@app.get(
    "/multiple",
    dependencies=[
        Depends(RateLimiter(times=1, seconds=5)),
        Depends(RateLimiter(times=2, seconds=15)),
    ],
)
async def multiple():
    return {"msg": "Hello World"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    ratelimit = WebSocketRateLimiter(times=1, seconds=5)
    while True:
        try:
            data = await websocket.receive_text()
            await ratelimit(websocket, context_key=data)
            await websocket.send_text("Hello, world")
        except HTTPException:
            await websocket.send_text("Hello again")
```

更多使用方法请查看官方仓库 [示例](https://github.com/long2ice/fastapi-limiter/blob/master/examples/main.py)
或 [源码](https://github.com/long2ice/fastapi-limiter/blob/master/fastapi_limiter/depends.py)
