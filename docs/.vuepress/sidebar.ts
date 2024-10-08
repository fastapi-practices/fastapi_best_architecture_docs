import {SidebarMulti} from "vuepress-theme-plume/lib/shared";


export const mySidebar: SidebarMulti = {
    '/guide/': [
        {
            text: '简介',
            collapsed: false,
            prefix: 'summary/',
            items: [
                {text: '为什么选择我们？', link: 'why'},
                {text: '快速开始', link: 'quick-start'},
                {text: '精简版', link: 'fsm'},
            ]
        },
        {
            text: '参考',
            collapsed: false,
            prefix: 'reference/',
            items: [
                {text: '登录', link: 'login'},
                {text: 'OAuth 2.0', link: 'oauth2'},
                {text: '跨域', link: 'cors'},
                {text: '权限', link: 'permission'},
                {text: '事务', link: 'transaction'},
                {text: '代码生成', link: 'code-generation'},
            ]
        },
        {
            text: 'MiXin',
            collapsed: false,
            prefix: 'mixin/',
            items: [
                {text: '用户', link: 'user'},
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: 'deploy/',
            items: [
                {text: 'Docker', link: 'Docker'},
                {text: '传统', link: 'legacy'},
            ]
        }
    ],
}
