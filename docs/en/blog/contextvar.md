---
title: 'ContextVar: Context Management for Async Programming'
createTime: 2025-10-13 18:30
sticky: true
tags:
  - Python
permalink: /blog/0rcz5nnf/
---

In async programming and concurrency, how do you manage context-related state cleanly? Traditional globals easily pollute state, and thread-local storage (`threading.local`) does not fit nested async task execution.

`ContextVar` exists for this: it lets different execution contexts (such as coroutines or tasks) hold different values in the same thread, without explicitly passing parameters.

## What Is ContextVar?

`ContextVar` is the core class in the `contextvars` module for declaring and managing context variables. It is similar to thread-local storage, but designed for async execution. In Python async frameworks such as `asyncio`, multiple coroutines may run concurrently on the same thread; with globals, state easily “leaks” across tasks. `ContextVar` solves this with a per-thread context stack: each context (`Context` object) can hold a snapshot of variables; entering a new context pushes onto the stack, and exiting rolls back automatically.

In short, `ContextVar` lets you implicitly access context-specific values — such as a request log trace ID — without threading parameters through every layer. This is especially common in web frameworks like FastAPI or Starlette.

## Core Classes and Methods

The `contextvars` module mainly includes three classes: `ContextVar`, `Token`, and `Context`. Brief notes:

### ContextVar

Declares a context variable.

- Constructor: `ContextVar(name, default=None)`, where `name` is a string for debugging and `default` is the default value
- Methods:
    - `get(default=None)`: get the current context value; if unset, return `default` or raise `LookupError`
    - `set(value)`: set the current context value; returns a `Token` for rollback
    - `reset(token)`: restore the previous value using a `Token`

### Token

Object returned by `set()`, used to track and restore the old value.

It has attributes such as `old_value` (previous value) and `var` (associated `ContextVar`). From Python 3.14, `Token` supports the context manager protocol for use with `with`.

### Context

A context mapping (dictionary-like) that manages variable state.

- `copy_context()`: copy the current context (O(1) complexity)
- `run(callable, *args, **kwargs)`: run a callable in a given context; changes roll back automatically after execution

## Basic Usage Example

Suppose we have a context variable `user_id` for tracking the current user ID.

```python
import contextvars

# Declare a context variable with a default
user_id = contextvars.ContextVar('user_id', default='anonymous')

# Get current value
print(user_id.get())  # Output: anonymous

# Set a new value; returns Token
token = user_id.set('alice')
print(user_id.get())  # Output: alice

# Roll back with Token
user_id.reset(token)
print(user_id.get())  # Output: anonymous
```

Here is using `Token` as a context manager (Python 3.14+):

```python
user_id = contextvars.ContextVar('user_id', default='anonymous')

with user_id.set('bob'):
    print(user_id.get())  # Output: bob
    # Inside the with block, all access sees 'bob'

print(user_id.get())  # Output: anonymous (auto rollback)
```

This is safer than manual `reset` and avoids forgetting to roll back.

## Use in Async Programming

`ContextVar` really shines in async environments. With `asyncio`, we can build a simple echo-style pattern where each task's ID is stored in context and other functions access it without parameters:

```python
import asyncio
import contextvars

# Declare a task ID variable
task_id_var = contextvars.ContextVar('task_id', default='none')

async def sub_task():
    # No need to pass parameters — read from context
    task_id = task_id_var.get()
    print(f"Sub task running with task_id: {task_id}")
    await asyncio.sleep(0.1)  # Simulate work

async def main_task(task_id):
    token = task_id_var.set(task_id)
    try:
        await sub_task()
    finally:
        task_id_var.reset(token)

async def main():
    # Run multiple tasks concurrently
    await asyncio.gather(
        main_task('task1'),
        main_task('task2')
    )

# Run the example
asyncio.run(main())
```

Running this code, you will see:

```text
Sub task running with task_id: task1
Sub task running with task_id: task2
```

Here, `sub_task()` does not need to know the task ID — it reads it from the current context. Even under concurrent `asyncio.gather` execution, each task's value is correctly isolated and not mixed with others. This is cleaner than explicit parameter passing, especially in deep async call chains.

Another common case is log tracing: in an ASGI app, store the request ID in a `ContextVar`, then inject it automatically into logs in any downstream function.

## Differences from threading.local

`threading.local` provides thread-local storage — each thread has an independent copy, suitable for multi-threaded programs. In async code, all coroutines share one thread, so `local` values leak across tasks.

`ContextVar` is based on an execution context stack and supports coroutine nesting and switching: each task or generator has its own view, and changes roll back on exit.

Quick comparison:

| Feature | ContextVar | threading.local |
|------|------------------------|-----------------|
| Use case | Async/coroutines (asyncio) | Multi-threading |
| Isolation | Execution context (task/generator) | Thread |
| Rollback | Automatic (via Token or Context) | Not needed; thread isolation |
| Overhead | Low (O(1) copy) | Low |

If you use `asyncio`, prefer `ContextVar`.

## Notes

- **Where to create**: Always create `ContextVar` at module top level. Creating inside closures or functions can cause memory leaks (contexts hold strong references)
- **Defaults**: Use `default` to avoid `LookupError`, but be careful about shared defaults in async code
- **Compatibility**: Supported since Python 3.7, natively integrated with `asyncio`. In multi-threading, each thread has an independent stack
- **Debugging**: Inspect state via the `name` attribute and `Context.items()`
