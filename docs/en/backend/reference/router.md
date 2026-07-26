---
title: Router
---

::: tip
Before adding APIs, use [fba skills](https://skills.sh/fastapi-practices/skills/fba) to align route structure, router import aliases, CurrentSession / CurrentSessionTransaction, and response model usage.
:::

Routes in fba follow RESTful API conventions.

## Route Structure

We have a historical discussion about routers. If you are interested, see: [#4](https://github.com/fastapi-practices/fastapi-best-architecture/discussions/4)

The current route structure looks like this:

::: file-tree

- backend # Backend
    - app # Applications
        - xxx # Custom app <Badge type="warning" text="with subpackages" />
            - api # APIs
                - v1
                    - xxx # Subpackage
                        - __init__.py # Register routes from xxx.py files in this package
                        - xxx.py
                        - ...
                - __init__.py
                - router.py # Register routes from all subpackage __init__.py files
        - xxx # Custom app <Badge type="warning" text="without subpackages" />
            - api # APIs
                - v1
                    - __init__.py # No-op
                    - xxx.py
                    - ...
                - __init__.py
                - router.py # Register routes from all xxx.py files
    - __init__.py
    - router.py # Register routes from all router.py files under app

:::

::: warning
We uniformly name all API route parameters as `router`, which helps when writing endpoints. When registering routes, pay close attention to how you import them.

In fba, all route imports look like `from backend.app.admin.api.v1.sys.user import router as user_router`. Always import the `router` parameter from the file. To avoid name conflicts, use `as` to give the route parameter an alias.
:::
