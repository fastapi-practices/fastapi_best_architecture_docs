import {BulletinOptions} from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    enablePage: true,
    lifetime: 'session',
    title: '欢迎加入我们',
    content: `
::: center

**Discord 服务器：** [Python 开发交流社区](https://discord.com/invite/yNN3wTbVAC)

<hr>

<iframe src="https://discord.com/widget?id=1185035164577972344&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>

:::
`,
    contentType: 'markdown'
}
