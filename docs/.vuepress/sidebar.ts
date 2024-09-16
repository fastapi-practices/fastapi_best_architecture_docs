import {SidebarMulti} from "vuepress-theme-plume/lib/shared";


export const mySidebar: SidebarMulti = {
    '/guide/': [
        {
            text: '简介',
            collapsed: false,
            prefix: '/guide/summary/',
            items: [
                {text: '为什么选择我们？', link: 'why'},
                {text: '快速开始', link: 'quick-start'},
                {text: '精简版', link: 'fsm'},
            ]
        },
        {
            text: '参考',
            collapsed: false,
            prefix: '/guide/reference/',
            items: [
                {text: '登录', link: 'login'},
                {text: '权限', link: 'permission'},
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: '/guide/deploy/',
            items: [
                {text: 'Docker', link: 'Docker'},
                {text: '传统', link: 'legacy'}
            ]
        }
    ],
}
