---
title: How to Customize Exceptions in FastAPI
createTime: 2025-01-26 16:43
tags:
  - FastAPI
permalink: /blog/6b7bmjpp/
---

We carefully designed a global exception interceptor for fba. It automatically intercepts all exceptions and returns them in a standardized response format.

## Exception Interceptor

In the exception interceptor, we handle errors according to standard status codes.

Responses have two kinds of status codes: the code in the response body, and the HTTP response status code. The HTTP status code is code-level by default — the frontend can use it for error page routing, e.g. 403 (forbidden), 404 (not found). The body status code is custom and can be set freely on return.

HTTP status codes follow RFC definitions. Non-standard codes are normalized to 400.

```python
def _get_exception_code(status_code: int) -> int:
    """
    Get a return status code (supported codes are based on RFC definitions)

    `Python status code standard support <https://github.com/python/cpython/blob/6e3cc72afeaee2532b4327776501eb8234ac787b/Lib/http/__init__.py#L7>`__

    `IANA status code registry <https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml>`__

    :param status_code: HTTP status code
    :return:
    """
    try:
        STATUS_PHRASES[status_code]
        return status_code
    except Exception:
        return StandardResponseCode.HTTP_400
```

The interceptor also covers: FastAPI validation errors, Pydantic validation errors, Python assert errors, global unknown (undefined) errors, CORS errors, and custom exceptions. See:
`backend/common/exception/exception_handler.py`

## Background Tasks

After the exception handler, let's cover custom exceptions. Look at this code — this is the custom exception base:

```python
class BaseExceptionMixin(Exception):
    code: int

    def __init__(self, *, msg: str = None, data: Any = None, background: BackgroundTask | None = None):
        self.msg = msg
        self.data = data
        # The original background task: https://www.starlette.io/background/
        self.background = background
```

There is a `background` parameter (because FastAPI inherits Starlette, FastAPI has all Starlette features — so the comment links to Starlette). It lets you attach background tasks, following Starlette's background task handling. You can use either FastAPI's or Starlette's background task definition style.

Note that ==background tasks should be attached to the response and run only after the response is sent=={.tip}. This is important! Tasks run in order. If one raises, later tasks will not run. We only recommend this for very small tasks!

## Custom Exceptions

We have covered the extra concerns in custom exceptions. Now, how to define one. In `backend/common/exception/errors.py` we built several custom exception classes with similar structure, for example:

```python
class NotFoundError(BaseExceptionMixin):
    code = StandardResponseCode.HTTP_404

    def __init__(self, *, msg: str = 'Not Found', data: Any = None, background: BackgroundTask | None = None):
        super().__init__(msg=msg, data=data, background=background)
```

This is one we use often. `code` is the code-level HTTP response status; `msg` and `data` map into the response body and are handled automatically by fba; `background` is the background task described above.

Try defining one yourself:

```python
class CustomError(BaseExceptionMixin):
    code = # RFC-compliant response status code
    
    def __init__(self, *, msg: str = 'Custom', data: Any = None, background: BackgroundTask | None = None):
        super().__init__(msg=msg, data=data, background=background)
```

## How to Use

Usage is simple: anywhere in fba code, `raise errors.xxxError(msg='xxx')`. Custom exceptions are handled automatically by the exception handler and returned.
