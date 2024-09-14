---
title: Docker 部署
createTime: 2024/09/12 20:40:22
---
> [!WARNING]
>
> 默认端口冲突：8000，3306，6379，5672
>
> 建议在部署前关闭本地服务：mysql，redis，rabbitmq...

:::: steps
1. env

    进入 `deploy/backend/docker-compose` 目录，创建环境变量文件 `.env`

    ```shell
    touch .env.server ../../../backend/.env
    ```

    将初始化环境变量配置拷贝到环境变量文件中

    ```shell
    cp .env.server ../../../backend/.env
    ```

2. 按需修改配置文件 `backend/core/conf.py` 和 `.env`
3. 执行一键启动命令
    
    ::: info
    命令执行期间遇到镜像拉取问题请自定 Google
    :::

    ```shell
    docker-compose up -d --build
    ```

4. 等待命令执行完成
5. 打开浏览器访问：[http://127.0.0.1:8000/api/v1/docs](http://127.0.0.1:8000/api/v1/docs)
::::
