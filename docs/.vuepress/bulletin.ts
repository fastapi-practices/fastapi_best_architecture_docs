import { BulletinOptions } from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    // layout: 'center',
    border: true,
    enablePage: true,
    lifetime: 'session',
    contentType: 'markdown',
    title: '公告',
    content: `\
::: center
🎉 v1.8.0 已发布 🎉
:::

此版本为==重大更新=={.warning}，我们为大家带来了：

- 计划任务分布式锁
- 身份验证白名单正则表达式配置
- 优化树节点的数据排序逻辑
- 通过队列优化 Opera 日志存储逻辑
- 优化时区日期时间返回编码器
- 为响应消息添加 i18n 支持
- ...

为大家带来以上惊喜的同时，前端实施也在悄悄推进中，==代码生成页面已完成=={.important}，快快[本地部署](https://fastapi-practices.github.io/fastapi_best_architecture_docs/frontend/summary/quick-start.html)尝鲜吧~
`,
}
