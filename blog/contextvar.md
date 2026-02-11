---
url: /fastapi_best_architecture_docs/blog/contextvar.md
---
在异步编程和并发场景中，如何优雅地管理上下文相关的状态变量？传统的全局变量容易导致状态污染，而线程本地存储（
`threading.local`）又不适合异步任务的嵌套执行

`ContextVar` 正是为此而生，它允许在同一个线程中，根据不同的执行上下文（如协程或任务）持有不同的变量值，而无需显式传递参数

## 什么是 ContextVar？

`ContextVar` 是 `contextvars` 模块的核心类，用于声明和管理上下文变量。它类似于线程本地存储，但专为异步执行环境设计。在
Python 的异步框架如 `asyncio` 中，多个协程可能在同一线程中并发运行，如果使用全局变量，状态很容易在任务间“泄露”。`ContextVar`
通过维护一个每个线程的上下文栈来解决这个问题：每个上下文（`Context` 对象）可以持有变量的快照，进入新上下文时会推入栈顶，退出时自动回滚。

简单来说，`ContextVar` 让你在代码中隐式访问上下文特定的值，比如当前请求的日志追踪 ID，而不用层层传递参数。这在
Web 框架（如 FastAPI 或 Starlette）中特别常见。

## 核心类和方法

`contextvars` 模块主要包含三个类：`ContextVar`、`Token` 和 `Context`。下面是它们的简要说明：

### ContextVar

用于声明上下文变量

* 构造函数：`ContextVar(name, default=None)`，其中 `name` 是字符串用于调试，`default` 是默认值
* 方法：
  * `get(default=None)`：获取当前上下文的值，如果未设置则返回 `default` 或抛出 `LookupError`
  * `set(value)`：设置当前上下文的值，返回一个 `Token` 对象用于回滚
  * `reset(token)`：使用 `Token` 恢复上一个值

### Token

`set()` 返回的对象，用于追踪和恢复变量的旧值

它有属性如 `old_value`（旧值）和 `var`（关联的 `ContextVar`）。从 Python 3.14 开始，`Token` 支持上下文管理器协议，便于使用
`with` 语句

### Context

表示一个上下文映射（类似于字典），管理变量的状态

* `copy_context()`：复制当前上下文（O(1) 复杂度）
* `run(callable, *args, **kwargs)`：在指定上下文中执行可调用对象，执行后自动回滚变化

## 基本使用示例

假设我们有一个名为 `user_id` 的上下文变量，用于追踪当前用户的 ID。

```python
import contextvars

# 声明上下文变量，设置默认值
user_id = contextvars.ContextVar('user_id', default='anonymous')

# 获取当前值
print(user_id.get())  # 输出: anonymous

# 设置新值，返回 Token
token = user_id.set('alice')
print(user_id.get())  # 输出: alice

# 使用 Token 回滚
user_id.reset(token)
print(user_id.get())  # 输出: anonymous
```

再看一个使用 `Token` 作为上下文管理器的例子（Python 3.14+）：

```python
user_id = contextvars.ContextVar('user_id', default='anonymous')

with user_id.set('bob'):
    print(user_id.get())  # 输出: bob
    # 在 with 块内，所有访问都会看到 'bob'

print(user_id.get())  # 输出: anonymous（自动回滚）
```

这比手动 `reset` 更安全，避免了遗忘回滚的风险

## 在异步编程中的应用

`ContextVar` 的真正威力在异步环境中显现。以 `asyncio` 为例，我们可以构建一个简单的回显服务器，其中每个客户端连接的地址存储在上下文中，其他函数无需参数即可访问

```python
import asyncio
import contextvars

# 声明任务 ID 变量
task_id_var = contextvars.ContextVar('task_id', default='none')

async def sub_task():
    # 无需传递参数，直接从上下文中获取
    task_id = task_id_var.get()
    print(f"Sub task running with task_id: {task_id}")
    await asyncio.sleep(0.1)  # 模拟工作

async def main_task(task_id):
    token = task_id_var.set(task_id)
    try:
        await sub_task()
    finally:
        task_id_var.reset(token)

async def main():
    # 并发运行多个任务
    await asyncio.gather(
        main_task('task1'),
        main_task('task2')
    )

# 运行示例
asyncio.run(main())
```

运行这个代码，你会看到输出：

```text
Sub task running with task_id: task1
Sub task running with task_id: task2
```

在这个例子中，sub\_task() 函数无需知道任务 ID，就能从当前上下文中读取它。即使在 asyncio.gather
的并发执行中，每个任务的值也会正确隔离，不会与其他任务混淆。这比显式传递参数更简洁，尤其在深层嵌套的异步调用链中

另一个常见场景是日志追踪：在 ASGI 应用中，将请求 ID 存入 `ContextVar`，然后在任何下游函数中自动注入到日志中

## 与 threading.local 的区别

`threading.local` 提供线程本地存储，每个线程有独立的变量副本，适合多线程程序。但在异步代码中，所有协程共享同一线程，导致
`local` 值在任务间泄露

`ContextVar` 则基于执行上下文栈，支持协程的嵌套和切换：每个任务或生成器有自己的视图，变化在退出时自动回滚

简单比较：

| 特性   | ContextVar             | threading.local |
|------|------------------------|-----------------|
| 适用场景 | 异步/协程（asyncio）         | 多线程             |
| 隔离粒度 | 执行上下文（任务/生成器）          | 线程              |
| 回滚机制 | 自动（通过 Token 或 Context） | 无需回滚，线程隔离       |
| 性能开销 | 低（O(1) 复制）             | 低               |

如果你在用 `asyncio`，优先选择 `ContextVar`

## 注意事项

* **创建位置**：始终在模块顶层创建 `ContextVar`，避免在闭包或函数内创建，否则可能导致内存泄漏（上下文持有强引用）
* **默认值**：使用 `default` 参数避免 `LookupError`，但在异步中要小心默认值的共享
* **兼容性**：Python 3.7+ 支持，原生集成 `asyncio`。在多线程中，每个线程有独立栈
* **调试**：通过 `name` 属性和 `Context.items()` 检查变量状态
