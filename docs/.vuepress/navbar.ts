import {defineNavbarConfig} from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: '演示',
        items: [
            {
                text: 'Arco Design 版本',
                link: 'https://fba.xwboy.top/'
            }
        ]
    },
    {
        text: 'v0.0.1 Beta',
        items: [
            {
                text: '贡献',
                link: 'https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend#readme'
            },
            {
                text: '更新记录',
                link: '/guide/other/changelog.md'
            }
        ]
    },
    {
        text: '技术支持',
        icon: 'fluent-emoji-high-contrast:unicorn',
        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/issues'
    },
    {
        text: '授权',
        icon: 'ri:key-2-fill',
        link: '/guide/summary/why.md#承诺'
    },
    {
        text: '赞助',
        icon: 'ci:coffee',
        link: 'https://wu-clan.github.io/sponsor/'
    },
    {
        text: '互动',
        icon: 'ic:baseline-discord',
        link: 'https://wu-clan.github.io/homepage/'
    },
    {
        text: '友情链接',
        icon: 'fa-solid:user-friends',
        link: '/friends'
    }
])
