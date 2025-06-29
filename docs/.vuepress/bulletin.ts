import { BulletinOptions } from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    enablePage: false,
    lifetime: 'session',
    contentType: 'markdown',
    title: '公告',
    content: `\
线上演示环境已更新！🤗

---

您现在可以通过 【导航栏 -> 前端（在线体验）-> 线上演示】 获取全新页面预览

---

值得注意的是，目前部分功能尚未实现，请关注 [当前进度](https://fastapi-practices.github.io/fastapi_best_architecture_docs/frontend/intro.html) 
获取最新进展
`,
}
