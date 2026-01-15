---
title: Docker 部署
---

::: warning
此教程以 HTTPS 为例
:::

:::: steps

1. 拉取代码到服务器

   将代码拉取到服务器通常采用 ssh 方式（更安全），当然你也可以选择使用 HTTP 方式，具体方式请根据个人自行决定

2. env

   修改 `/apps/web-antd/.env.production` 中的 `VITE_GLOB_API_URL` 为域名地址（末尾不带斜杠）

3. 更新 nginx 配置

   文件 `/scripts/deploy/nginx.conf` 中有相关注释说明，根据需要进行修改即可

4. 更新 `docker-compose` 脚本

   脚本 `docker-compose.yml` 中有相关注释说明，根据需要进行修改即可

5. 执行一键启动命令

   ::: caution 必要条件

    - 注释了 fba 后端 docker-compose 脚本中的 fba_ui 容器
    - 已经通过 docker-compose 构建 fba 后端

   :::

   在项目根目录中打开终端，执行以下命令

   ```shell:no-line-numbers
   docker-compose up -d --build
   ```

::::