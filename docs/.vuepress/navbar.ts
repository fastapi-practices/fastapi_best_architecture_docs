import { defineNavbarConfig, ThemeNavItem } from "vuepress-theme-plume";

export const myNavbar: ThemeNavItem[] = defineNavbarConfig([
    {
        text: 'v1.9.0',
        items: [
            {
                text: '在线体验',
                items: [
                    {
                        text: 'Vben UI',
                        icon: 'iconoir:www',
                        link: 'https://fba.wu-clan.site/',
                    },
                    {
                        text: '服务状态',
                        icon: 'simple-icons:uptimekuma',
                        link: 'https://status.wu-clan.site/status/services'
                    }
                ]
            },
            {
                text: '文档 - 后端',
                items: [
                    {
                        text: '快速开始',
                        icon: 'material-symbols:start',
                        link: '/backend/summary/quick-start'
                    },
                    {
                        text: 'Apifox',
                        icon: 'simple-icons:apifox',
                        link: 'https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0'
                    },
                ]
            },
            {
                text: '文档 - 前端',
                items: [
                    {
                        text: 'Arco UI',
                        badge: { text: '已弃用', type: 'danger' },
                        icon: 'material-symbols:docs',
                        link: '/frontend/summary/arco',
                    },
                    {
                        text: 'Vben UI',
                        icon: 'material-symbols:docs',
                        link: '/frontend/summary/intro'
                    }
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
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/CHANGELOG.md'
                    },
                ]
            },
        ]
    },
    {
        text: '生态系统',
        items: [
            {
                text: '资源',
                items: [
                    {
                        text: '开源项目',
                        icon: 'mdi:github',
                        link: '/opensource'
                    },
                    {
                        text: '技术栈',
                        icon: 'material-symbols:stack',
                        link: '/stack'
                    },
                    {
                        text: '用户登记',
                        badge: { text: '欢迎投稿', type: 'tip' },
                        icon: 'mdi:user-check',
                        link: '/users'
                    },
                ]
            },
            {
                text: '视频课程',
                items: [
                    {
                        text: '视频课程',
                        badge: { text: '重制中', type: 'warning' },
                        icon: 'ri:bilibili-fill',
                        link: 'https://space.bilibili.com/284237214/lists'
                    },
                ]
            },
            {
                text: '互动',
                items: [
                    {
                        text: '交流群',
                        icon: 'ic:baseline-wechat',
                        link: '/group'
                    },
                    {
                        text: '作者主页',
                        icon: 'streamline-plump:browser-website-1-remix',
                        link: 'https://wu-clan.github.io/homepage'
                    },
                    {
                        text: 'Github 问题',
                        icon: 'codicon:issues',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/issues'
                    },
                    {
                        text: 'Github 讨论',
                        icon: 'mdi:discussion',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/discussions'
                    },
                ]
            },
            {
                text: '动态',
                items: [
                    {
                        text: '博客',
                        badge: { text: '充电站', type: 'tip' },
                        icon: 'fa7-solid:blog',
                        link: '/blog/'
                    }
                ]
            }
        ]
    },
    {
        text: '插件系统',
        icon: 'unjs:unplugin',
        link: '/plugin/before'
    },
    {
        text: 'Pricing',
        icon: 'streamline-color:bag-dollar',
        link: '/pricing'
    },
    {
        text: '赞助',
        icon: 'material-icon-theme:github-sponsors',
        link: '/sponsors'
    },
    {
        text: '关于',
        items: [
            {
                text: '常见问题',
                icon: 'healthicons:question',
                link: '/questions'
            },
            {
                text: '社区团队',
                icon: 'fa-solid:user-friends',
                link: '/team'
            },
            {
                text: '隐私政策',
                icon: 'iconoir:privacy-policy',
                link: '/privacy-policy'
            },
        ],
    }
])
