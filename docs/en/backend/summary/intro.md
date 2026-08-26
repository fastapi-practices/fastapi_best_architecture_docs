---
title: Overview
---

Enterprise-grade backend architecture solution built with FastAPI

## Three-layer Architecture

MVC is a common design pattern in Python web projects. fba uses a three-layer architecture that is closer to backend engineering practice, splitting API, business, and data-access boundaries for easier collaboration and maintenance.

::: warning
Please note

fba does not use a traditional multi-app or microservice directory layout. Directories follow FastAPI backend engineering practice — see [Project Structure](#project-structure).

If this structure does not fit your team, you can adjust it while keeping the layer boundaries.
:::

| Module | Java | fastapi-best-architecture |
|------|----------------|---------------------------|
| View | controller | api |
| Data transfer | dto | schema |
| Business logic | service + impl | service |
| Data access | dao / mapper | crud |
| Model | entity | model |

## Features

- [x] Fully async design (async/await + asgiref)
- [x] RESTful API design conventions
- [x] Modern SQLAlchemy 2.0 syntax
- [x] Full-stack validation with Pydantic v2
- [x] Role-menu RBAC permission control
- [x] Native Celery async task support
- [x] High-performance custom JWT auth middleware
- [x] Global custom timezone handling
- [x] One-click Docker / Docker Compose deployment
- [x] Integrated Pytest unit tests
- [x] Grafana end-to-end observability

## Built-in Capabilities

- [x] User management: flexible role and permission assignment
- [x] Department management: easy org structure building
- [x] Menu management: permission control down to button level
- [x] Role management: one-stop role permission assignment
- [x] Dictionary management: unified global parameters
- [x] Parameter management: runtime dynamic system config
- [x] Notices: publish system messages quickly
- [x] Token management: online monitoring + force logout
- [x] Multi-client login: switch multi-terminal modes easily
- [x] Custom OAuth 2.0: ready-to-use authorization login
- [x] Plugin system: zero-coupling extension and composition
- [x] Scheduled tasks: flexible async job scheduling
- [x] Code generation: one-click preview, write, and download
- [x] Operation logs: complete normal/exception records
- [x] Login logs: detailed login behavior tracking
- [x] Cache monitoring: real-time cache statistics
- [x] Server monitoring: hardware and status at a glance
- [x] API docs: interactive Swagger generated automatically

## Project Structure

::: file-tree

- backend # Backend
    - alembic/ # Database migrations
    - app # Application
        - admin/ # System admin
            - api/ # API
            - crud/ # CRUD
            - model # Models
                - __init__.py # Import all model classes here
                - …
            - schema/ # Data transfer
            - service/ # Services
            - tests/ # Unit tests
        - task/ # Tasks
        - …
    - common/ # Shared resources
    - core/ # Core config
    - database/ # Database connections
    - locale/ # i18n language packs
    - log/ # Logs
    - middleware/ # Middleware
    - plugin # Plugins
        - code_generator/ # Code generation
        - …
    - scripts/ # Scripts
    - sql/ # Init SQL files
    - static/ # Static files
    - tests/ # Global test helpers
    - utils/ # Utilities
- deploy/ # Deployment config
- …

:::

## Contributors

[![contributors](https://contrib.rocks/image?repo=fastapi-practices/fastapi-best-architecture)](https://github.com/fastapi-practices/fastapi-best-architecture/graphs/contributors)

## License

This project is licensed under the [MIT](https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/LICENSE) License.

[![Stargazers over time](https://starchart.cc/fastapi-practices/fastapi-best-architecture.svg?variant=adaptive)](https://starchart.cc/fastapi-practices/fastapi-best-architecture)

## Special Thanks

- [downdawn](https://github.com/downdawn) for actively driving the creation of this project
- [无名](https://github.com/lvright) for the carefully designed LOGO (an abstract combination of the letters fba, forming a lightning-like mark projected from the ground)
- [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) for powering the official docs
- Open-source pioneers such as FastAPI, SQLAlchemy, and Pydantic
- All sponsors (across every channel) for their strong support
- All contributors, participants, and users of this project
