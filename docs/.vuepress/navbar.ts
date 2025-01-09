import {defineNavbarConfig} from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: 'UI 演示',
        items: [
            {
                text: 'Arco Design Vue 实验性实施',
                link: 'https://fba.xwboy.top/'
                //link: 'https://github.com/fastapi-practices/fastapi_best_architecture_ui'
            },
            {
                text: 'Vben Admin Antd 生产中...',
                link: 'https://github.com/fastapi-practices/fba_ui'
            }
        ]
    },
    {
        text: 'Beta',
        items: [
            {
                text: '技术支持',
                icon: 'fluent-emoji-high-contrast:unicorn',
                link: 'https://github.com/fastapi-practices/fastapi_best_architecture/issues'
            },
            {
                text: '参与贡献',
                icon: 'mdi:people-add',
                link: 'https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend#readme'
            },
            {
                text: '更新记录',
                icon: 'stash:last-updates-duotone',
                link: '/guide/other/changelog.md'
            },
            {
                text: '我要催更',
                icon: 'material-symbols:update-rounded',
                link: 'https://discord.gg/JyedBeHXkn'
            },
        ]
    },
    {
        text: '插件市场',
        icon: 'clarity:plugin-solid',
        link: '/plugins'
    },
    {
        text: '授权',
        icon: 'fluent:person-key-20-filled',
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
            {
                text: '申请加入',
                icon: 'solar:pen-new-square-bold',
                link: 'https://discord.com/channels/1185035164577972344/1319245794271956993'
            },
        ],
    }
])
