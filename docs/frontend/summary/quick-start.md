---
title: 快速开始
---

::: caution
前端已默认集成【字典】功能，所以 fba 必须安装字典插件（已内置）并执行插件中的 SQL 脚本
:::

::: steps

1. 准备本地环境

    - Node.js（仓库 `.node-version` 指定 24.16.0，`engines` 要求 `^22.18.0 || ^24.0.0`）
    - <p>pnpm（`engines` 要求 `>=11.0.0`，仓库已通过 packageManager 指定 11.7.0）</p>

2. 拉取 Git 仓库

   ```shell:no-line-numbers
   git clone https://github.com/fastapi-practices/fastapi-best-architecture-ui.git
   ```

3. 安装依赖

   前端工程为 monorepo 结构，依赖安装在仓库根目录统一安装

   ```shell:no-line-numbers
   pnpm install
   ```

4. 配置接口地址

   修改 `apps/web-antdv-next/.env.development` 中的 `VITE_GLOB_API_URL` 为后端服务地址（末尾不带斜杠），该地址同时用于 WebSocket 连接

   ```dotenv:no-line-numbers
   # 接口地址
   VITE_GLOB_API_URL=http://localhost:8000
   ```

5. 启动

   ```shell:no-line-numbers
   pnpm dev:antdv-next
   ```

   ::: tip
   前端工程基于 Vben Admin monorepo，`pnpm dev` 会通过 turbo-run 在终端中选择需要启动的应用
   :::

6. 打开浏览器访问：[http://localhost:5173](http://localhost:5173)

:::
