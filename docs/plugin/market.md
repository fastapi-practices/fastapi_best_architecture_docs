---
title: 插件市场
aside: false
watermark: true
---

::: info 标签说明

- <Badge text="MySQL" color="#006484" bg-color="rgba(0, 100, 132, 0.1)" border-color="rgba(0, 100, 132, 0.2)" /> - 支持 MySQL
- <Badge text="PostgreSQL" color="#336699" bg-color="rgba(51, 102, 153, 0.1)" border-color="rgba(51, 102, 153, 0.2)" /> - 支持 PostgreSQL
- <Badge text="后端" color="#009485" bg-color="rgba(0,148,133,0.1)" border-color="rgba(0,148,133,0.2)" /> - 后端代码插件
- <Badge text="前端" color="#a855f7" bg-color="rgba(168, 85, 247, 0.1)" border-color="rgba(168, 85, 247, 0.2)" /> - 前端 [Vben Admin Antd](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件

:::

<script setup lang="ts">
import { pluginItems } from '@source/.vuepress/data/plugin'
</script>

<PluginMarket :items="pluginItems" />
