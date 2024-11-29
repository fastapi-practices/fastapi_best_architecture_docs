import {BulletinOptions} from "vuepress-theme-plume";

export const myBulletin: BulletinOptions = {
    enablePage: true,
    title: '欢迎加入我们',
    content: `
::: center

**Discord 服务器：** [Python 开发交流社区](https://discord.com/invite/yNN3wTbVAC)

<hr>

<p style="font-size: 14px; color: rgb(160, 160, 160);">加入并订阅此服务器，即可尊享闲聊，技术分享，疑难杂症解答，与大佬肩并肩，速速行动吧！</p>

<iframe src="https://discord.com/widget?id=1185035164577972344&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>

:::
`,
    contentType: 'markdown'
}
