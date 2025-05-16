import { BulletinOptions } from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    enablePage: true,
    lifetime: 'session',
    contentType: 'markdown',
    title: '公告',
    content: `\
**v1.3.0** 版本已发布，涉及重大变更 💥

- app 配置由独立控制改为统一控制
- 插件系统焕新升级，涉及插件配置、安装方式、新增接口

以上变更内容，可通过文档/源码自行查看
`,
}
