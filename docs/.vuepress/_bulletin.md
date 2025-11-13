::: warning 重大变化

- 🚀 重构外键约束为逻辑外键

:::

::: tip 升级须知

* 重建数据库表（因为外键约束已删除）
* 清理 Redis 缓存（因为不兼容脏数据）
* 升级依赖（因为使用依赖最新特性）

<a href="https://www.bigmodel.cn/claude-code?ic=SDTNNES9ZD">
  <img src="https://wu-clan.github.io/picx-images-hosting/BigmodelPoster.png">
</a>

:::