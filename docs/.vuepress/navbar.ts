import { defineNavbarConfig } from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: '后端',
        link: '/backend/summary/quick-start.md'
    },
    {
        text: '前端',
        items: [
            {
                text: '线上演示',
                icon: 'mdi:web',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: 'https://fba.wu-clan.site/'
                    }
                ]
            },
            {
                text: '文档',
                icon: 'material-symbols:docs',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: '/frontend/arco'
                    },
                    {
                        text: 'Vben Admin Antd 完整版实施',
                        link: '/frontend/intro'
                    }
                ]
            },
            {
                text: 'GitHub',
                icon: 'mdi:git',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture_ui_arco'
                    },
                    {
                        text: 'Vben Admin Antd 完整版实施',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture_ui'
                    }
                ]
            },
        ]
    },
    {
        text: 'v1.0.5',
        items: [
            {
                text: '常见问题',
                icon: 'healthicons:question',
                link: '/questions.md'
            },
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
                link: '/changelog.md'
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
        link: '/plugin/before'
    },
    {
        text: '授权',
        icon: 'fluent:person-key-20-filled',
        link: '/backend/summary/why.md#承诺'
    },
    {
        text: '赞助',
        icon: 'ph:coffee-fill',
        link: '/sponsors'
    },
    {
        text: '互动',
        icon: 'game-icons:talk',
        link: '/group'
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
                text: '加入团队',
                icon: 'mingcute:user-add-2-fill',
                link: '/join'
            },
            {
                text: '知识星球',
                icon: 'ph:planet-fill',
                link: '/planet'
            },
        ],
    }
])
