import {myNavbar} from "./navbar";
import {mySidebar} from "./sidebar";
import {defineUserConfig} from "vuepress";
import plumeTheme from "vuepress-theme-plume";
import { viteBundler } from '@vuepress/bundler-vite'


export default defineUserConfig({
    base: '/fastapi_best_architecture_docs/',
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', {rel: 'icon', href: 'https://fastapi.tiangolo.com/img/favicon.png'}]
    ],
    theme: plumeTheme({
        blog: false,
        notes: false,
        autoFrontmatter: {
            title: true,
            permalink: false,
            createTime: false,
        },
        sidebar: mySidebar,
        navbar: myNavbar,
        logo: 'https://fastapi.tiangolo.com/img/favicon.png',
        docsRepo: 'https://github.com/fastapi-practices/fastapi_best_architecture_docs',
        docsBranch: 'master',
        docsDir: 'docs',
        social: [
            { icon: 'github', link: 'https://github.com/fastapi-practices/fastapi_best_architecture' }
        ],
        navbarSocialInclude: ['github'],
        editLinkText: '在 GitHub 上编辑此页面',
        // lastUpdated: {
        //     text: 'Releases',
        // },
        footer: {
            message: 'MIT License',
            copyright: 'Copyright © 2024-present FastAPI Practices'
        },
        plugins: {
            shiki: {
                languages: ['shell','yaml','py']
            },
            watermark: true,
            markdownPower: {
                icons: true,
                bilibili: true,
            },
        }
    }),
    bundler: viteBundler(),
})
