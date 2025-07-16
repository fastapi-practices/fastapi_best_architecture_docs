import { BulletinOptions } from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    enablePage: true,
    lifetime: 'session',
    contentType: 'markdown',
    title: '公告',
    content: `\
v1.7.0 已发布！🤗

此版本我们为大家带来了史诗级新功能

**celery 动态定时任务**

---

您现在可以通过 【导航栏 -> 前端（在线体验）-> 线上演示】 获取全新页面预览
`,
}
