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
🎉 v1.8.1 已发布 🎉
:::

针对此版本，我们为大家带来了：

- Google OAuth2
- 代码生成 CLI
- 优化架构、bug 修复
`,
}
