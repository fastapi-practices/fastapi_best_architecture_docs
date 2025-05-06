import { defineNavbarConfig } from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: '前端',
        items: [
            {
                text: '线上演示',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: 'https://fba.wu-clan.site/'
                    }
                ]
            },
            {
                text: '文档',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: '/frontend/arco',
                        badge: { text: '已弃用', type: 'danger' }
                    },
                    {
                        text: 'Vben Admin Antd 完整版实施',
                        link: '/frontend/intro'
                    }
                ]
            },
            {
                text: 'GitHub',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture_ui_arco',
                        badge: { text: '已弃用', type: 'danger' }
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
        text: 'v1.2.0',
        items: [
            {
                text: '线上演示',
                items: [
                    {
                        text: '服务状态',
                        icon: 'simple-icons:uptimekuma',
                        link: 'https://status.wu-clan.site/status/services'
                    }
                ]
            },
            {
                text: '文档',
                items: [
                    {
                        text: '快速开始',
                        icon: 'material-symbols:start',
                        link: '/backend/summary/quick-start.md'
                    },
                    {
                        text: 'Apifox',
                        icon: 'simple-icons:apifox',
                        link: 'https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0'
                    },
                ]
            },
            {
                text: '更多',
                items: [
                    {
                        text: '常见问题',
                        icon: 'healthicons:question',
                        link: '/questions.md'
                    },
                    {
                        text: '技术支持',
                        icon: 'fluent-emoji-high-contrast:unicorn',
                        link: '/group.md'
                    },
                    {
                        text: '参与贡献',
                        icon: 'mdi:people-add',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend#contributing'
                    },
                    {
                        text: '我要催更',
                        icon: 'material-symbols:update-rounded',
                        link: 'https://discord.gg/JyedBeHXkn'
                    },
                    {
                        text: '更新记录',
                        icon: 'stash:last-updates-duotone',
                        link: '/changelog.md'
                    },
                ]
            },
        ]
    },
    {
        text: '插件系统',
        icon: 'unjs:unplugin',
        badge: { text: 'New' },
        link: '/plugin/before'
    },
    {
        text: '购买授权',
        icon: 'fluent:person-key-20-filled',
        link: '/price'
    },
    {
        text: '赞助',
        icon: 'ph:coffee-fill',
        link: '/sponsors'
    },
    {
        text: '互动',
        icon: 'game-icons:talk',
        badge: { text: 'Hot', type: 'danger' },
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
