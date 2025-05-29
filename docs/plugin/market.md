---
title: 插件市场
aside: false
---

::: details 标签说明

| <Badge text="MySQL" color="#006484" bg-color="rgba(0, 100, 132, 0.1)" border-color="rgba(0, 100, 132, 0.2)" /> | <Badge text="PostgreSQL" color="#336699" bg-color="rgba(51, 102, 153, 0.1)" border-color="rgba(51, 102, 153, 0.2)" /> | <Badge text="后端" color="#009485" bg-color="rgba(0,148,133,0.1)" border-color="rgba(0,148,133,0.2)" /> | <Badge text="前端" color="#a855f7" bg-color="rgba(168, 85, 247, 0.1)" border-color="rgba(168, 85, 247, 0.2)" /> |
|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| 支持 MySQL 数据库                                                                                                   | 支持 PostgreSQL 数据库                                                                                                     | 包含后端代码插件                                                                                              | 包含前端 [Vben Admin Antd](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件                |

:::

<PluginMarket :items="pluginItems" />

<script setup lang="ts">
import { pluginItems } from '@source/.vuepress/data/plugin'
</script>