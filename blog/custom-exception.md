---
url: /fastapi_best_architecture_docs/blog/custom-exception.md
---
我们为 fba 精心设计了全局异常拦截器，它可以自动拦截所有异常信息，并按照标准化的返回信息进行异常信息返回

## 异常拦截器

在异常拦截器中，我们按照标准错误码进行错误处理

在响应中，我们存在两种状态码，分别为返回信息中的状态码和响应状态码；其中，响应状态码默认为编码级，前端完全可以根据此状态码进行异常处理页面跳转，例如，403（无权限操作），404（资源不存在）等等，而返回信息状态码为自定义级，可以在返回时任意自定义

响应状态码遵循 RFC 定义，如果不符合标准，则将状态码处理为 400

```python
def _get_exception_code(status_code: int) -> int:
    """
    获取返回状态码（可用状态码基于 RFC 定义）

    `python 状态码标准支持 <https://github.com/python/cpython/blob/6e3cc72afeaee2532b4327776501eb8234ac787b/Lib/http/__init__.py#L7>`__

    `IANA 状态码注册表 <https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml>`__

    :param status_code: HTTP 状态码
    :return:
    """
    try:
        STATUS_PHRASES[status_code]
        return status_code
    except Exception:
        return StandardResponseCode.HTTP_400
```

异常拦截器还包含：fastapi 数据校验异常，pydantic 数据校验异常，python assert 断言异常，全局未知（未定义）异常，跨域异常，自定义异常，详情请查看：
`backend/common/exception/exception_handler.py`

## 后台任务

了解完异常处理器之后，再来讲讲如何自定义异常，我们先看下面这段代码，这是自定义异常的

```python
class BaseExceptionMixin(Exception):
    code: int

    def __init__(self, *, msg: str = None, data: Any = None, background: BackgroundTask | None = None):
        self.msg = msg
        self.data = data
        # The original background task: https://www.starlette.io/background/
        self.background = background
```

在这段代码中，我们有一个参数为 `background`（由于 fastapi 继承了 starlette，这意味者，fastapi 拥有 starlette
中的所有功能，所以，这里的注释，我们直接导航到了 starlette），它可以让我们添加后台任务，这遵循了 starlette 的后台任务处理，所以，你不仅可以使用
fastapi 中的后台任务定义方式，还完全可以使用 statlette 中的后台任务定义方式

请注意 ==后台任务应附加到响应，并且仅在发送响应后才运行=={.tip}
，这非常重要！并且，任务按顺序执行。如果其中一个任务引发异常，则后面的任务将没有机会执行。所以，我们只推荐为极小的任务使用此方式进行处理！

## 自定义异常

上方我们已经介绍完了自定义异常中包含的其他附加业务，下方我们来讲下如何自定义异常，在文件
`backend/common/exception/errors.py` 中，我们内置了多种自定义异常类，它们结构基本相当，例如：

```python
class NotFoundError(BaseExceptionMixin):
    code = StandardResponseCode.HTTP_404

    def __init__(self, *, msg: str = 'Not Found', data: Any = None, background: BackgroundTask | None = None):
        super().__init__(msg=msg, data=data, background=background)
```

这是我们经常使用的错误类之一，其中，参数 `code` 被定义为编码级响应状态码，参数 `msg`、`data` 对应在返回信息中，fba
会在内部自动处理，参数 `background` 正式我们上方所讲的后台任务

我们来动手试着定义一个：

```python
class 自定义错误类(BaseExceptionMixin):
    code = 遵循 RFC 定义的响应状态码
    
    def __init__(self, *, msg: str = '自定义', data: Any = None, background: BackgroundTask | None = None):
        super().__init__(msg=msg, data=data, background=background)
```

## 如何使用

使用方式非常简单，我们在 fba 代码内任意位置直接使用 `raise errors.xxxError(msg='xxx')` 即可，自定义异常会在异常处理器中自动处理并返回
