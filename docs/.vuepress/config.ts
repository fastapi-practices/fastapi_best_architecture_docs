import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {plumeTheme} from 'vuepress-theme-plume'
import {myNavbar} from "./navbar";
import {mySidebar} from "./sidebar";

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', {rel: 'icon', href: 'https://fastapi.tiangolo.com/img/favicon.png'}]
    ],
    theme: plumeTheme({
        blog: false,
        notes: false,
        autoFrontmatter: {
            permalink: false,
            title: false,
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
        footer: {
            message: 'MIT License',
            copyright: 'Copyright © 2024-present FastAPI Practices'
        },
        plugins: {
            watermark: true,
            markdownPower: {
                icons: true,
            },
        }
    }),
    bundler: viteBundler(),
})
