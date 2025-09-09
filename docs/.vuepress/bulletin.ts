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
🎉 v1.9.0 已发布 🎉
:::

针对此版本，我们为大家带来了：

- Google OAuth2
- 代码生成 CLI
- 优化架构、bug 修复

为大家带来以上惊喜的同时，前端实施也在悄悄推进中，==代码生成页面已完成=={.important}，快快[本地部署](https://fastapi-practices.github.io/fastapi_best_architecture_docs/frontend/summary/quick-start.html)尝鲜吧~
`,
}
