import {SidebarMulti} from "vuepress-theme-plume/lib/shared";


export const mySidebar: SidebarMulti = {
    '/guide/': [
        {
            text: '指南',
            collapsed: false,
            prefix: '/guide/introduction/',
            items: [
                {text: '为什么选择我们？', link: 'why'},
                {text: '快速开始', link: 'quick-start'},
                {text: '精简版', link: 'fsm'},
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
