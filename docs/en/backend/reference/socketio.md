---
title: Socket.IO
---

## Why Not Raw WebSockets?

FastAPI already supports WebSocket directly. fba still integrates Socket.IO because it provides a more complete package around event models, automatic reconnection, rooms, broadcasting, and client ecosystems. For real-time notifications, task progress updates, and similar scenarios, Socket.IO can save a large amount of custom protocol and connection-management code.

## What Is Socket.IO?

Socket.IO is an event-based real-time bidirectional communication solution for passing event messages between clients and servers.

Without Socket.IO:

Your leader is on a business trip and assigns you an urgent task. That task is like an event. You cannot finish it immediately, but your leader keeps asking how it is going (polling). You get annoyed and ignore them (delayed reaction).

With Socket.IO:

Your leader sits right next to you. Your efficiency soars, you finish the task quickly, and tell them verbally. They hear it immediately (real time).

## Integration

In fba, you can inspect the local Socket.IO implementation under `backend/common/socketio/`, which contains two files:

`actions.py`: mainly defines global events for unified event management

`server.py`: the standard server-side implementation in fba, including Socket.IO authorized connections

These are not the main integration code. Open `backend/core/registrar.py` and find the following method:

```python
def register_socket_app(app: FastAPI) -> None:
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

Here an ASGI app is created with `python-socketio`, and the Socket.IO server instance plus FastAPI app are passed in. FastAPI's `mount()` method then mounts the Socket.IO app at `/ws`, completing real-time communication integration.
