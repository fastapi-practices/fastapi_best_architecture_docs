import {SidebarMulti} from "vuepress-theme-plume/lib/shared";


export const mySidebar: SidebarMulti = {
    '/guide/': [
        {
            text: '指南',
            collapsed: false,
            prefix: '/introduction',
            items: [
                {text: '介绍', link: '/fba'},
                {text: '快速开始', link: '/quick-start'}
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: '/deploy',
            items: [
                {text: 'Docker', link: '/Docker'},
                {text: '传统', link: '/legacy'}
            ]
        }
    ],
}
