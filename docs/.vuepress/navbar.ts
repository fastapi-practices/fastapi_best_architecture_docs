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
        text: 'Beta',
        items: [
            {
                text: '参与贡献',
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
        icon: 'ph:coffee-fill',
        link: '/sponsors'
    },
    {
        text: '互动',
        icon: 'game-icons:talk',
        link: 'https://wu-clan.github.io/homepage/'
    },
    {
        text: '关于',
        icon: 'mingcute:more-4-fill',
        items: [
            {
                text: '谁在使用',
                icon: 'mdi:user-check',
                link: '/who'
            },
            {
                text: '维护团队',
                icon: 'fa-solid:user-friends',
                link: '/team'
            },
        ],
    }
])
