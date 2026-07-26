---
title: Rate Limiting
---

In modern web development, API rate limiting is an important mechanism for protecting backend services, preventing resource abuse, and ensuring service stability. We have a historical discussion on this topic if you are interested: [#70](https://github.com/fastapi-practices/fastapi-best-architecture/discussions/70)

## Processing Flow

The full flow when RateLimiter handles a request:

```mermaid
graph TD
    A[Request enters route dependency] --> B[Initialize Bucket and Limiter]
    B --> C[Get Identifier]
    C --> D[Async acquire attempt]
    D -->|Acquired| E[Allow request, continue business processing]
    D -->|Failed| F[Compute Retry-After]
    F --> G[Run Callback<br/>(default: raise 429)]
```

## Usage

RateLimiter is designed as a FastAPI dependency and is injected with `Depends` on routes.

### Single-rule Rate Limiting

```python
# Max 60 requests per minute
from fastapi import Depends
from pyrate_limiter import Duration, Rate

from backend.utils.limiter import RateLimiter


@app.get(
    "/api/example", 
    dependencies=[Depends(RateLimiter(Rate(60, Duration.MINUTE)))]
)
async def example():
    return {"message": "success"}
```

### Multi-rule Composite Rate Limiting

```python
# 10 per second + 100 per minute
from fastapi import Depends
from pyrate_limiter import Duration, Rate

from backend.utils.limiter import RateLimiter


@app.post(
    "/api/heavy", 
    dependencies=[
        Depends(
            RateLimiter(
                Rate(10, Duration.SECOND),
                Rate(100, Duration.MINUTE),
            )
        )
    ]
)
async def heavy_endpoint():
    return {"status": "ok"}
```

### Custom Identifier

```python
from fastapi import Depends, Request
from pyrate_limiter import Duration, Rate

from backend.utils.limiter import RateLimiter


async def user_identifier(request: Request) -> str:
    return f'user:{request.user.id}'


@app.get(
    "/api/user-data",
    dependencies=[
        Depends(
            RateLimiter(
                Rate(50, Duration.MINUTE),
                identifier=user_identifier,
            )
        )
    ]    
)
async def user_data():
    return {"data": "protected"}
```
