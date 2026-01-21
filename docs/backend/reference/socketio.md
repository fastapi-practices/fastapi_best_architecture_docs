---
title: Socketio
---

## 为什么不用 ws

WebSocket 已被集成到 fastapi 中，并且可以直接使用，为什么还要 socketio？原因有很多，可以简单概括为 socektio 功能性和稳定性更高，如果使用
ws，很多东西可能还要手搓封装，但 socektio 把这些东西基本都写好了，所以，何乐而不为呢

## 什么是 socketio？

socketio 是一种传输协议，可以在客户端和服务器之间实现基于事件的实时双向通信

没有 socketio 时：

你的 leader 在出差，给你任命了一项非常着急的任务，这项任务就等同于事件，但你并不能很快的完成此任务，可是你的 leader
过一会儿就会问你怎么样了（轮询），你很烦，不想理他（延迟反应）

使用 socketio 时：

你的 leader 就坐在你的旁边，你的工作效率飞升，马上就完成了任务，并且直接口头传达了完成，他立马就听见了（实时）

## 集成

在 fba 中，你可以在 `backend/common/socketio/` 目录下查阅本地 socketio 实现，其中包含两个文件

`actions.py`：此文件主要用于定义一些全局事件，方便我们对事件进行统一管理

`server.py`：此文件是在 fba 中的服务端标准实现，其中包含 socketio 授权连接

但这些并不是主要集成代码，我们可以进入 `backend/core/register.py` 文件，找到以下方法

```python
def register_socket_app(app: FastAPI):
    """
    socket 应用

    :param app:
    :return:
    """
    from backend.common.socketio.server import sio

    socket_app = socketio.ASGIApp(
        socketio_server=sio,
        other_asgi_app=app,
        # 切勿删除此配置：https://github.com/pyropy/fastapi-socketio/issues/51
        socketio_path='/ws/socket.io',
    )
    app.mount('/ws', socket_app)
```

我们通过 `python-socketio` ASGI 应用定义方式，分别将 socketio 和 fastapi 应用作为参数填入，此时你已创建了一个 socket
应用，然后我们通过 fastapi 内置的挂载功能，将 socket 应用挂载到 fastapi 应用中，至此，你已完成 fastapi 集成 socketio
