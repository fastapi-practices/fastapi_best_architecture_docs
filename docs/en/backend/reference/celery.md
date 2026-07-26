---
title: celery
---

Celery is a mature distributed task queue in the Python ecosystem. It has many concepts and can be hard to grasp at first, so this page explains its core components and use cases in the context of fba's integration.

## Why Celery?

Celery is a Python-based distributed task queue system suited for long-running tasks, periodic tasks, and business logic that should run in the background. Tasks are executed by independent Worker processes and do not block the main FastAPI application process, improving API response times and system throughput. Discussion about fba's migration to Celery: [#225](https://github.com/fastapi-practices/fastapi-best-architecture/discussions/225)

## Broker (Message Broker / Middleware)

The [Celery glossary](https://docs.celeryq.dev/projects/celery-enhancement-proposals/en/latest/glossary.html?highlight=broker) describes Broker as follows:

> [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)
> define a [Message Broker](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBroker.html)
> as an architectural building block that can receive
> [messages](https://docs.celeryq.dev/projects/celery-enhancement-proposals/en/latest/glossary.html?highlight=broker#term-Message)
> from multiple destinations, determine the correct destination, and route messages to the correct channel.

In Celery, think of it as a bridge that stores scheduled tasks and delivers messages — it does not execute tasks itself. When a task is scheduled, the Broker stores the task message; when a Worker runs a task, it pulls the task from the Broker. Therefore the Broker is a critical component of Celery.

Celery's [Backends and Brokers](https://docs.celeryq.dev/en/v5.4.0/getting-started/backends-and-brokers/index.html) documentation lists supported message brokers. fba automatically chooses Redis or *RabbitMQ* based on the `ENVIRONMENT` environment variable:

```python
@model_validator(mode='before')
@classmethod
def check_env(cls, values):
    if values['ENVIRONMENT'] == 'prod':
        # dev defaults to redis; prod uses rabbitmq
        values['CELERY_BROKER'] = 'rabbitmq'
    return values
```

## Worker

The Worker is the actual executor of scheduled tasks. It pulls tasks from the Broker and runs them. This is a listening behavior: when the Broker receives scheduling information, the Worker extracts and executes the task.

If no Worker is running, scheduled task messages pile up in the Broker until a Worker receives and executes them.

fba supports quick distributed scaling of Workers via Docker:

```bash
docker compose up -d --scale fba_celery_worker=3
```

## Backend

The [Tasks page](https://docs.celeryq.dev/en/v5.4.0/userguide/tasks.html#result-backends) in the Celery user guide introduces Backend as follows:

> If you want to keep track of tasks or need return values, Celery must store or send the state somewhere so it can be retrieved later. There are several built-in result backends to choose from: SQLAlchemy/Django ORM, Memcached, RabbitMQ/QPid (rpc), and Redis — or you can define your own. No single backend is ideal for every use case. You should understand the strengths and weaknesses of each backend and choose the one that best fits your needs.

In fba we use the database as the default storage backend.

Scenario: track async task results and return them.

You are building a long-running test-report generation task. To show progress on the page, the frontend can call a start-task API. After FastAPI receives the request, it triggers Celery to run the task. The task then runs in Celery without blocking the main FastAPI app or consuming its resources. When the task finishes, FastAPI returns the result and the frontend processes it.

In this scenario, the task stores its result in the Backend. You can see all status information in the Celery state documentation. Celery does not require a Backend to run tasks, but if you need to inspect task results, we recommend using one.

## Elegant Integration

We integrated Celery in fba in a very clean way. You do not need to worry about Celery's strict file structure costs — simple configuration is enough. We also support creating tasks from async functions directly. ==Before Celery 6.0, the official docs did not provide async function support==

Go to the source `backend/app` directory. The `task` directory is our Celery application. If you do not want to use it and prefer another task app, you can delete this folder.

## Execution Pool

Choose different execution pools for workers based on your situation. Currently we recommend:

::: tabs

@tab prefork

Tasks involve heavy computation (image processing, data calculation, etc.)

```bash
celery -A backend.app.task.celery worker -l info -P prefork
```

@tab threads

No async needed

```bash
celery -A backend.app.task.celery worker -l info -P threads
```

@tab gevent

Tasks are mainly I/O-bound and need async operations

```bash
celery -A backend.app.task.celery worker -l info -P gevent
```

:::

## Concurrency

Celery provides the worker concurrency setting `-c`. Reference:

::: tabs

@tab prefork

Recommended concurrency: 1–2× CPU cores

@tab threads

Recommended concurrency: 2–10× CPU cores

@tab gevent

Recommended concurrency: 100–1000

:::

```bash
celery -A backend.app.task.celery worker -l info -P gevent -c 1000
```

## Queues

Celery provides `queue` support. You can add the following to the Celery configuration:

```python
app.conf.task_queues = (
    Queue('cpu_bind', routing_key='cpu'),  # CPU-bound queue
    Queue('io_bind', routing_key='io'),    # I/O-bound queue
    Queue('all_in'),                   # Simple queue without routing key
)
```

When starting a worker, add the `-Q` parameter to specify the queue, for example:

```bash
celery -A backend.app.task.celery worker -l info -P gevent -c 1000 -Q cpu_bind  # start cpu worker
celery -A backend.app.task.celery worker -l info -P gevent -c 1000 -Q io_bind  # start io worker
```

You can then specify the queue when defining tasks:

```python
from backend.app.task.celery import celery_app


@celery_app.task(queue='io_bind')
async def io_bind_task():
    ...
```
