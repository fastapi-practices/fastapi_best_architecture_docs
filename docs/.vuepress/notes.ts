import {defineNoteConfig} from "vuepress-theme-plume";


export const myNotes = defineNoteConfig({
    dir: 'guide',
    link: '/guide/',
    sidebar: [
        {
            text: '指南',
            collapsed: false,
            items: [
                '介绍',
                '快速开始'
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: '部署',
            items: [
                'Docker',
                '传统'
            ]
        }
    ]
})

