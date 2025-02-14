---
title: 路由
---

FBA 中的路由遵循 Restful API 规范

## 路由结构

我们有一个关于路由器的历史讨论，如果你感兴趣，可以查看：[#4](https://github.com/fastapi-practices/fastapi_best_architecture/discussions/4)

当前路由结构如下所示：

::: file-tree

- backend 后端
    - app 应用
        - xxx 自定义应用（包含子包）
            - api 接口
                - v1
                    - xxx 子包
                        - __init\_\_.py 在此文件内注册子包内 xxx.py 文件中的路由
                        - xxx.py
                        - ...
                - __init\_\_.py
                - router.py 在此文件内注册所有子包 __init\_\_.py 文件中的路由
        - xxx 自定义应用（不包含子包）
            - api 接口
                - v1
                    - _\_init\_\_.py 不做任何操作
                    - xxx.py
                    - ...
                - __init\_\_.py
                - router.py 在此文件内注册所有 xxx.py 文件中的路由
    - __init\_\_.py
    - router.py 在此文件内注册所有 app 目录下 router.py 文件中的路由

:::

::: warning
我们统一命名了所有接口路由参数为 router，这很有助于我们编写接口，但是，不可忽略的是，在注册路由时，一定要注意我们的导入方式

在 FBA 中，我们可以查看所有路由的导入，它们看起来像 `from backend.app.admin.api.v1.sys.api import router as api_router`
，我们这里务必导入文件内的路由参数 `router`，为了避免参数名称冲突，我们可以使用 `as` 为路由参数起一个别名
:::
