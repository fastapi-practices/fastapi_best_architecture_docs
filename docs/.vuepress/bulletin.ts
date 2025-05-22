import { BulletinOptions } from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    enablePage: true,
    lifetime: 'session',
    contentType: 'markdown',
    title: '公告',
    content: `\
**v1.4.0** 版本已发布，涉及重大变更 💥

- OAuth2 模块已更新为插件

以上变更内容，可通过文档/源码自行查看
`,
}
